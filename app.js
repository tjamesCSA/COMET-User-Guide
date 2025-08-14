// COMET Matchday Operations Guide - Enhanced with Bilingual Support

document.addEventListener('DOMContentLoaded', function() {
    console.log('COMET Matchday Operations loaded');
    
    // Application state
    let currentLanguage = 'en';
    let selectedCompetition = 'national-adult';
    let completedSteps = new Set();
    
    // Competition data from JSON
    const competitions = {
        'national-adult': {
            name: {
                en: 'National Championships (Adult/Senior)',
                fr: 'Championnats nationaux (Adulte/Sénior)'
            },
            playerMin: 15,
            playerMax: 21,
            officialsMin: 2,
            officialsMax: 5,
            color: '#E31E24'
        },
        'national-youth': {
            name: {
                en: 'National Championships (Youth U-17/U-15)',
                fr: 'Championnats nationaux (Jeunesse U-17/U-15)'
            },
            playerMin: 15,
            playerMax: 20,
            officialsMin: 2,
            officialsMax: 5,
            color: '#0066CC'
        },
        'pdp': {
            name: {
                en: 'PDP Championship',
                fr: 'Championnat PDJ'
            },
            playerMin: 16,
            playerMax: 20,
            officialsMin: 2,
            officialsMax: 6,
            color: '#00A651'
        },
        'masters': {
            name: {
                en: 'Masters Championship',
                fr: 'Championnat Masters'
            },
            playerMin: 15,
            playerMax: 21,
            officialsMin: 2,
            officialsMax: 5,
            color: '#FF6B35'
        },
        'futsal': {
            name: {
                en: 'Futsal Canadian Championship',
                fr: 'Championnat canadien de futsal'
            },
            playerMin: 10,
            playerMax: 14,
            officialsMin: 2,
            officialsMax: 4,
            color: '#9B59B6'
        }
    };
    
    // Language content
    const content = {
        en: {
            title: 'COMET Matchday Operations',
            subtitle: 'Tournament Lineup Management Guide',
            deadline: 'Submit 60 minutes before kickoff',
            playersLabel: 'Players',
            officialsLabel: 'Officials',
            'step-0-title': 'Accessing Your Match',
            'step-0-description': 'Find and open your tournament fixture in COMET',
            'step-1-title': 'Loading Available Players',
            'step-1-description': 'Access your registered player pool for the competition',
            'step-2-title': 'Creating Your Start List',
            'step-2-description': 'Select starting players and assign roles',
            'step-3-title': 'Adding Team Officials to Bench',
            'step-3-description': 'Select coaching staff and officials for the match',
            'step-4-title': 'Final Submission',
            'step-4-description': 'Review and submit your final lineup',
            'step-5-title': 'Post-Match Activities',
            'step-5-description': 'Follow-up tasks after the match',
            'role-sl': 'Starting Lineup (11 players)',
            'role-gk': 'Goalkeeper (minimum 1 required)',
            'role-cp': 'Captain (1 required)',
            'role-l': 'Lineup but not starting (substitutes)',
            'officials-warning': 'Officials in RED have active suspensions and cannot be selected',
            'checklist-starters': '11 starting players with 1 goalkeeper',
            'checklist-captain': '1 designated captain',
            'checklist-officials': 'Appropriate number of officials on bench',
            'submission-warning-1': 'Once confirmed, lineup cannot be changed',
            'submission-warning-2': 'Must be submitted 60 minutes before kickoff',
            'save-confirmed': 'Save as CONFIRMED',
            'troubleshooting-title': 'Common Issues & Solutions',
            'problem-1': 'Player appears in RED and cannot be selected',
            'solution-1': 'Player has an active suspension and is ineligible for this match',
            'problem-2': 'Cannot find \'Load Available Players\' button',
            'solution-2': 'Ensure you are on your club\'s match page and have proper permissions',
            'problem-3': 'Lineup submission shows error',
            'solution-3': 'Check that you have exactly 11 starters, 1 goalkeeper, and 1 captain designated',
            'quick-reference-title': 'Quick Reference',
            'key-deadlines-title': 'Key Deadlines',
            'deadline-1': '60 minutes before kickoff: Final lineup submission deadline',
            'deadline-2': '60-90 minutes before: Recommended arrival time at venue',
            'competition-limits-title': 'Competition Limits',
            'players-colon': 'Players:',
            'officials-colon': 'Officials:',
            stepInstructions: [
                [
                    'Log into COMET at comet.canadasoccer.com',
                    'Navigate to \'Clubs\' tab',
                    'Click \'My Next Matches\'',
                    'Find your match and click your club tab at the top'
                ],
                [
                    'Click \'Load Available Players\' button',
                    'Review your player pool on the left side',
                    'Check for any players marked in RED (suspended)',
                    'Verify you have minimum players available'
                ],
                [
                    'Select players and assign roles using the codes above',
                    'Click the arrow (→) to move players to Start List',
                    'Use checkboxes and trash icons to move players back if needed'
                ],
                [
                    'Press \'Edit\' button above Club Officials section',
                    'Use dropdown menus to select officials for each position',
                    'Ensure you meet minimum requirements'
                ],
                [],
                [
                    'Match Summary Report will be emailed to club contacts',
                    'Access match reports through COMET if needed',
                    'Any disciplinary reports will be sent via email',
                    'Follow email links to access cases in COMET',
                    'Prepare for next match if applicable'
                ]
            ]
        },
        fr: {
            title: 'Opérations COMET - Jour de match',
            subtitle: 'Guide de gestion des formations de tournoi',
            deadline: 'Soumettre 60 minutes avant le coup d\'envoi',
            playersLabel: 'Joueurs',
            officialsLabel: 'Officiels',
            'step-0-title': 'Accéder à votre match',
            'step-0-description': 'Trouver et ouvrir votre match de tournoi dans COMET',
            'step-1-title': 'Charger les joueurs disponibles',
            'step-1-description': 'Accéder à votre bassin de joueurs inscrits pour la compétition',
            'step-2-title': 'Créer votre liste de départ',
            'step-2-description': 'Sélectionner les joueurs titulaires et attribuer les rôles',
            'step-3-title': 'Ajouter les officiels d\'équipe au banc',
            'step-3-description': 'Sélectionner le personnel d\'entraînement et les officiels pour le match',
            'step-4-title': 'Soumission finale',
            'step-4-description': 'Examiner et soumettre votre formation finale',
            'step-5-title': 'Activités post-match',
            'step-5-description': 'Tâches de suivi après le match',
            'role-sl': 'Formation de départ (11 joueurs)',
            'role-gk': 'Gardien de but (minimum 1 requis)',
            'role-cp': 'Capitaine (1 requis)',
            'role-l': 'Formation mais pas titulaire (remplaçants)',
            'officials-warning': 'Les officiels en ROUGE ont des suspensions actives et ne peuvent pas être sélectionnés',
            'checklist-starters': '11 joueurs titulaires avec 1 gardien de but',
            'checklist-captain': '1 capitaine désigné',
            'checklist-officials': 'Nombre approprié d\'officiels sur le banc',
            'submission-warning-1': 'Une fois confirmée, la formation ne peut pas être modifiée',
            'submission-warning-2': 'Doit être soumise 60 minutes avant le coup d\'envoi',
            'save-confirmed': 'Sauvegarder comme CONFIRMÉ',
            'troubleshooting-title': 'Problèmes courants et solutions',
            'problem-1': 'Le joueur apparaît en ROUGE et ne peut pas être sélectionné',
            'solution-1': 'Le joueur a une suspension active et est inadmissible pour ce match',
            'problem-2': 'Impossible de trouver le bouton \'Charger les joueurs disponibles\'',
            'solution-2': 'Assurez-vous d\'être sur la page de match de votre club et d\'avoir les permissions appropriées',
            'problem-3': 'La soumission de formation affiche une erreur',
            'solution-3': 'Vérifiez que vous avez exactement 11 titulaires, 1 gardien de but et 1 capitaine désigné',
            'quick-reference-title': 'Référence rapide',
            'key-deadlines-title': 'Échéances importantes',
            'deadline-1': '60 minutes avant le coup d\'envoi : Date limite de soumission de la formation finale',
            'deadline-2': '60-90 minutes avant : Heure d\'arrivée recommandée au lieu',
            'competition-limits-title': 'Limites de compétition',
            'players-colon': 'Joueurs :',
            'officials-colon': 'Officiels :',
            stepInstructions: [
                [
                    'Connectez-vous à COMET sur comet.canadasoccer.com',
                    'Naviguez vers l\'onglet \'Clubs\'',
                    'Cliquez sur \'Mes prochains matchs\'',
                    'Trouvez votre match et cliquez sur l\'onglet de votre club en haut'
                ],
                [
                    'Cliquez sur le bouton \'Charger les joueurs disponibles\'',
                    'Examinez votre bassin de joueurs sur le côté gauche',
                    'Vérifiez les joueurs marqués en ROUGE (suspendus)',
                    'Vérifiez que vous avez le minimum de joueurs disponibles'
                ],
                [
                    'Sélectionnez les joueurs et attribuez les rôles avec les codes ci-dessus',
                    'Cliquez sur la flèche (→) pour déplacer les joueurs vers la liste de départ',
                    'Utilisez les cases à cocher et les icônes de corbeille pour redéplacer les joueurs au besoin'
                ],
                [
                    'Appuyez sur le bouton \'Modifier\' au-dessus de la section Officiels du club',
                    'Utilisez les menus déroulants pour sélectionner les officiels pour chaque poste',
                    'Assurez-vous de respecter les exigences minimales'
                ],
                [],
                [
                    'Le rapport de résumé du match sera envoyé par courriel aux contacts du club',
                    'Accédez aux rapports de match via COMET si nécessaire',
                    'Tout rapport disciplinaire sera envoyé par courriel',
                    'Suivez les liens de courriel pour accéder aux cas dans COMET',
                    'Préparez-vous pour le prochain match si applicable'
                ]
            ]
        }
    };

    // Update competition-specific text content
    function updateCompetitionSpecificContent() {
        const competition = competitions[selectedCompetition];
        if (!competition) return;
        
        const isFutsal = selectedCompetition === 'futsal';
        const langContent = content[currentLanguage];
        
        // Update starting lineup text
        const startingLineupText = isFutsal ? 
            (currentLanguage === 'en' ? 'Starting Lineup (5 players on court)' : 'Formation de départ (5 joueurs sur le terrain)') :
            (currentLanguage === 'en' ? 'Starting Lineup (11 players)' : 'Formation de départ (11 joueurs)');
        
        const roleSlElement = document.querySelector('[data-text-key="role-sl"]');
        if (roleSlElement) {
            roleSlElement.textContent = startingLineupText;
        }
        
        // Update checklist text
        const checklistText = isFutsal ?
            (currentLanguage === 'en' ? '5 players on court with 1 goalkeeper' : '5 joueurs sur le terrain avec 1 gardien de but') :
            (currentLanguage === 'en' ? '11 starting players with 1 goalkeeper' : '11 joueurs titulaires avec 1 gardien de but');
        
        const checklistElement = document.querySelector('[data-text-key="checklist-starters"]');
        if (checklistElement) {
            checklistElement.textContent = checklistText;
        }
        
        // Update error message text
        const errorText = isFutsal ?
            (currentLanguage === 'en' ? 'Check that you have exactly 5 players on court, 1 goalkeeper, and 1 captain designated' : 'Vérifiez que vous avez exactement 5 joueurs sur le terrain, 1 gardien de but et 1 capitaine désigné') :
            (currentLanguage === 'en' ? 'Check that you have exactly 11 starters, 1 goalkeeper, and 1 captain designated' : 'Vérifiez que vous avez exactement 11 titulaires, 1 gardien de but et 1 capitaine désigné');
        
        const errorElement = document.querySelector('[data-text-key="solution-3"]');
        if (errorElement) {
            errorElement.textContent = errorText;
        }
    }

    // Update competition dropdown options
    function updateCompetitionOptions() {
        const competitionSelect = document.getElementById('competition-select');
        if (!competitionSelect) return;
        
        // Store current selection
        const currentValue = competitionSelect.value || selectedCompetition;
        
        // Clear and rebuild options
        competitionSelect.innerHTML = '';
        Object.keys(competitions).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = competitions[key].name[currentLanguage];
            competitionSelect.appendChild(option);
        });
        
        // Restore selection
        competitionSelect.value = currentValue;
        selectedCompetition = currentValue;
    }

    // Update competition-specific limits
    function updateCompetitionLimits() {
        const competition = competitions[selectedCompetition];
        if (!competition) return;
        
        // Update hero section limits
        const playerLimits = document.getElementById('player-limits');
        const officialLimits = document.getElementById('official-limits');
        
        if (playerLimits) {
            playerLimits.textContent = `${competition.playerMin}-${competition.playerMax}`;
        }
        if (officialLimits) {
            officialLimits.textContent = `${competition.officialsMin}-${competition.officialsMax}`;
        }
        
        // Update reference section limits
        const refPlayerLimits = document.getElementById('ref-player-limits');
        const refOfficialLimits = document.getElementById('ref-official-limits');
        if (refPlayerLimits) {
            refPlayerLimits.textContent = `${competition.playerMin}-${competition.playerMax}`;
        }
        if (refOfficialLimits) {
            refOfficialLimits.textContent = `${competition.officialsMin}-${competition.officialsMax}`;
        }
        
        // Update competition-specific content
        updateCompetitionSpecificContent();
        
        // Show competition change notification
        showCompetitionNotification();
    }

    // Show competition change notification
    function showCompetitionNotification() {
        const competition = competitions[selectedCompetition];
        if (!competition) return;
        
        const notification = document.createElement('div');
        notification.style.cssText = `
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
        notification.textContent = competition.name[currentLanguage];
        
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Update all text content for language change
    function updateLanguageContent() {
        console.log('Updating language content to:', currentLanguage);
        const langContent = content[currentLanguage];
        if (!langContent) {
            console.error('Language content not found for:', currentLanguage);
            return;
        }

        // Update all elements with data-text-key
        document.querySelectorAll('[data-text-key]').forEach(element => {
            const key = element.getAttribute('data-text-key');
            if (langContent[key]) {
                // Add fade effect
                element.style.opacity = '0.5';
                setTimeout(() => {
                    element.textContent = langContent[key];
                    element.style.opacity = '1';
                }, 100);
            }
        });

        // Update step instructions with fade effect
        langContent.stepInstructions.forEach((instructions, index) => {
            const instructionList = document.getElementById(`step-${index}-instructions`);
            if (instructionList && instructions.length > 0) {
                instructionList.style.opacity = '0.5';
                setTimeout(() => {
                    instructionList.innerHTML = '';
                    instructions.forEach(instruction => {
                        const li = document.createElement('li');
                        li.textContent = instruction;
                        instructionList.appendChild(li);
                    });
                    instructionList.style.opacity = '1';
                }, 100);
            }
        });

        // Update document language attribute
        document.documentElement.lang = currentLanguage;
        
        // Update competition options after language change
        updateCompetitionOptions();
        
        // Update competition-specific content for new language
        updateCompetitionSpecificContent();
        
        console.log('Language content updated successfully');
    }

    // Update progress bar
    function updateProgress() {
        const totalSteps = 6;
        const progress = (completedSteps.size / totalSteps) * 100;
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
    }

    // Toggle step completion
    function toggleStepCompletion(stepIndex) {
        const stepCard = document.querySelector(`[data-step="${stepIndex}"]`);
        const checkbox = document.getElementById(`step-${stepIndex}-check`);
        if (!stepCard || !checkbox) return;
        
        if (checkbox.checked) {
            completedSteps.add(stepIndex);
            stepCard.classList.add('completed');
        } else {
            completedSteps.delete(stepIndex);
            stepCard.classList.remove('completed');
        }
        
        updateProgress();
        
        // Animate completion
        if (checkbox.checked) {
            stepCard.style.transform = 'scale(1.02)';
            setTimeout(() => {
                stepCard.style.transform = '';
            }, 200);
        }
    }

    // Initialize step completion tracking
    function initializeStepTracking() {
        for (let i = 0; i < 6; i++) {
            const checkbox = document.getElementById(`step-${i}-check`);
            if (checkbox) {
                checkbox.addEventListener('change', function() {
                    toggleStepCompletion(i);
                });
            }
        }
    }

    // Initialize checklist functionality
    function initializeChecklist() {
        const checklistItems = document.querySelectorAll('.checklist-checkbox');
        const submissionBtn = document.querySelector('.submission-btn');
        
        function updateSubmissionButton() {
            const allChecked = Array.from(checklistItems).every(item => item.checked);
            if (submissionBtn) {
                if (allChecked) {
                    submissionBtn.style.background = '#00A651';
                    submissionBtn.style.cursor = 'pointer';
                    submissionBtn.disabled = false;
                } else {
                    submissionBtn.style.background = '';
                    submissionBtn.style.cursor = 'not-allowed';
                    submissionBtn.disabled = true;
                }
            }
        }

        checklistItems.forEach(checkbox => {
            checkbox.addEventListener('change', updateSubmissionButton);
        });

        // Initial state
        updateSubmissionButton();

        // Submission button click
        if (submissionBtn) {
            submissionBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const allChecked = Array.from(checklistItems).every(item => item.checked);
                if (allChecked) {
                    showSubmissionConfirmation();
                }
            });
        }
    }

    // Show submission confirmation
    function showSubmissionConfirmation() {
        const confirmation = document.createElement('div');
        confirmation.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--color-success);
            color: white;
            padding: 24px 32px;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.2);
            z-index: 1001;
            text-align: center;
            font-size: 18px;
            font-weight: 600;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const text = currentLanguage === 'en' ?
            '✓ Lineup Successfully Submitted!' :
            '✓ Formation soumise avec succès !';
            
        confirmation.textContent = text;
        document.body.appendChild(confirmation);
        
        setTimeout(() => {
            confirmation.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            confirmation.style.opacity = '0';
            setTimeout(() => {
                if (confirmation.parentNode) {
                    confirmation.parentNode.removeChild(confirmation);
                }
            }, 300);
        }, 3000);
        
        // Mark final step as complete
        const finalCheckbox = document.getElementById('step-4-check');
        if (finalCheckbox && !finalCheckbox.checked) {
            finalCheckbox.checked = true;
            toggleStepCompletion(4);
        }
    }

    // Event listeners
    function bindEvents() {
        console.log('Binding events...');
        
        // Language selector
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            console.log('Language selector found, binding event...');
            languageSelect.addEventListener('change', function(e) {
                const newLanguage = e.target.value;
                console.log('Language changed from', currentLanguage, 'to', newLanguage);
                if (newLanguage !== currentLanguage && (newLanguage === 'en' || newLanguage === 'fr')) {
                    currentLanguage = newLanguage;
                    updateLanguageContent();
                    updateCompetitionLimits();
                } else {
                    console.log('Language change ignored - same language or invalid');
                }
            });
        } else {
            console.error('Language selector not found!');
        }

        // Competition selector
        const competitionSelect = document.getElementById('competition-select');
        if (competitionSelect) {
            console.log('Competition selector found, binding event...');
            competitionSelect.addEventListener('change', function(e) {
                const newCompetition = e.target.value;
                console.log('Competition changed to:', newCompetition);
                selectedCompetition = newCompetition;
                updateCompetitionLimits();
            });
        } else {
            console.error('Competition selector not found!');
        }

        // Title click to refresh
        const title = document.querySelector('.comet-title');
        if (title) {
            title.addEventListener('click', function() {
                location.reload();
            });
        }

        // Smooth scrolling for step completion
        document.addEventListener('change', function(e) {
            if (e.target.classList.contains('step-check')) {
                const stepCard = e.target.closest('.step-card');
                if (stepCard && e.target.checked) {
                    setTimeout(() => {
                        const nextStepCard = stepCard.nextElementSibling;
                        if (nextStepCard) {
                            nextStepCard.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        }
                    }, 500);
                }
            }
        });
        
        console.log('Events bound successfully');
    }

    // Add keyboard navigation
    function initializeKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            // Don't interfere with form inputs
            if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') {
                return;
            }

            switch(e.key) {
                case 'l':
                case 'L':
                    // Toggle language with 'L' key
                    e.preventDefault();
                    const languageSelect = document.getElementById('language-select');
                    if (languageSelect) {
                        const newValue = currentLanguage === 'en' ? 'fr' : 'en';
                        languageSelect.value = newValue;
                        languageSelect.dispatchEvent(new Event('change'));
                    }
                    break;
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                    // Jump to step with number keys
                    e.preventDefault();
                    const stepIndex = parseInt(e.key) - 1;
                    const stepCard = document.querySelector(`[data-step="${stepIndex}"]`);
                    if (stepCard) {
                        stepCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                    break;
            }
        });
    }

    // Add intersection observer for step animations
    function initializeAnimations() {
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
            }, { threshold: 0.1, rootMargin: '50px' });

            document.querySelectorAll('.step-card').forEach(function(card) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.6s ease-out';
                observer.observe(card);
            });
        }
    }

    // Initialize everything
    function initialize() {
        console.log('Initializing COMET Matchday Operations');
        
        // Initialize in correct order
        bindEvents();
        initializeStepTracking();
        initializeChecklist();
        initializeKeyboardNavigation();
        
        // Set initial values
        updateLanguageContent();
        updateCompetitionOptions();
        updateCompetitionLimits();
        updateCompetitionSpecificContent();
        updateProgress();
        
        // Initialize animations after slight delay
        setTimeout(initializeAnimations, 200);
        
        console.log('COMET Matchday Operations initialized successfully');
    }

    // Public API for debugging and external control
    window.cometMatchday = {
        setLanguage: function(lang) {
            console.log('API: Setting language to', lang);
            if (lang === 'en' || lang === 'fr') {
                currentLanguage = lang;
                const languageSelect = document.getElementById('language-select');
                if (languageSelect) {
                    languageSelect.value = lang;
                }
                updateLanguageContent();
                updateCompetitionOptions();
                updateCompetitionSpecificContent();
            }
        },
        setCompetition: function(comp) {
            console.log('API: Setting competition to', comp);
            if (competitions[comp]) {
                selectedCompetition = comp;
                const competitionSelect = document.getElementById('competition-select');
                if (competitionSelect) {
                    competitionSelect.value = comp;
                }
                updateCompetitionLimits();
                updateCompetitionSpecificContent();
            }
        },
        getState: function() {
            return {
                language: currentLanguage,
                competition: selectedCompetition,
                completedSteps: Array.from(completedSteps),
                progress: (completedSteps.size / 6) * 100
            };
        },
        markStepComplete: function(stepIndex) {
            const checkbox = document.getElementById(`step-${stepIndex}-check`);
            if (checkbox) {
                checkbox.checked = true;
                toggleStepCompletion(stepIndex);
            }
        },
        // Debug function to test language switching
        testLanguageSwitch: function() {
            console.log('Testing language switch...');
            const languageSelect = document.getElementById('language-select');
            if (languageSelect) {
                languageSelect.value = currentLanguage === 'en' ? 'fr' : 'en';
                languageSelect.dispatchEvent(new Event('change'));
            }
        }
    };

    // Initialize the application
    initialize();
    console.log('COMET Matchday Operations script loaded and ready');
});