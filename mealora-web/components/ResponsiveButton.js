'use client'

import { useDeviceDetection, getResponsiveValue, getResponsiveSpacing } from '@/hooks/useDeviceDetection'

export default function ResponsiveButton({ 
  children, 
  className = '',
  variant = 'primary',
  size = 'default',
  fullWidth = 'auto',
  onClick,
  disabled = false,
  type = 'button'
}) {
  const deviceInfo = useDeviceDetection()
  
  const getButtonSize = () => {
    const { isMobile, isTablet, width } = deviceInfo
    
    if (size === 'default') {
      if (isMobile) {
        return {
          padding: `${Math.max(12, width * 0.03)}px ${Math.max(16, width * 0.04)}px`,
          fontSize: Math.max(14, width * 0.035),
          minHeight: 44 // Touch-friendly minimum
        }
      } else if (isTablet) {
        return {
          padding: '14px 20px',
          fontSize: 16,
          minHeight: 48
        }
      }
      return {
        padding: '16px 24px',
        fontSize: 18,
        minHeight: 52
      }
    }
    
    const sizes = {
      sm: { padding: '8px 12px', fontSize: 12, minHeight: 36 },
      md: { padding: '12px 16px', fontSize: 14, minHeight: 44 },
      lg: { padding: '16px 24px', fontSize: 18, minHeight: 52 },
      xl: { padding: '20px 32px', fontSize: 20, minHeight: 60 }
    }
    
    return sizes[size] || sizes.md
  }
  
  const getVariantStyles = () => {
    const variants = {
      primary: {
        background: 'linear-gradient(135deg, #00E6A0 0%, #6366F1 100%)',
        color: '#FFFFFF',
        border: 'none',
        boxShadow: '0 4px 20px rgba(0, 230, 160, 0.3)'
      },
      secondary: {
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#374151',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      },
      outline: {
        background: 'transparent',
        color: '#00E6A0',
        border: '2px solid #00E6A0',
        boxShadow: 'none'
      },
      ghost: {
        background: 'transparent',
        color: '#6B7280',
        border: 'none',
        boxShadow: 'none'
      }
    }
    
    return variants[variant] || variants.primary
  }
  
  const getWidth = () => {
    if (fullWidth === 'auto') {
      return deviceInfo.isMobile ? '100%' : 'auto'
    }
    return fullWidth ? '100%' : 'auto'
  }

  const buttonSize = getButtonSize()
  const variantStyles = getVariantStyles()

  const buttonStyle = {
    ...buttonSize,
    ...variantStyles,
    width: getWidth(),
    borderRadius: deviceInfo.isMobile ? '8px' : '12px',
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    textDecoration: 'none',
    outline: 'none',
    position: 'relative',
    overflow: 'hidden'
  }

  const handleMouseEnter = (e) => {
    if (!disabled) {
      e.target.style.transform = 'translateY(-2px)'
      e.target.style.boxShadow = variant === 'primary' 
        ? '0 8px 30px rgba(0, 230, 160, 0.5)'
        : '0 8px 30px rgba(0, 0, 0, 0.15)'
    }
  }

  const handleMouseLeave = (e) => {
    if (!disabled) {
      e.target.style.transform = 'translateY(0)'
      e.target.style.boxShadow = variantStyles.boxShadow
    }
  }

  const handleMouseDown = (e) => {
    if (!disabled) {
      e.target.style.transform = 'translateY(0) scale(0.98)'
    }
  }

  const handleMouseUp = (e) => {
    if (!disabled) {
      e.target.style.transform = 'translateY(-2px) scale(1)'
    }
  }

  return (
    <button
      type={type}
      className={className}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      data-device-type={deviceInfo.deviceType}
      data-touch-friendly="true"
    >
      {children}
    </button>
  )
}
