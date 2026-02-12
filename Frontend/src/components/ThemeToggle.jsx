import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = ({ className = "" }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button 
            className={`theme-toggle ${className}`}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
            <div className="theme-toggle-icon">
                {theme === 'light' ? (
                    <i className="fas fa-moon"></i>
                ) : (
                    <i className="fas fa-sun"></i>
                )}
            </div>
        </button>
    );
};

export default ThemeToggle;
