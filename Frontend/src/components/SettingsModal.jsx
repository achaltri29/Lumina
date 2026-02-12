import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, onClose }) => {
    const { user, updatePreferences } = useAuth();
    const { theme, setThemeMode } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [isError, setIsError] = useState(false);
    const handleThemeChange = async (newTheme) => {
        setIsLoading(true);
        setIsError(false);
        const result = await updatePreferences({ theme: newTheme });
        if (result.success) {
            setThemeMode(newTheme);
            setMessage('Theme updated successfully!');
            setIsError(false);
            setTimeout(() => setMessage(''), 3000);
        } else {
            setMessage('Failed to update theme');
            setIsError(true);
            setTimeout(() => setMessage(''), 3000);
        }
        setIsLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Settings</h2>
                    <button className="close-btn" onClick={onClose}>
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>

                <div className="modal-content">
                    <div className="setting-section">
                        <h3>Appearance</h3>
                        <div className="theme-options">
                            <button 
                                className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                                onClick={() => handleThemeChange('light')}
                                disabled={isLoading}
                            >
                                <i className="fa-solid fa-sun"></i>
                                Light
                            </button>
                            <button 
                                className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                                onClick={() => handleThemeChange('dark')}
                                disabled={isLoading}
                            >
                                <i className="fa-solid fa-moon"></i>
                                Dark
                            </button>
                            <button 
                                className={`theme-option ${theme === 'auto' ? 'active' : ''}`}
                                onClick={() => handleThemeChange('auto')}
                                disabled={isLoading}
                            >
                                <i className="fa-solid fa-desktop"></i>
                                Auto
                            </button>
                        </div>
                    </div>

                    <div className="setting-section">
                        <h3>Account</h3>
                        <div className="account-info">
                            <p><strong>Username:</strong> {user?.username}</p>
                            <p><strong>Email:</strong> {user?.email}</p>
                        </div>
                    </div>

                    {message && (
                        <div className={`message ${isError ? 'message-error' : 'message-success'}`}>
                            <i className={isError ? 'fa-solid fa-exclamation-circle' : 'fa-solid fa-check-circle'}></i>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
