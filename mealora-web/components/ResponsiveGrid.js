'use client'

import { useDeviceDetection, getResponsiveValue, getResponsiveGridColumns } from '@/hooks/useDeviceDetection'

export default function ResponsiveGrid({ 
  children, 
  className = '',
  columns = 'auto',
  gap = 'default',
  minItemWidth = 250,
  alignItems = 'stretch',
  justifyItems = 'stretch'
}) {
  const deviceInfo = useDeviceDetection()
  
  const getColumns = () => {
    if (columns === 'auto') {
      return getResponsiveGridColumns(deviceInfo)
    }
    return getResponsiveValue(columns, deviceInfo)
  }
  
  const getGap = () => {
    if (gap === 'default') {
      const { isMobile, isTablet } = deviceInfo
      if (isMobile) return 12
      if (isTablet) return 16
      return 20
    }
    return getResponsiveValue(gap, deviceInfo)
  }
  
  const getMinItemWidth = () => {
    const { width, isMobile } = deviceInfo
    if (isMobile) {
      return Math.min(minItemWidth, width * 0.9)
    }
    return minItemWidth
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${getColumns()}, minmax(${getMinItemWidth()}px, 1fr))`,
    gap: `${getGap()}px`,
    alignItems,
    justifyItems,
    width: '100%'
  }

  return (
    <div 
      className={className}
      style={gridStyle}
      data-device-type={deviceInfo.deviceType}
      data-columns={getColumns()}
    >
      {children}
    </div>
  )
}
