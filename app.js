// COMET User Guide - Enhanced with Competition-Specific Features - FIXED

document.addEventListener('DOMContentLoaded', function() {
    console.log('COMET Guide DOM loaded');
    
    // Application state
    let currentSectionIndex = -1;
    let isOnWelcome = true;
    let selectedCompetition = 'all';
    
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

    // Competition data
    const competitionData = {
        'national-adult': {
            name: 'National Championships (Adult/Senior)',
            playerMin: 15,
            playerMax: 21,
            officialsMin: 2,
            officialsMax: 5,
            color: '#E31E24'
        },
        'national-youth': {
            name: 'National Championships (Youth U-17/U-15)',
            playerMin: 15,
            playerMax: 20,
            officialsMin: 2,
            officialsMax: 5,
            color: '#0066CC'
        },
        'pdp': {
            name: 'PDP Championship',
            playerMin: 16,
            playerMax: 20,
            officialsMin: 2,
            officialsMax: 6,
            color: '#00A651'
        },
        'masters': {
            name: 'Masters Championship', 
            playerMin: 15,
            playerMax: 21,
            officialsMin: 2,
            officialsMax: 5,
            color: '#FF6B35'
        },
        'futsal': {
            name: 'Futsal Canadian Championship',
            playerMin: 10,
            playerMax: 14,
            officialsMin: 2,
            officialsMax: 4,
            color: '#9B59B6'
        }
    };

    // Competition selector functionality
    function updateCompetitionContent(competitionId) {
        console.log('Updating competition content for:', competitionId);
        selectedCompetition = competitionId;
        
        // Update roster limits display
        const rosterLimits = document.querySelectorAll('#roster-limits .competition-limit[data-competition]');
        const officialsLimits = document.querySelectorAll('#officials-limits .competition-limit[data-competition]');
        
        // Reset all limits
        [...rosterLimits, ...officialsLimits].forEach(limit => {
            limit.classList.remove('highlighted', 'dimmed');
        });
        
        if (competitionId === 'all') {
            // Show all limits normally
            [...rosterLimits, ...officialsLimits].forEach(limit => {
                limit.style.display = 'block';
            });
        } else {
            // Highlight selected competition and dim others
            [...rosterLimits, ...officialsLimits].forEach(limit => {
                const limitCompetition = limit.getAttribute('data-competition');
                if (limitCompetition === competitionId) {
                    limit.classList.add('highlighted');
                    limit.classList.add('highlight-animation');
                    // Remove animation class after it completes
                    setTimeout(() => limit.classList.remove('highlight-animation'), 600);
                } else {
                    limit.classList.add('dimmed');
                }
            });
            
            // Show notification
            showCompetitionChangeNotice(competitionId);
        }
        
        console.log('Competition content updated for:', competitionId);
    }

    // Show notice when competition changes
    function showCompetitionChangeNotice(competitionId) {
        const competition = competitionData[competitionId];
        if (!competition) return;
        
        // Create temporary notice
        const notice = document.createElement('div');
        notice.className = 'competition-change-notice';
        notice.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${competition.color};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            font-weight: 500;
            max-width: 300px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notice.textContent = `Now viewing: ${competition.name}`;
        
        document.body.appendChild(notice);
        
        // Animate in
        setTimeout(() => {
            notice.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notice.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notice.parentNode) {
                    notice.parentNode.removeChild(notice);
                }
            }, 300);
        }, 3000);
    }

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
        
        // Hide all sections first
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
            console.log('Section shown:', sectionId);
        }
        
        currentSectionIndex = sectionIndex;
        isOnWelcome = false;
        updateBreadcrumb();
        updateNavigationButtons();
        
        // Update competition content if we're in a section that has competition-specific info
        if (sectionId === 'your-team') {
            setTimeout(() => {
                updateCompetitionContent(selectedCompetition);
            }, 100);
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        console.log('Successfully navigated to section:', sectionId);
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

    // Event binding with proper error handling
    function bindEvents() {
        console.log('Binding events');
        
        // Competition selector - FIXED
        const competitionSelect = document.getElementById('competition-select');
        if (competitionSelect) {
            console.log('Competition selector found, binding change event');
            competitionSelect.addEventListener('change', function(e) {
                const competitionId = e.target.value;
                console.log('Competition changed to:', competitionId);
                updateCompetitionContent(competitionId);
            });
        } else {
            console.error('Competition selector not found!');
        }
        
        // Section cards - FIXED with more robust selection
        const sectionCards = document.querySelectorAll('.section-card[data-section]');
        console.log('Found section cards:', sectionCards.length);
        
        sectionCards.forEach((card, index) => {
            const sectionId = card.getAttribute('data-section');
            console.log(`Binding section card ${index}:`, sectionId);
            
            if (!sectionId || !sections.includes(sectionId)) {
                console.error('Invalid section ID:', sectionId);
                return;
            }
            
            // Make clickable
            card.style.cursor = 'pointer';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Navigate to ${sectionTitles[sectionId]}`);
            
            // Remove any existing listeners
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            
            // Add click listener
            newCard.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Section card clicked:', sectionId);
                goToSection(sectionId);
            });
            
            // Add keyboard listener  
            newCard.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Section card keyboard activated:', sectionId);
                    goToSection(sectionId);
                }
            });
            
            console.log(`Successfully bound events for section: ${sectionId}`);
        });
        
        // Navigation buttons - FIXED
        const prevBtn = document.getElementById('prev-section');
        const nextBtn = document.getElementById('next-section');
        const backBtn = document.getElementById('back-to-overview');
        
        if (prevBtn) {
            console.log('Binding prev button');
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Previous button clicked');
                prevSection();
            });
        }
        
        if (nextBtn) {
            console.log('Binding next button');
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Next button clicked');
                nextSection();
            });
        }
        
        if (backBtn) {
            console.log('Binding back button');
            backBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Back button clicked');
                showWelcome();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            // Don't interfere when user is typing in select or input
            if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') {
                return;
            }
            
            switch(e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    nextSection();
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    prevSection();
                    break;
                case 'Escape':
                    e.preventDefault();
                    showWelcome();
                    break;
                case '1':
                case '2':
                case '3':
                case '4':
                    e.preventDefault();
                    const sectionIndex = parseInt(e.key) - 1;
                    if (sectionIndex < sections.length) {
                        goToSection(sections[sectionIndex]);
                    }
                    break;
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

    // Initialize application
    function initialize() {
        console.log('Initializing COMET Guide');
        
        // Ensure DOM is ready
        const welcomeSection = document.getElementById('welcome');
        const competitionSelect = document.getElementById('competition-select');
        
        if (!welcomeSection) {
            console.error('Welcome section not found!');
            return;
        }
        
        if (!competitionSelect) {
            console.error('Competition selector not found!');
        }
        
        bindEvents();
        updateBreadcrumb();
        updateNavigationButtons();
        
        // Initialize competition content
        updateCompetitionContent('all');
        
        // Add smooth scrolling
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Add accessibility improvements
        const sectionCards = document.querySelectorAll('.section-card');
        sectionCards.forEach((card, index) => {
            const titleElement = card.querySelector('h3');
            if (titleElement) {
                card.setAttribute('aria-label', `Navigate to section ${index + 1}: ${titleElement.textContent}`);
            }
        });
        
        console.log('COMET Guide initialized successfully');
    }

    // Enhanced features initialization
    function initializeEnhancedFeatures() {
        // Intersection Observer for animations
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
        
        // Add print support
        addPrintSupport();
        
        console.log('Enhanced features initialized');
    }

    function addPrintSupport() {
        const printBtn = document.createElement('button');
        printBtn.textContent = '🖨 Print Guide';
        printBtn.className = 'btn btn--outline btn--sm';
        printBtn.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1000;
            display: block;
        `;
        
        printBtn.addEventListener('click', function() {
            // Show all sections for printing
            sections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) {
                    section.classList.remove('hidden');
                }
            });
            
            window.print();
            
            // Restore current view after printing
            setTimeout(() => {
                if (isOnWelcome) {
                    showWelcome();
                } else {
                    goToSection(sections[currentSectionIndex]);
                }
            }, 1000);
        });
        
        document.body.appendChild(printBtn);
    }

    // Wait for DOM to be fully ready before initializing
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    // Initialize enhanced features after short delay
    setTimeout(initializeEnhancedFeatures, 500);
    
    // Debug and API functions
    window.cometGuideDebug = {
        goToSection: goToSection,
        showWelcome: showWelcome,
        nextSection: nextSection,
        prevSection: prevSection,
        updateCompetitionContent: updateCompetitionContent,
        getCurrentState: function() {
            return {
                currentSectionIndex: currentSectionIndex,
                isOnWelcome: isOnWelcome,
                selectedCompetition: selectedCompetition,
                sections: sections,
                competitionData: competitionData
            };
        },
        setCompetition: function(competitionId) {
            const competitionSelect = document.getElementById('competition-select');
            if (competitionSelect) {
                competitionSelect.value = competitionId;
                competitionSelect.dispatchEvent(new Event('change'));
            }
        }
    };

    // Public API
    window.cometGuide = {
        navigateToSection: goToSection,
        selectCompetition: function(competitionId) {
            const competitionSelect = document.getElementById('competition-select');
            if (competitionSelect && competitionData[competitionId]) {
                competitionSelect.value = competitionId;
                updateCompetitionContent(competitionId);
            }
        },
        getCurrentSection: function() {
            return isOnWelcome ? 'welcome' : sections[currentSectionIndex];
        },
        getSelectedCompetition: function() {
            return selectedCompetition;
        }
    };

    console.log('COMET Guide script loaded and ready');
});