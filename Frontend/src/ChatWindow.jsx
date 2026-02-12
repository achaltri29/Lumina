import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { v1 as uuidv1 } from "uuid";
import ThemeToggle from "./components/ThemeToggle.jsx";
import Dropdown from "./components/Dropdown.jsx";
import AuthModal from "./components/AuthModal.jsx";
import SettingsModal from "./components/SettingsModal.jsx";
import UpgradeModal from "./components/UpgradeModal.jsx";
import UsageStatsModal from "./components/UsageStatsModal.jsx";

function ChatWindow() {
    const { prompt, setPrompt, reply, setReply, currThreadId, setCurrThreadId, setPrevChats, setNewChat } = useContext(MyContext);
    const { user, logout, isAuthenticated, token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [showUsageStatsModal, setShowUsageStatsModal] = useState(false);

    const getReply = async () => {
        setLoading(true);
        setNewChat(false);

        console.log("message ", prompt, " threadId ", currThreadId);
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;
        const options = {
            method: "POST",
            headers,
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/chat`, options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply);

            // persistence removed in revert
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    //Append new chat to prevChats
    useEffect(() => {
        if (prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                }, {
                    role: "assistant",
                    content: reply
                }]
            ));
        }

        setPrompt("");
    }, [reply]);


    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    };

    const startNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    };

    return (
        <div className="chatWindow">
            <div className="navbar">
                <div className="navbar-left">
                    <Dropdown
                        trigger={
                            <span className="lumina-trigger">Lumina <i className="fa-solid fa-chevron-down"></i></span>
                        }
                        position="bottom-left"
                    >
                        <button className="dropdown-item" onClick={startNewChat}>
                            <i className="fa-solid fa-pen-to-square"></i>
                            New chat
                        </button>
                        <div className="dropdown-divider"></div>
                        <div className="dropdown-header">Model</div>
                        <div className="dropdown-item" style={{ cursor: 'default' }}>
                            <i className="fa-solid fa-robot"></i>
                            Default (from server)
                        </div>
                    </Dropdown>
                </div>
                <div className="navbar-right">
                    <ThemeToggle className="navbar-theme-toggle" />
                    {isAuthenticated ? (
                        <Dropdown
                            trigger={
                                <div className="userIconDiv">
                                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                                </div>
                            }
                            position="bottom-right"
                            onOpen={() => setIsOpen(true)}
                            onClose={() => setIsOpen(false)}
                        >
                            <div className="dropdown-header">Account</div>
                            <div className="dropdown-item" style={{ cursor: 'default', fontWeight: '600' }}>
                                <i className="fa-solid fa-user"></i>
                                {user.username}
                            </div>
                            <button className="dropdown-item" onClick={() => setShowSettingsModal(true)}>
                                <i className="fa-solid fa-gear"></i>
                                Settings
                            </button>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-header">Subscription</div>
                            <button className="dropdown-item" onClick={() => setShowUpgradeModal(true)}>
                                <i className="fa-solid fa-crown"></i>
                                Upgrade Plan
                            </button>
                            <button className="dropdown-item" onClick={() => setShowUsageStatsModal(true)}>
                                <i className="fa-solid fa-chart-line"></i>
                                Usage Stats
                            </button>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item" onClick={logout}>
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                Log out
                            </button>
                        </Dropdown>
                    ) : (
                        <button
                            className="login-btn"
                            onClick={() => setShowAuthModal(true)}
                        >
                            <i className="fa-solid fa-sign-in-alt"></i>
                            Sign In
                        </button>
                    )}
                </div>
            </div>
            <Chat></Chat>

            <ScaleLoader color="var(--accent-color)" loading={loading}>
            </ScaleLoader>

            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask anything"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''}
                    >

                    </input>
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">
                    Lumina can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />

            <SettingsModal
                isOpen={showSettingsModal}
                onClose={() => setShowSettingsModal(false)}
            />

            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
            />

            <UsageStatsModal
                isOpen={showUsageStatsModal}
                onClose={() => setShowUsageStatsModal(false)}
            />
        </div>
    )
}

export default ChatWindow;