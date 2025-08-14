// COMET Matchday Operations Guide - Enhanced with Bilingual Support

document.addEventListener('DOMContentLoaded', function() {

  console.log('COMET Matchday Operations loaded');

  // Application state
  let currentLanguage = 'en';
  let selectedCompetition = 'national-adult';
  let completedSteps = new Set();

  // Competition data
  const competitions = {
    'national-adult': {
      name: { en: 'National Championships (Adult/Senior)', fr: 'Championnats nationaux (Adulte/Senior)' },
      playerMin: 15,
      playerMax: 21,
      officialsMin: 2,
      officialsMax: 5,
      color: '#E31E24'
    },
    'national-youth': {
      name: { en: 'National Championships (Youth U-17/U-15)', fr: 'Championnats nationaux (Jeunesse U-17/U-15)' },
      playerMin: 15,
      playerMax: 20,
      officialsMin: 2,
      officialsMax: 5,
      color: '#0066CC'
    },
    'pdp': {
      name: { en: 'PDP Championship', fr: 'Championnat PDJ' },
      playerMin: 16,
      playerMax: 20,
      officialsMin: 2,
      officialsMax: 6,
      color: '#00A651'
    },
    'masters': {
      name: { en: 'Masters Championship', fr: 'Championnat Masters' },
      playerMin: 15,
      playerMax: 21,
      officialsMin: 2,
      officialsMax: 5,
      color: '#FF6B35'
    },
    'futsal': {
      name: { en: 'Futsal Canadian Championship', fr: 'Championnat canadien de futsal' },
      playerMin: 10,
      playerMax: 14,
      officialsMin: 2,
      officialsMax: 4,
      color: '#9B59B6'
    }
  };

  // Language content (abbreviated here, keep your full data)
  const content = {
    en: {
      title: 'COMET Matchday Operations',
      subtitle: 'Tournament Lineup Management Guide',
      deadline: 'Submit 45 minutes before kickoff',
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
      'submission-warning-2': 'Must be submitted 45 minutes before kickoff',
      'save-confirmed': 'Save as CONFIRMED',
      // more content keys ...
    },
    fr: {
      // Include your French translations here in full
      title: 'Opérations COMET - Jour de match',
      subtitle: 'Guide de gestion des formations de tournoi',
      deadline: 'Soumettre 45 minutes avant le coup d\'envoi',
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
      'submission-warning-2': 'Doit être soumise 45 minutes avant le coup d\'envoi',
      'save-confirmed': 'Sauvegarder comme CONFIRMÉ',
      // more content keys ...
    }
  };

  // Updates the competition dropdown options based on language
  function updateCompetitionOptions() {
    const competitionSelect = document.getElementById('competition-select');
    if (!competitionSelect) return;
    const currentValue = competitionSelect.value || selectedCompetition;
    competitionSelect.innerHTML = '';
    Object.keys(competitions).forEach(key => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = competitions[key].name[currentLanguage] || key;
      competitionSelect.appendChild(option);
    });
    competitionSelect.value = currentValue;
    selectedCompetition = currentValue;
  }

  // Updates the displayed player and official limits for the selected competition
  function updateCompetitionLimits() {
    const competition = competitions[selectedCompetition];
    if (!competition) return;
    const playerLimits = document.getElementById('player-limits');
    const officialLimits = document.getElementById('official-limits');
    const refPlayerLimits = document.getElementById('ref-player-limits');
    const refOfficialLimits = document.getElementById('ref-official-limits');

    if (playerLimits) playerLimits.textContent = `${competition.playerMin}-${competition.playerMax}`;
    if (officialLimits) officialLimits.textContent = `${competition.officialsMin}-${competition.officialsMax}`;
    if (refPlayerLimits) refPlayerLimits.textContent = `${competition.playerMin}-${competition.playerMax}`;
    if (refOfficialLimits) refOfficialLimits.textContent = `${competition.officialsMin}-${competition.officialsMax}`;

    showCompetitionNotification();

    updateFutsalContent();
  }

  // Show a notification on competition change
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
    notification.textContent = competition.name[currentLanguage] || '';
    document.body.appendChild(notification);
    setTimeout(() => { notification.style.transform = 'translateX(0)'; }, 100);
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => { if (notification.parentNode) notification.parentNode.removeChild(notification); }, 300);
    }, 3000);
  }

  // Updates all text content based on current language selection
  function updateLanguageContent() {
    const langContent = content[currentLanguage];
    if (!langContent) return;

    document.querySelectorAll('[data-text-key]').forEach(element => {
      const key = element.getAttribute('data-text-key');
      if (langContent[key]) {
        element.style.opacity = '0.5';
        setTimeout(() => {
          element.textContent = langContent[key];
          element.style.opacity = '1';
        }, 100);
      }
    });

    // For instructions arrays or other complex content, update similarly if needed
    // (Assumed to be handled elsewhere or add your implementation)

    document.documentElement.lang = currentLanguage;

    updateCompetitionOptions();
  }

  // --- Your existing functions (initializeStepTracking, initializeChecklist, toggleStepCompletion, etc.) remain unchanged ---

  // This is the new function to update Futsal-specific texts dynamically
  function updateFutsalContent() {
    const isFutsal = (selectedCompetition === 'futsal');
    const roleSLText = document.getElementById('role-sl-text');
    const checklistText = document.getElementById('checklist-starters-text');

    if (roleSLText) {
      roleSLText.textContent = currentLanguage === 'fr'
        ? (isFutsal ? 'Formation de départ (5 joueurs sur terrain)' : 'Formation de départ (11 joueurs)')
        : (isFutsal ? 'Starting Lineup (5 players on court)' : 'Starting Lineup (11 players)');
    }

    if (checklistText) {
      checklistText.textContent = currentLanguage === 'fr'
        ? (isFutsal ? '5 joueurs sur terrain avec 1 gardien de but' : '11 joueurs titulaires avec 1 gardien de but')
        : (isFutsal ? '5 players on court with 1 goalkeeper' : '11 starting players with 1 goalkeeper');
    }
  }

  // Event binding
  function bindEvents() {
    const languageSelect = document.getElementById('language-select');
    const competitionSelect = document.getElementById('competition-select');

    if (languageSelect) {
      languageSelect.addEventListener('change', e => {
        const newLanguage = e.target.value;
        if (newLanguage === 'en' || newLanguage === 'fr') {
          currentLanguage = newLanguage;
          updateLanguageContent();
          updateCompetitionLimits();
        }
      });
    }

    if (competitionSelect) {
      competitionSelect.addEventListener('change', e => {
        selectedCompetition = e.target.value;
        updateCompetitionLimits();
      });
    }
  }

  // Initialization function
  function initialize() {
    bindEvents();
    updateLanguageContent();
    updateCompetitionOptions();
    updateCompetitionLimits();
    // Initialize other features (steps, checklist etc.) here as per your existing code
  }

  initialize();
  console.log('COMET Matchday Operations initialized successfully');

});
