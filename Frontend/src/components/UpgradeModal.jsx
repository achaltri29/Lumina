import React from 'react';
import './UpgradeModal.css';

const UpgradeModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="upgrade-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2><i className="fa-solid fa-crown"></i> Upgrade Plan</h2>
                    <button className="close-btn" onClick={onClose}>
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>

                <div className="modal-content">
                    <div className="upgrade-intro">
                        <h3>Unlock Premium Features</h3>
                        <p>Get unlimited access to Lumina's advanced AI capabilities</p>
                    </div>

                    <div className="plans">
                        <div className="plan-card">
                            <div className="plan-header">
                                <h4>Pro Plan</h4>
                                <div className="price">
                                    <span className="currency">$</span>
                                    <span className="amount">20</span>
                                    <span className="period">/month</span>
                                </div>
                            </div>
                            <ul className="features">
                                <li><i className="fa-solid fa-check"></i> Unlimited messages</li>
                                <li><i className="fa-solid fa-check"></i> Advanced AI models</li>
                                <li><i className="fa-solid fa-check"></i> Priority support</li>
                                <li><i className="fa-solid fa-check"></i> Export conversations</li>
                                <li><i className="fa-solid fa-check"></i> Custom themes</li>
                            </ul>
                            <button className="upgrade-btn">
                                <i className="fa-solid fa-crown"></i>
                                Upgrade to Pro
                            </button>
                        </div>

                        <div className="plan-card featured">
                            <div className="featured-badge">Most Popular</div>
                            <div className="plan-header">
                                <h4>Enterprise</h4>
                                <div className="price">
                                    <span className="currency">$</span>
                                    <span className="amount">50</span>
                                    <span className="period">/month</span>
                                </div>
                            </div>
                            <ul className="features">
                                <li><i className="fa-solid fa-check"></i> Everything in Pro</li>
                                <li><i className="fa-solid fa-check"></i> API access</li>
                                <li><i className="fa-solid fa-check"></i> Team collaboration</li>
                                <li><i className="fa-solid fa-check"></i> Custom integrations</li>
                                <li><i className="fa-solid fa-check"></i> Dedicated support</li>
                            </ul>
                            <button className="upgrade-btn">
                                <i className="fa-solid fa-rocket"></i>
                                Upgrade to Enterprise
                            </button>
                        </div>
                    </div>

                    <div className="upgrade-note">
                        <p><i className="fa-solid fa-info-circle"></i> All plans include a 7-day free trial</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpgradeModal;
