'use client'

import { useDeviceDetection, getResponsiveValue, getResponsiveFontSize } from '@/hooks/useDeviceDetection'

export default function ResponsiveText({ 
  children, 
  className = '',
  size = 'base',
  weight = 'normal',
  color = 'inherit',
  as: Component = 'p'
}) {
  const deviceInfo = useDeviceDetection()
  
  const getFontSize = () => {
    const baseSizes = {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
      '6xl': 60
    }
    
    const baseSize = baseSizes[size] || 16
    return getResponsiveFontSize(baseSize, deviceInfo)
  }
  
  const getResponsiveWeight = () => {
    const weights = {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    }
    
    return weights[weight] || 400
  }
  
  const getResponsiveColor = () => {
    const colors = {
      inherit: 'inherit',
      primary: '#00E6A0',
      secondary: '#6366F1',
      gray: '#6B7280',
      'gray-600': '#6B7280',
      'gray-700': '#374151',
      'gray-800': '#1F2937',
      'gray-900': '#111827',
      white: '#FFFFFF',
      black: '#000000'
    }
    
    return colors[color] || color
  }

  const textStyle = {
    fontSize: `${getFontSize()}px`,
    fontWeight: getResponsiveWeight(),
    color: getResponsiveColor(),
    lineHeight: deviceInfo.isMobile ? 1.4 : 1.6,
    margin: 0,
    padding: 0
  }

  return (
    <Component 
      className={className}
      style={textStyle}
      data-device-type={deviceInfo.deviceType}
    >
      {children}
    </Component>
  )
}
