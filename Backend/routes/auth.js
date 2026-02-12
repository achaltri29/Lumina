import express from "express";

import User from "../models/User.js";
import { generateToken, authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// restore previous token-in-body API behavior
// Register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                error: existingUser.email === email ? "Email already registered" : "Username already taken"
            });
        }

        // Create new user
        const user = new User({
            username,
            email,
            password
        });

        await user.save();

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                preferences: user.preferences
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Registration failed" });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate token
        const token = generateToken(user._id);

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                preferences: user.preferences
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login failed" });
    }
});

// Update user preferences (e.g. theme)
router.put("/preferences", authenticateToken, async (req, res) => {
    try {
        const { theme, language } = req.body;
        const update = {};
        if (theme !== undefined) update["preferences.theme"] = theme;
        if (language !== undefined) update["preferences.language"] = language;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $set: update },
            { new: true }
        ).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ user: { id: user._id, username: user.username, email: user.email, preferences: user.preferences, lastLogin: user.lastLogin } });
    } catch (error) {
        console.error("Update preferences error:", error);
        res.status(500).json({ error: "Failed to update preferences" });
    }
});

// Get current user
router.get("/me", authenticateToken, async (req, res) => {
    try {
        res.json({
            user: {
                id: req.user._id,
                username: req.user.username,
                email: req.user.email,
                preferences: req.user.preferences,
                lastLogin: req.user.lastLogin
            }
        });
    } catch (error) {
        console.error("Get user error:", error);
        res.status(500).json({ error: "Failed to get user data" });
    }
});

// Logout (client-side token removal)
router.post("/logout", authenticateToken, async (req, res) => {
    res.json({ message: "Logout successful" });
});

export default router;
