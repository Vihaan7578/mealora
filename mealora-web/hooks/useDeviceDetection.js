'use client'

import { useState, useEffect } from 'react'

export const useDeviceDetection = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isTouch: false,
    orientation: 'portrait',
    deviceType: 'unknown',
    screenSize: 'xs'
  })

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const orientation = width > height ? 'landscape' : 'portrait'
      
      // Determine device type based on dimensions and touch capability
      let deviceType = 'unknown'
      let isMobile = false
      let isTablet = false
      let isDesktop = false
      let screenSize = 'xs'

      if (width <= 480) {
        deviceType = 'mobile-small'
        isMobile = true
        screenSize = 'xs'
      } else if (width <= 768) {
        deviceType = 'mobile-large'
        isMobile = true
        screenSize = 'sm'
      } else if (width <= 1024) {
        deviceType = 'tablet'
        isTablet = true
        screenSize = 'md'
      } else if (width <= 1440) {
        deviceType = 'desktop-small'
        isDesktop = true
        screenSize = 'lg'
      } else {
        deviceType = 'desktop-large'
        isDesktop = true
        screenSize = 'xl'
      }

      setDeviceInfo({
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
        isTouch,
        orientation,
        deviceType,
        screenSize
      })
    }

    // Initial detection
    updateDeviceInfo()

    // Listen for resize events
    window.addEventListener('resize', updateDeviceInfo)
    window.addEventListener('orientationchange', updateDeviceInfo)

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDeviceInfo)
      window.removeEventListener('orientationchange', updateDeviceInfo)
    }
  }, [])

  return deviceInfo
}

// Utility functions for device-specific calculations
export const getResponsiveValue = (values, deviceInfo) => {
  const { screenSize } = deviceInfo
  
  if (typeof values === 'object') {
    return values[screenSize] || values.xs || values.default || values
  }
  
  return values
}

export const getResponsiveSpacing = (base, deviceInfo) => {
  const { width, isMobile, isTablet } = deviceInfo
  
  if (isMobile) {
    return Math.max(base * 0.75, 8) // Reduce spacing on mobile
  } else if (isTablet) {
    return Math.max(base * 0.9, 12) // Slightly reduce on tablet
  }
  
  return base
}

export const getResponsiveFontSize = (base, deviceInfo) => {
  const { width, isMobile, isTablet } = deviceInfo
  
  if (isMobile) {
    return Math.max(base * 0.8, 12) // Smaller fonts on mobile
  } else if (isTablet) {
    return Math.max(base * 0.9, 14) // Slightly smaller on tablet
  }
  
  return base
}

export const getResponsiveGridColumns = (deviceInfo) => {
  const { isMobile, isTablet, width } = deviceInfo
  
  if (isMobile) {
    return width < 400 ? 1 : 2
  } else if (isTablet) {
    return 2
  }
  
  return 3
}

export const getResponsivePadding = (deviceInfo) => {
  const { width, isMobile, isTablet } = deviceInfo
  
  if (isMobile) {
    return width < 400 ? 12 : 16
  } else if (isTablet) {
    return 20
  }
  
  return 24
}

export const getResponsiveModalSize = (deviceInfo) => {
  const { width, height, isMobile, isTablet } = deviceInfo
  
  if (isMobile) {
    return {
      width: Math.min(width * 0.95, 400),
      height: Math.min(height * 0.9, 600)
    }
  } else if (isTablet) {
    return {
      width: Math.min(width * 0.8, 600),
      height: Math.min(height * 0.8, 700)
    }
  }
  
  return {
    width: Math.min(width * 0.7, 800),
    height: Math.min(height * 0.8, 800)
  }
}
