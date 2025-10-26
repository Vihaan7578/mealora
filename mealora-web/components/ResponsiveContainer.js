'use client'

import { useDeviceDetection, getResponsiveValue, getResponsiveSpacing, getResponsivePadding } from '@/hooks/useDeviceDetection'

export default function ResponsiveContainer({ 
  children, 
  className = '', 
  padding = 'default',
  maxWidth = 'default',
  spacing = 'default'
}) {
  const deviceInfo = useDeviceDetection()
  
  const getPaddingValue = () => {
    if (padding === 'default') {
      return getResponsivePadding(deviceInfo)
    }
    return getResponsiveValue(padding, deviceInfo)
  }
  
  const getMaxWidth = () => {
    if (maxWidth === 'default') {
      const { width, isMobile, isTablet } = deviceInfo
      if (isMobile) return Math.min(width * 0.95, 400)
      if (isTablet) return Math.min(width * 0.9, 800)
      return Math.min(width * 0.85, 1200)
    }
    return getResponsiveValue(maxWidth, deviceInfo)
  }
  
  const getSpacingValue = () => {
    if (spacing === 'default') {
      return getResponsiveSpacing(16, deviceInfo)
    }
    return getResponsiveValue(spacing, deviceInfo)
  }

  const containerStyle = {
    width: '100%',
    maxWidth: `${getMaxWidth()}px`,
    margin: '0 auto',
    padding: `${getPaddingValue()}px`,
    boxSizing: 'border-box'
  }

  return (
    <div 
      className={className}
      style={containerStyle}
      data-device-type={deviceInfo.deviceType}
      data-screen-size={deviceInfo.screenSize}
    >
      {children}
    </div>
  )
}
