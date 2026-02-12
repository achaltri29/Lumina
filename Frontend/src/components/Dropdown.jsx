import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

const Dropdown = ({ 
  trigger, 
  children, 
  position = 'bottom-right',
  className = '',
  onOpen = () => {},
  onClose = () => {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          triggerRef.current && !triggerRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const openDropdown = () => {
    setIsOpen(true);
    onOpen();
  };

  const closeDropdown = () => {
    setIsOpen(false);
    onClose();
  };

  const getPositionClass = () => {
    switch (position) {
      case 'top-left':
        return 'dropdown-content--top-left';
      case 'top-right':
        return 'dropdown-content--top-right';
      case 'bottom-left':
        return 'dropdown-content--bottom-left';
      case 'bottom-right':
      default:
        return 'dropdown-content--bottom-right';
    }
  };

  return (
    <div className={`dropdown ${className}`} ref={dropdownRef}>
      <div 
        ref={triggerRef}
        className="dropdown-trigger"
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDropdown();
          }
        }}
      >
        {trigger}
      </div>
      
      {isOpen && (
        <div className={`dropdown-content ${getPositionClass()}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
