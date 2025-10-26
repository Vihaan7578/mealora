// Dynamic Device Detection and Responsive Adjustments
class DeviceDetector {
  constructor() {
    this.deviceInfo = {
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      isTouch: false,
      orientation: 'portrait',
      deviceType: 'unknown',
      screenSize: 'xs',
      pixelRatio: window.devicePixelRatio || 1
    }
    
    this.init()
  }

  init() {
    this.detectDevice()
    this.setupEventListeners()
    this.applyResponsiveStyles()
  }

  detectDevice() {
    const { width, height } = this.deviceInfo
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

    this.deviceInfo = {
      ...this.deviceInfo,
      isMobile,
      isTablet,
      isDesktop,
      isTouch,
      orientation,
      deviceType,
      screenSize
    }

    // Add device info to body for CSS targeting
    document.body.setAttribute('data-device-type', deviceType)
    document.body.setAttribute('data-screen-size', screenSize)
    document.body.setAttribute('data-orientation', orientation)
    document.body.setAttribute('data-touch', isTouch)
  }

  setupEventListeners() {
    let resizeTimeout
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        this.deviceInfo.width = window.innerWidth
        this.deviceInfo.height = window.innerHeight
        this.detectDevice()
        this.applyResponsiveStyles()
      }, 100)
    })

    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.deviceInfo.width = window.innerWidth
        this.deviceInfo.height = window.innerHeight
        this.detectDevice()
        this.applyResponsiveStyles()
      }, 100)
    })
  }

  applyResponsiveStyles() {
    const { isMobile, isTablet, width, height } = this.deviceInfo
    
    // Update CSS custom properties for dynamic sizing
    const root = document.documentElement
    root.style.setProperty('--device-width', `${width}px`)
    root.style.setProperty('--device-height', `${height}px`)
    root.style.setProperty('--device-padding', isMobile ? '12px' : isTablet ? '20px' : '24px')
    root.style.setProperty('--device-margin', isMobile ? '8px' : isTablet ? '16px' : '20px')
    root.style.setProperty('--device-font-scale', isMobile ? '0.8' : isTablet ? '0.9' : '1')
    root.style.setProperty('--device-spacing', isMobile ? '12px' : isTablet ? '16px' : '20px')

    // Apply responsive classes to elements
    this.updateElementSizes()
    this.updateGridLayouts()
    this.updateTypography()
    this.updateButtons()
    this.updateModals()
  }

  updateElementSizes() {
    const { isMobile, isTablet, width } = this.deviceInfo
    
    // Update container max-widths
    const containers = document.querySelectorAll('.responsive-container, .container')
    containers.forEach(container => {
      if (isMobile) {
        container.style.maxWidth = `${Math.min(width * 0.95, 400)}px`
        container.style.padding = '12px'
      } else if (isTablet) {
        container.style.maxWidth = `${Math.min(width * 0.9, 800)}px`
        container.style.padding = '20px'
      } else {
        container.style.maxWidth = `${Math.min(width * 0.85, 1200)}px`
        container.style.padding = '24px'
      }
    })

    // Update card padding
    const cards = document.querySelectorAll('.glass, .card-responsive')
    cards.forEach(card => {
      if (isMobile) {
        card.style.padding = '16px'
        card.style.borderRadius = '12px'
      } else if (isTablet) {
        card.style.padding = '20px'
        card.style.borderRadius = '16px'
      } else {
        card.style.padding = '24px'
        card.style.borderRadius = '20px'
      }
    })
  }

  updateGridLayouts() {
    const { isMobile, isTablet, width } = this.deviceInfo
    
    // Update grid columns based on device width
    const grids = document.querySelectorAll('.responsive-grid, .stats-responsive, .features-responsive')
    grids.forEach(grid => {
      if (isMobile) {
        const columns = width < 400 ? 1 : 2
        grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`
        grid.style.gap = '12px'
      } else if (isTablet) {
        grid.style.gridTemplateColumns = 'repeat(2, 1fr)'
        grid.style.gap = '16px'
      } else {
        grid.style.gridTemplateColumns = 'repeat(3, 1fr)'
        grid.style.gap = '20px'
      }
    })
  }

  updateTypography() {
    const { isMobile, isTablet } = this.deviceInfo
    
    // Update font sizes dynamically
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headings.forEach(heading => {
      const currentSize = parseFloat(getComputedStyle(heading).fontSize)
      if (isMobile) {
        heading.style.fontSize = `${Math.max(currentSize * 0.8, 16)}px`
      } else if (isTablet) {
        heading.style.fontSize = `${Math.max(currentSize * 0.9, 18)}px`
      }
    })

    const paragraphs = document.querySelectorAll('p, span, div')
    paragraphs.forEach(p => {
      const currentSize = parseFloat(getComputedStyle(p).fontSize)
      if (isMobile && currentSize > 12) {
        p.style.fontSize = `${Math.max(currentSize * 0.85, 12)}px`
      } else if (isTablet && currentSize > 14) {
        p.style.fontSize = `${Math.max(currentSize * 0.95, 14)}px`
      }
    })
  }

  updateButtons() {
    const { isMobile, isTablet, width } = this.deviceInfo
    
    const buttons = document.querySelectorAll('.btn, .btn-responsive, button')
    buttons.forEach(button => {
      if (isMobile) {
        button.style.padding = `${Math.max(12, width * 0.03)}px ${Math.max(16, width * 0.04)}px`
        button.style.fontSize = `${Math.max(14, width * 0.035)}px`
        button.style.minHeight = '44px'
        button.style.width = button.classList.contains('btn-responsive') ? '100%' : 'auto'
      } else if (isTablet) {
        button.style.padding = '14px 20px'
        button.style.fontSize = '16px'
        button.style.minHeight = '48px'
      } else {
        button.style.padding = '16px 24px'
        button.style.fontSize = '18px'
        button.style.minHeight = '52px'
      }
    })
  }

  updateModals() {
    const { isMobile, isTablet, width, height } = this.deviceInfo
    
    const modals = document.querySelectorAll('.modal-responsive, .modal')
    modals.forEach(modal => {
      if (isMobile) {
        modal.style.width = `${Math.min(width * 0.95, 400)}px`
        modal.style.height = `${Math.min(height * 0.9, 600)}px`
        modal.style.margin = '8px'
      } else if (isTablet) {
        modal.style.width = `${Math.min(width * 0.8, 600)}px`
        modal.style.height = `${Math.min(height * 0.8, 700)}px`
        modal.style.margin = '16px'
      } else {
        modal.style.width = `${Math.min(width * 0.7, 800)}px`
        modal.style.height = `${Math.min(height * 0.8, 800)}px`
        modal.style.margin = '24px'
      }
    })
  }

  // Utility methods
  getResponsiveValue(values) {
    const { screenSize } = this.deviceInfo
    if (typeof values === 'object') {
      return values[screenSize] || values.xs || values.default || values
    }
    return values
  }

  getResponsiveSpacing(base) {
    const { isMobile, isTablet } = this.deviceInfo
    if (isMobile) return Math.max(base * 0.75, 8)
    if (isTablet) return Math.max(base * 0.9, 12)
    return base
  }

  getResponsiveFontSize(base) {
    const { isMobile, isTablet } = this.deviceInfo
    if (isMobile) return Math.max(base * 0.8, 12)
    if (isTablet) return Math.max(base * 0.9, 14)
    return base
  }
}

// Initialize device detection when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.deviceDetector = new DeviceDetector()
})

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DeviceDetector
}
