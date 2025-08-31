import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const MobileMenuToggle = ({ 
  isOpen = false, 
  onToggle, 
  variant = 'hamburger', // 'hamburger' | 'sidebar'
  position = 'top-right', // 'top-right' | 'top-left'
  className = ''
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    onToggle?.();
    
    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event?.key === 'Escape' && isOpen) {
        handleToggle();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getIconName = () => {
    if (variant === 'sidebar') {
      return isOpen ? 'PanelLeftClose' : 'PanelLeftOpen';
    }
    return isOpen ? 'X' : 'Menu';
  };

  const getButtonVariant = () => {
    return variant === 'sidebar' ? 'outline' : 'ghost';
  };

  const getPositionClasses = () => {
    const baseClasses = 'md:hidden fixed z-300';
    
    switch (position) {
      case 'top-left':
        return `${baseClasses} top-4 left-4`;
      case 'top-right':
      default:
        return `${baseClasses} top-4 right-4`;
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className={`${getPositionClasses()} ${className}`}>
        <Button
          variant={getButtonVariant()}
          size="sm"
          onClick={handleToggle}
          className={`p-2 transition-transform duration-200 ${
            isAnimating ? 'scale-95' : 'scale-100'
          }`}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <Icon 
            name={getIconName()} 
            size={20}
            className={`transition-transform duration-200 ${
              isOpen ? 'rotate-90' : 'rotate-0'
            }`}
          />
        </Button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-200 transition-opacity duration-300"
          onClick={handleToggle}
          aria-hidden="true"
        />
      )}
    </>
  );
};

// Mobile Menu Container Component
export const MobileMenuContainer = ({ 
  isOpen, 
  onClose, 
  children, 
  position = 'right', // 'left' | 'right' | 'top' | 'bottom'
  className = ''
}) => {
  const getSlideClasses = () => {
    const baseClasses = 'md:hidden fixed z-300 bg-background border shadow-modal transition-transform duration-300 ease-medical';
    
    switch (position) {
      case 'left':
        return `${baseClasses} top-0 left-0 h-full w-80 max-w-[80vw] border-r ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`;
      case 'right':
        return `${baseClasses} top-0 right-0 h-full w-80 max-w-[80vw] border-l ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`;
      case 'top':
        return `${baseClasses} top-0 left-0 right-0 border-b ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`;
      case 'bottom':
        return `${baseClasses} bottom-0 left-0 right-0 border-t ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`;
      default:
        return `${baseClasses} top-0 right-0 h-full w-80 max-w-[80vw] border-l ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`;
    }
  };

  return (
    <div className={`${getSlideClasses()} ${className}`}>
      {/* Close Button */}
      <div className="flex justify-end p-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-2"
          aria-label="Close menu"
        >
          <Icon name="X" size={20} />
        </Button>
      </div>

      {/* Menu Content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

// Mobile Navigation Item Component
export const MobileNavItem = ({ 
  icon, 
  label, 
  description, 
  onClick, 
  isActive = false,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-6 py-4 text-left transition-colors duration-200 ${
        isActive
          ? 'bg-primary/10 text-primary border-r-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
      } ${className}`}
    >
      {icon && (
        <Icon 
          name={icon} 
          size={20} 
          className={isActive ? 'text-primary' : 'text-muted-foreground'} 
        />
      )}
      <div className="flex flex-col min-w-0">
        <span className="text-base font-medium truncate">{label}</span>
        {description && (
          <span className="text-sm text-muted-foreground truncate">
            {description}
          </span>
        )}
      </div>
    </button>
  );
};

export default MobileMenuToggle;