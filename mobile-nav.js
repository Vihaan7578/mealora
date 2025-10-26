// Shared Responsive Navigation System
class ResponsiveNavigation {
    constructor() {
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.desktopNav = document.querySelector('.desktop-nav');
        this.isMenuOpen = false;
        
        this.init();
    }
    
    init() {
        this.detectDevice();
        this.setupEventListeners();
        this.setupResizeListener();
    }
    
    detectDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
        const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent);
        const screenWidth = window.innerWidth;
        
        const shouldShowMobileMenu = isMobile || isTablet || screenWidth < 1024;
        
        if (shouldShowMobileMenu) {
            this.showMobileMenu();
        } else {
            this.showDesktopMenu();
        }
    }
    
    showMobileMenu() {
        if (this.desktopNav) this.desktopNav.style.display = 'none';
        if (this.mobileMenuBtn) this.mobileMenuBtn.style.display = 'block';
        if (this.mobileMenu) this.mobileMenu.style.display = 'none';
    }
    
    showDesktopMenu() {
        if (this.desktopNav) this.desktopNav.style.display = 'flex';
        if (this.mobileMenuBtn) this.mobileMenuBtn.style.display = 'none';
        if (this.mobileMenu) this.mobileMenu.style.display = 'none';
        this.isMenuOpen = false;
    }
    
    setupEventListeners() {
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && 
                !this.mobileMenu.contains(e.target) && 
                !this.mobileMenuBtn.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }
    
    setupResizeListener() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.detectDevice();
            }, 250);
        });
    }
    
    toggleMobileMenu() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        if (this.mobileMenu) {
            this.mobileMenu.style.display = 'block';
            this.mobileMenu.style.opacity = '0';
            this.mobileMenu.style.transform = 'translateY(-10px)';
            
            requestAnimationFrame(() => {
                this.mobileMenu.style.transition = 'all 0.3s ease';
                this.mobileMenu.style.opacity = '1';
                this.mobileMenu.style.transform = 'translateY(0)';
            });
            
            this.isMenuOpen = true;
            this.mobileMenuBtn.classList.add('active');
        }
    }
    
    closeMobileMenu() {
        if (this.mobileMenu) {
            this.mobileMenu.style.transition = 'all 0.3s ease';
            this.mobileMenu.style.opacity = '0';
            this.mobileMenu.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                this.mobileMenu.style.display = 'none';
            }, 300);
            
            this.isMenuOpen = false;
            this.mobileMenuBtn.classList.remove('active');
        }
    }
}

// Initialize responsive navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ResponsiveNavigation();
});
