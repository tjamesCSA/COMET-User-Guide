// COMET User Guide - Simplified Navigation Implementation

document.addEventListener('DOMContentLoaded', function() {
    console.log('COMET Guide DOM loaded');
    
    // Application state
    let currentSectionIndex = -1;
    let isOnWelcome = true;
    
    const sections = [
        'participating-clubs',
        'your-club', 
        'your-team',
        'matchday-lineup'
    ];
    
    const sectionTitles = {
        'participating-clubs': 'Participating Clubs',
        'your-club': 'Your CLUB in COMET',
        'your-team': 'Your competition TEAM',
        'matchday-lineup': 'Your matchday lineup'
    };
    
    // Core navigation functions
    function showWelcome() {
        console.log('Showing welcome');
        
        // Show welcome section
        const welcomeSection = document.getElementById('welcome');
        if (welcomeSection) {
            welcomeSection.style.display = 'block';
        }
        
        // Hide all content sections
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('hidden');
            }
        });
        
        currentSectionIndex = -1;
        isOnWelcome = true;
        updateBreadcrumb();
        updateNavigationButtons();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function goToSection(sectionId) {
        console.log('Going to section:', sectionId);
        
        const sectionIndex = sections.indexOf(sectionId);
        if (sectionIndex === -1) {
            console.error('Section not found:', sectionId);
            return;
        }
        
        // Hide welcome
        const welcomeSection = document.getElementById('welcome');
        if (welcomeSection) {
            welcomeSection.style.display = 'none';
        }
        
        // Hide all sections
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                section.classList.add('hidden');
            }
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }
        
        currentSectionIndex = sectionIndex;
        isOnWelcome = false;
        updateBreadcrumb();
        updateNavigationButtons();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        console.log('Navigated to section:', sectionId);
    }
    
    function nextSection() {
        console.log('Next section called');
        if (isOnWelcome) {
            goToSection(sections[0]);
        } else if (currentSectionIndex < sections.length - 1) {
            goToSection(sections[currentSectionIndex + 1]);
        }
    }
    
    function prevSection() {
        console.log('Previous section called');
        if (isOnWelcome) {
            return;
        } else if (currentSectionIndex > 0) {
            goToSection(sections[currentSectionIndex - 1]);
        } else {
            showWelcome();
        }
    }
    
    function updateBreadcrumb() {
        const breadcrumbText = document.getElementById('breadcrumb-text');
        if (!breadcrumbText) return;
        
        if (isOnWelcome) {
            breadcrumbText.textContent = 'Getting Started';
        } else {
            const currentSection = sections[currentSectionIndex];
            const sectionNumber = currentSectionIndex + 1;
            const sectionTitle = sectionTitles[currentSection];
            breadcrumbText.textContent = `${sectionNumber}. ${sectionTitle}`;
        }
    }
    
    function updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-section');
        const nextBtn = document.getElementById('next-section');
        const backBtn = document.getElementById('back-to-overview');
        
        if (!prevBtn || !nextBtn || !backBtn) return;
        
        if (isOnWelcome) {
            prevBtn.disabled = true;
            prevBtn.textContent = '← Previous';
            nextBtn.disabled = false;
            nextBtn.textContent = 'Get Started →';
            backBtn.classList.add('hidden');
        } else {
            prevBtn.disabled = false;
            nextBtn.disabled = currentSectionIndex >= sections.length - 1;
            
            if (currentSectionIndex === 0) {
                prevBtn.textContent = '← Overview';
            } else {
                prevBtn.textContent = '← Previous';
            }
            
            if (currentSectionIndex >= sections.length - 1) {
                nextBtn.textContent = 'Complete ✓';
                nextBtn.disabled = true;
            } else {
                nextBtn.textContent = 'Next →';
            }
            
            backBtn.classList.remove('hidden');
        }
    }
    
    // Event binding
    function bindEvents() {
        console.log('Binding events');
        
        // Section cards - direct binding
        const sectionCards = document.querySelectorAll('.section-card');
        sectionCards.forEach((card, index) => {
            const sectionId = card.getAttribute('data-section');
            console.log(`Binding section card ${index}:`, sectionId);
            
            // Make clickable
            card.style.cursor = 'pointer';
            card.setAttribute('tabindex', '0');
            
            // Mouse click
            card.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Section card clicked:', sectionId);
                goToSection(sectionId);
            });
            
            // Keyboard navigation
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    console.log('Section card keyboard activated:', sectionId);
                    goToSection(sectionId);
                }
            });
        });
        
        // Navigation buttons
        const prevBtn = document.getElementById('prev-section');
        const nextBtn = document.getElementById('next-section');
        const backBtn = document.getElementById('back-to-overview');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Previous button clicked');
                prevSection();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Next button clicked');
                nextSection();
            });
        }
        
        if (backBtn) {
            backBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Back button clicked');
                showWelcome();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                nextSection();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                prevSection();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                showWelcome();
            }
        });
        
        // Header navigation
        const breadcrumb = document.getElementById('breadcrumb-text');
        if (breadcrumb) {
            breadcrumb.style.cursor = 'pointer';
            breadcrumb.addEventListener('click', function(e) {
                e.preventDefault();
                showWelcome();
            });
        }
        
        // COMET title click
        const cometTitle = document.querySelector('.comet-title');
        if (cometTitle) {
            cometTitle.style.cursor = 'pointer';
            cometTitle.addEventListener('click', function(e) {
                e.preventDefault();
                showWelcome();
            });
        }
        
        console.log('All events bound successfully');
    }
    
    // Initialize
    function initialize() {
        console.log('Initializing COMET Guide');
        
        bindEvents();
        updateBreadcrumb();
        updateNavigationButtons();
        
        // Add smooth scrolling
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Add accessibility improvements
        const sectionCards = document.querySelectorAll('.section-card');
        sectionCards.forEach((card, index) => {
            const titleElement = card.querySelector('h3');
            if (titleElement) {
                card.setAttribute('aria-label', `Navigate to section ${index + 1}: ${titleElement.textContent}`);
                card.setAttribute('role', 'button');
            }
        });
        
        // Add main content ID for accessibility
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.id = 'main-content';
        }
        
        console.log('COMET Guide initialized successfully');
    }
    
    // Start the application
    initialize();
    
    // Add enhanced UX features after short delay
    setTimeout(function() {
        // Add intersection observer for step cards animation
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry, index) {
                    if (entry.isIntersecting) {
                        setTimeout(function() {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                    }
                });
            }, { threshold: 0.1 });
            
            document.querySelectorAll('.step-card').forEach(function(card) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.6s ease-out';
                observer.observe(card);
            });
        }
        
        // Highlight important content
        const importantElements = document.querySelectorAll('.important-note, .warning-note, .critical-note');
        importantElements.forEach(function(element, index) {
            setTimeout(function() {
                element.style.transform = 'scale(1.02)';
                setTimeout(function() {
                    element.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
        
        console.log('Enhanced UX features loaded');
    }, 1000);
    
    // Add print support
    setTimeout(function() {
        const printBtn = document.createElement('button');
        printBtn.textContent = 'Print Guide';
        printBtn.className = 'btn btn--outline btn--sm';
        printBtn.style.position = 'fixed';
        printBtn.style.top = '20px';
        printBtn.style.left = '20px';
        printBtn.style.zIndex = '1000';
        
        printBtn.addEventListener('click', function() {
            window.print();
        });
        
        document.body.appendChild(printBtn);
    }, 2000);
    
    // Global functions for debugging
    window.cometGuideDebug = {
        goToSection: goToSection,
        showWelcome: showWelcome,
        nextSection: nextSection,
        prevSection: prevSection,
        getCurrentState: function() {
            return {
                currentSectionIndex: currentSectionIndex,
                isOnWelcome: isOnWelcome,
                sections: sections
            };
        }
    };
});