import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import './UsageStatsModal.css';

const UsageStatsModal = ({ isOpen, onClose }) => {
    const { user, token } = useAuth();
    const [stats, setStats] = useState({
        totalMessages: 0,
        totalTokens: 0,
        thisMonth: 0,
        lastLogin: null
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen || !token) {
            if (user?.lastLogin) setStats(prev => ({ ...prev, lastLogin: user.lastLogin }));
            return;
        }
        let cancelled = false;
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/stats`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.ok ? res.json() : Promise.reject(new Error('Failed to load stats')))
            .then(data => {
                if (!cancelled) setStats({
                    totalMessages: data.totalMessages ?? 0,
                    totalTokens: data.totalTokens ?? 0,
                    thisMonth: data.thisMonth ?? 0,
                    lastLogin: data.lastLogin ?? user?.lastLogin ?? null
                });
            })
            .catch(() => {
                if (!cancelled && user?.lastLogin) setStats(prev => ({ ...prev, lastLogin: user.lastLogin }));
            })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, [isOpen, token, user?.lastLogin]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="usage-stats-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2><i className="fa-solid fa-chart-line"></i> Usage Statistics</h2>
                    <button className="close-btn" onClick={onClose}>
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>

                <div className="modal-content">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">
                                <i className="fa-solid fa-comments"></i>
                            </div>
                            <div className="stat-info">
                                <h3>{stats.totalMessages.toLocaleString()}</h3>
                                <p>Total Messages</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">
                                <i className="fa-solid fa-brain"></i>
                            </div>
                            <div className="stat-info">
                                <h3>{stats.totalTokens.toLocaleString()}</h3>
                                <p>Tokens Used</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">
                                <i className="fa-solid fa-calendar"></i>
                            </div>
                            <div className="stat-info">
                                <h3>{stats.thisMonth}</h3>
                                <p>This Month</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">
                                <i className="fa-solid fa-clock"></i>
                            </div>
                            <div className="stat-info">
                                <h3>{stats.lastLogin ? new Date(stats.lastLogin).toLocaleDateString() : '—'}</h3>
                                <p>Last Login</p>
                            </div>
                        </div>
                    </div>

                    <div className="usage-chart">
                        <h3>Usage Over Time</h3>
                        <div className="chart-placeholder">
                            <i className="fa-solid fa-chart-bar"></i>
                            <p>Chart visualization would go here</p>
                        </div>
                    </div>

                    <div className="usage-limits">
                        <h3>Current Plan Limits</h3>
                        <div className="limit-item">
                            <span>Messages per month</span>
                            <span className="limit-value">Unlimited</span>
                        </div>
                        <div className="limit-item">
                            <span>API calls per day</span>
                            <span className="limit-value">1,000</span>
                        </div>
                        <div className="limit-item">
                            <span>Storage</span>
                            <span className="limit-value">10 GB</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsageStatsModal;
