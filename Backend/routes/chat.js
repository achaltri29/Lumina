import express from "express";
import Thread from "../models/Thread.js";
import getAIResponse from "../utils/aiService.js";
import { optionalAuth, authenticateToken } from "../middleware/auth.js";

const router = express.Router();

//test
router.post("/test", async (req, res) => {
    try {
        const thread = new Thread({
            threadId: "abc",
            title: "Testing New Thread2"
        });

        const response = await thread.save();
        res.send(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to save in DB" });
    }
});

// Get all threads for the current user only (or anonymous threads when not logged in)
router.get("/thread", optionalAuth, async (req, res) => {
    try {
        const userId = req.user ? req.user._id : null;
        const filter = userId
            ? { userId }
            : { $or: [{ userId: null }, { userId: { $exists: false } }] };
        const threads = await Thread.find(filter).sort({ updatedAt: -1 });
        res.json(threads);
    } catch (err) {
        console.log("Database not available, returning empty threads:", err.message);
        res.json([]);
    }
});

function sameOwner(thread, userId) {
    const t = thread.userId == null || thread.userId === undefined;
    const u = userId == null;
    return (t && u) || (thread.userId && userId && String(thread.userId) === String(userId));
}

router.get("/thread/:threadId", optionalAuth, async (req, res) => {
    const { threadId } = req.params;
    const userId = req.user ? req.user._id : null;

    try {
        const thread = await Thread.findOne({ threadId });
        if (!thread) return res.status(404).json({ error: "Thread not found" });
        if (!sameOwner(thread, userId)) return res.status(403).json({ error: "Access denied" });
        res.json(thread.messages);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch chat" });
    }
});

router.delete("/thread/:threadId", optionalAuth, async (req, res) => {
    const { threadId } = req.params;
    const userId = req.user ? req.user._id : null;

    try {
        const thread = await Thread.findOne({ threadId });
        if (!thread) return res.status(404).json({ error: "Thread not found" });
        if (!sameOwner(thread, userId)) return res.status(403).json({ error: "Access denied" });
        await Thread.findOneAndDelete({ threadId });
        res.status(200).json({ success: "Thread deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete thread" });
    }
});

// Usage stats for the authenticated user
router.get("/stats", authenticateToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const threads = await Thread.find({ userId }).lean();
        const totalMessages = threads.reduce((sum, t) => sum + (t.messages?.length ?? 0), 0);
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const thisMonth = threads.filter(t => t.updatedAt >= startOfMonth).length;
        res.json({
            totalMessages,
            totalTokens: 0,
            thisMonth,
            lastLogin: req.user.lastLogin ?? null
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to load stats" });
    }
});

router.post("/chat", optionalAuth, async (req, res) => {
    const { threadId, message } = req.body;
    const userId = req.user ? req.user._id : null;

    if (!threadId || !message) {
        return res.status(400).json({ error: "missing required fields" });
    }

    try {
        const assistantReply = await getAIResponse(message);

        try {
            let thread = await Thread.findOne({ threadId });

            if (!thread) {
                thread = new Thread({
                    userId,
                    threadId,
                    title: message,
                    messages: [{ role: "user", content: message }]
                });
            } else {
                if (!sameOwner(thread, userId)) return res.status(403).json({ error: "Access denied" });
                thread.messages.push({ role: "user", content: message });
            }

            thread.messages.push({ role: "assistant", content: assistantReply });
            thread.updatedAt = new Date();
            await thread.save();
        } catch (dbErr) {
            console.log("Database not available, chat not saved:", dbErr.message);
        }

        res.json({ reply: assistantReply });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong" });
    }
});




export default router;