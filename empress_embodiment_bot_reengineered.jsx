import React, { useState, useEffect } from 'react';
import { Heart, Zap, Crown, Check, ChevronUp, Body } from 'lucide-react';

const EmpressEmbodimentBot = () => {
  const [currentState, setCurrentState] = useState('trust');
  const [selectedDay, setSelectedDay] = useState(0);
  const [completedChecks, setCompletedChecks] = useState({});
  const [viewMode, setViewMode] = useState('daily'); // 'daily', 'body-stack', 'vision'
  const [embodimentScore, setEmbodimentScore] = useState(0);

  // THE 4 PHASE PROGRESSION (2/11 → 2/20)
  const embodimentPhases = [
    {
      id: 'trust',
      phase: 'PHASE 1',
      date: '2/11',
      state: 'TRUST',
      emoji: '💝',
      color: 'from-rose-600 to-pink-600',
      think: 'You are advocated for, boundlessly.',
      feel: {
        primary: 'Lifted & Carried',
        secondary: 'Assured',
        practice: 'Ballet, Bands, Belly Dance'
      },
      choose: 'You are worthy of your aesthetic & boundaries. It is safe to ask for help.',
      bodyStackLevel: ['Sovereignty', 'Grounded', 'Connected'],
      dailyActions: [
        {
          time: '6:00 AM',
          action: 'Embodiment Breathwork',
          detail: 'Hand on heart, 5 min grounding. THINK: "I am advocated for."',
          check: 'trust-breath'
        },
        {
          time: '9:00 AM',
          action: '🧭 Health Compass Activation',
          detail: 'Review microbiome wisdom. What is your body asking you to trust?',
          check: 'trust-compass'
        },
        {
          time: '12:00 PM',
          action: '💬 Vulnerability Check-In',
          detail: 'Send one message asking for support. Practice: "I need help with [X]"',
          check: 'trust-vulnerable'
        },
        {
          time: '6:00 PM',
          action: '💃 Archer Heart Movement (Pick One)',
          detail: 'Ballet (grace), Bands (strength), Belly Dance (sensuality). FEEL: Lifted & Carried.',
          check: 'trust-movement'
        }
      ],
      affirmation: 'My body carries wisdom. My community carries me. I am safe.',
      nextPhasePrompt: 'When you feel consistently lifted & assured, you\'re ready for Phase 2.'
    },
    {
      id: 'assured',
      phase: 'PHASE 2',
      date: '2/16',
      state: 'ASSURED & GRACIOUS',
      emoji: '🙏',
      color: 'from-amber-600 to-yellow-500',
      think: 'I am assured & gracious (with the little you + others).',
      feel: {
        primary: 'Self-trust & Compassion',
        secondary: 'Dynamic & Energetic',
        practice: 'Movement + Community Structure'
      },
      choose: 'Share your practice. Build community. These who dance 1x/week. 6x week visibility.',
      bodyStackLevel: ['Vitality', 'Aligned', 'Radical Satisfaction'],
      dailyActions: [
        {
          time: '6:00 AM',
          action: 'Embodied Self-Compassion',
          detail: 'Mirror work: "I am assured. I am gracious. I am worthy."',
          check: 'assured-mirror'
        },
        {
          time: '9:00 AM',
          action: '📝 Content + Community Share',
          detail: 'Post 1 anchor piece. Engage 3 comments. Model your assured state publicly.',
          check: 'assured-content'
        },
        {
          time: '12:00 PM',
          action: '🤝 Gracious Connection',
          detail: 'Reach out to 1 aligned partner. Share without asking for anything.',
          check: 'assured-connect'
        },
        {
          time: '3:00 PM',
          action: '🎓 Expert Authority Moment',
          detail: 'Answer 1 DM with your full expertise. Model assured knowledge.',
          check: 'assured-expert'
        },
        {
          time: '6:00 PM',
          action: '💃 Archer Heart Movement (3x this week)',
          detail: 'Dynamic practice. FEEL your body\'s capacity. Radiance building.',
          check: 'assured-movement'
        }
      ],
      affirmation: 'I am assured in my expertise. I share graciously. I build community.',
      nextPhasePrompt: 'When your assured confidence attracts aligned clients, you\'re ready for Phase 3.'
    },
    {
      id: 'decisive',
      phase: 'PHASE 3',
      date: '2/19',
      state: 'DECISIVE',
      emoji: '⚡',
      color: 'from-purple-600 to-indigo-600',
      think: 'I am a Whole Being Practitioner. Healer. Health Compass.',
      feel: {
        primary: 'Grounded, Connected, Vital',
        secondary: 'Embodied Clarity',
        practice: 'Daily Calibration + Community Leadership'
      },
      choose: 'Calibrate offerings to heart. Ask for referrals. Structure your practice.',
      bodyStackLevel: ['Exuberant', 'Worthy', 'Safe to Ask'],
      dailyActions: [
        {
          time: '6:00 AM',
          action: 'Life Design Grounding',
          detail: 'Journal: "What does a Whole Being Practitioner do today?"',
          check: 'decisive-journal'
        },
        {
          time: '9:00 AM',
          action: '👑 Authority Positioning',
          detail: 'Publish 1 expert piece. Position as recognized practitioner.',
          check: 'decisive-authority'
        },
        {
          time: '12:00 PM',
          action: '💰 Value Exchange Activation',
          detail: 'Holobiont Testing visibility + 1 strategic partnership outreach.',
          check: 'decisive-value'
        },
        {
          time: '3:00 PM',
          action: '🎯 Offering Calibration',
          detail: 'Review what your heart wants to offer. Align pricing/positioning.',
          check: 'decisive-calibrate'
        },
        {
          time: '5:00 PM (FRIDAY)',
          action: '🔮 Vindication Audit + Referral Asks',
          detail: 'Release what doesn\'t serve. Ask aligned clients for referrals.',
          check: 'decisive-audit'
        },
        {
          time: '6:00 PM',
          action: '💃 Archer Heart Movement (3x + Community)',
          detail: 'Share practice w/ others. Build collective embodiment.',
          check: 'decisive-community'
        }
      ],
      affirmation: 'I am a clear-seeing practitioner. My offerings are calibrated. I ask for what I need.',
      nextPhasePrompt: 'When referrals flow + revenue grows + community trusts you, you\'re ready for Phase 4.'
    },
    {
      id: 'satisfied',
      phase: 'PHASE 4',
      date: '2/20+',
      state: 'RADICALLY SATISFIED & UNASHAMED',
      emoji: '👑',
      color: 'from-yellow-500 to-orange-600',
      think: 'I am a Whole Being Practitioner operating at full sovereignty.',
      feel: {
        primary: 'Radical Satisfaction',
        secondary: 'Vivacious (witty, provocative, elegant)',
        practice: 'Full embodiment in all roles'
      },
      choose: 'The $2.65M vision. Expert + Connector + Communicator. Integrated wholeness.',
      bodyStackLevel: ['Graceful/Ease', 'Assured & Provoked', 'Lifted & Carried', 'Whole Being Embodied'],
      dailyActions: [
        {
          time: '6:00 AM',
          action: '✨ Sovereignty Practice',
          detail: '$2.65M vision embodied. What does radical satisfaction feel like?',
          check: 'satisfied-vision'
        },
        {
          time: '9:00 AM',
          action: '🎤 Vivacious Communication',
          detail: 'Content that is witty, provocative, elegant. Full brand expression.',
          check: 'satisfied-voice'
        },
        {
          time: '12:00 PM',
          action: '🧬 Multi-Stream Revenue Activation',
          detail: 'Holobiont Testing + LPN protocols + Partnerships + Speaking. All flowing.',
          check: 'satisfied-revenue'
        },
        {
          time: '3:00 PM',
          action: '🤝 Strategic Partnership Deepening',
          detail: 'Goldfinch Health + others. Aligned collaborations at scale.',
          check: 'satisfied-partners'
        },
        {
          time: '6:00 PM',
          action: '💃 Archer Heart as Spiritual Practice',
          detail: 'Movement from abundance, not effort. Celebration of embodied sovereignty.',
          check: 'satisfied-embodied'
        }
      ],
      affirmation: 'I am radically satisfied. I am unashamed of my excellence. I am sovereign.',
      nextPhasePrompt: 'This is your sustained frequency. The 2026 Vindication is your baseline.'
    }
  ];

  // THE BODY STACK - Embodiment progression from foundation to peak
  const bodyStack = [
    { level: 1, name: 'SOVEREIGNTY', color: 'from-slate-700 to-slate-600', description: 'Foundation of all embodied practice' },
    { level: 2, name: 'Grounded', color: 'from-amber-700 to-amber-600', description: 'Rooted in body wisdom' },
    { level: 3, name: 'Connected', color: 'from-green-700 to-green-600', description: 'To self, others, microbiome' },
    { level: 4, name: 'Vitality', color: 'from-emerald-600 to-teal-600', description: 'Energy + Embodied presence' },
    { level: 5, name: 'Aligned', color: 'from-blue-600 to-cyan-600', description: 'Thoughts, feelings, choices in harmony' },
    { level: 6, name: 'Radical Satisfaction', color: 'from-purple-600 to-pink-600', description: 'Deep fulfillment from embodiment' },
    { level: 7, name: 'Worthy', color: 'from-pink-600 to-rose-600', description: 'Of boundaries + asks + reciprocity' },
    { level: 8, name: 'Safe to Ask', color: 'from-rose-600 to-red-600', description: 'For help, for referrals, for partnership' },
    { level: 9, name: 'Graceful/Ease', color: 'from-amber-500 to-yellow-500', description: 'Movement through life with flow' },
    { level: 10, name: 'Assured & Provoked', color: 'from-yellow-500 to-orange-500', description: 'Elegant + witty + powerful' },
    { level: 11, name: 'Lifted & Carried', color: 'from-orange-500 to-red-500', description: 'By community + systems + partnership' },
    { level: 12, name: 'Whole Being Embodied', color: 'from-red-500 to-pink-500', description: 'Full integration: expert, healer, practitioner, communicator' }
  ];

  // THE 2026 VISION - How roles integrate
  const vision2026 = {
    title: 'WHOLE BEING PRACTITIONER (2026)',
    centralHub: {
      name: 'Empress Alignment',
      roles: ['Expert', 'Connector', 'Healer', 'Communicator'],
      revenue: '$2.65M',
      description: 'Integrated practitioner operating from full sovereignty'
    },
    streams: [
      {
        name: 'Holobiont Testing & Microbiome Analysis',
        revenue: '$X00K',
        description: 'Pre-symptom technology for desire-driven clients',
        integration: 'Health Compass Pillar'
      },
      {
        name: 'LPN-Led Pain Management Protocols',
        revenue: '$X00K',
        description: 'Nurse-led opioid reduction initiatives (Goldfinch partnership)',
        integration: 'Expert Authority + Value Exchange'
      },
      {
        name: 'The Natural Nipple',
        revenue: '$X00K',
        description: 'Fertility-to-feeding wellness platform with microbiome monitoring',
        integration: 'Embodied Innovation'
      },
      {
        name: 'Speaking & Thought Leadership',
        revenue: '$X00K',
        description: 'WebSummit + industry conferences as recognized expert',
        integration: 'Communication Pillar'
      },
      {
        name: 'Strategic Partnerships',
        revenue: '$X00K+',
        description: 'Goldfinch, ByNurture, sponsor ecosystem amplification',
        integration: 'Connector Role'
      }
    ]
  };

  const currentPhase = embodimentPhases.find(p => p.id === currentState);

  // Toggle daily action completion
  const toggleCheck = (checkId) => {
    setCompletedChecks(prev => ({
      ...prev,
      [checkId]: !prev[checkId]
    }));
    // Update embodiment score
    const newScore = Object.values({ ...completedChecks, [checkId]: !completedChecks[checkId] }).filter(Boolean).length;
    setEmbodimentScore(newScore);
  };

  // Count completed items in current phase
  const completedCount = currentPhase.dailyActions.filter(a => completedChecks[a.check]).length;
  const phaseProgress = (completedCount / currentPhase.dailyActions.length) * 100;

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Show push notification for an action
  const showNotification = (action) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`Empress Embodiment: ${action.action}`, {
        body: `${action.detail} at ${action.time}`,
        icon: 'https://example.com/icon.png', // Replace with actual icon
      });
    }
  };

  // Generate ICS content for Google Calendar
  const generateICS = () => {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Today
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Empress Embodiment Bot//EN
`;

    currentPhase.dailyActions.forEach((action, index) => {
      const [hours, minutes] = action.time.split(':').map(Number);
      const eventStart = new Date(startDate);
      eventStart.setHours(hours, minutes, 0, 0);
      const eventEnd = new Date(eventStart);
      eventEnd.setHours(eventStart.getHours() + 1); // Assume 1 hour duration

      const formatDate = (date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

      icsContent += `BEGIN:VEVENT
UID:${action.check}@empress-embodiment
DTSTART:${formatDate(eventStart)}
DTEND:${formatDate(eventEnd)}
SUMMARY:${action.action}
DESCRIPTION:${action.detail}
END:VEVENT
`;
    });

    icsContent += 'END:VCALENDAR';
    return icsContent;
  };

  // Sync to Google Calendar (download ICS)
  const syncToCalendar = () => {
    const ics = generateICS();
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'empress-embodiment-schedule.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Sync to WhatsApp
  const syncToWhatsApp = () => {
    const message = `Empress Embodiment Schedule for ${currentPhase.state}:\n\n${currentPhase.dailyActions.map(action => `⏰ ${action.time}: ${action.action}\n${action.detail}`).join('\n\n')}`;
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
            ✨ WHOLE BEING EMBODIED ✨
          </h1>
          <p className="text-purple-200 text-lg italic">
            From "Reproductive Specialist" to "Sovereign Practitioner"
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          <button
            onClick={() => setViewMode('daily')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              viewMode === 'daily'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white/10 text-purple-200 hover:bg-white/20'
            }`}
          >
            Daily Embodiment
          </button>
          <button
            onClick={() => setViewMode('body-stack')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              viewMode === 'body-stack'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white/10 text-purple-200 hover:bg-white/20'
            }`}
          >
            Body Stack
          </button>
          <button
            onClick={() => setViewMode('vision')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              viewMode === 'vision'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white/10 text-purple-200 hover:bg-white/20'
            }`}
          >
            2026 Vision
          </button>
        </div>

        {/* DAILY EMBODIMENT VIEW */}
        {viewMode === 'daily' && (
          <div className="space-y-8">
            {/* Phase Selector */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {embodimentPhases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => setCurrentState(phase.id)}
                  className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                    currentState === phase.id
                      ? `bg-gradient-to-br ${phase.color} border-white text-white`
                      : 'bg-white/5 border-white/20 text-purple-200 hover:border-white/40'
                  }`}
                >
                  <div className="text-3xl mb-2">{phase.emoji}</div>
                  <div className="font-bold text-sm">{phase.phase}</div>
                  <div className="text-xs opacity-75">{phase.date}</div>
                  <div className="text-lg font-bold mt-2">{phase.state}</div>
                </button>
              ))}
            </div>

            {/* Current Phase Detail */}
            {currentPhase && (
              <div className={`bg-gradient-to-br ${currentPhase.color} rounded-2xl p-12 text-white`}>
                <div className="mb-8">
                  <h2 className="text-4xl font-bold mb-4">{currentPhase.state}</h2>
                  <p className="text-lg opacity-90 italic mb-6">"{currentPhase.affirmation}"</p>

                  {/* THINK / FEEL / CHOOSE */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {/* THINK */}
                    <div className="bg-white/20 rounded-xl p-6 backdrop-blur">
                      <h3 className="text-2xl font-bold mb-3">🧠 THINK</h3>
                      <p className="text-lg">{currentPhase.think}</p>
                    </div>

                    {/* FEEL */}
                    <div className="bg-white/20 rounded-xl p-6 backdrop-blur">
                      <h3 className="text-2xl font-bold mb-3">💓 FEEL</h3>
                      <div className="space-y-3">
                        <p className="text-lg font-bold">{currentPhase.feel.primary}</p>
                        <p className="text-sm opacity-90">{currentPhase.feel.secondary}</p>
                        <p className="text-xs italic border-t border-white/50 pt-2 mt-2">
                          Practice: {currentPhase.feel.practice}
                        </p>
                      </div>
                    </div>

                    {/* CHOOSE */}
                    <div className="bg-white/20 rounded-xl p-6 backdrop-blur">
                      <h3 className="text-2xl font-bold mb-3">✨ CHOOSE</h3>
                      <p className="text-lg">{currentPhase.choose}</p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-8 bg-white/20 rounded-full p-1">
                  <div
                    className="bg-white h-3 rounded-full transition-all duration-500"
                    style={{ width: `${phaseProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-3 opacity-90">
                  Phase Progress: {completedCount} of {currentPhase.dailyActions.length} daily practices completed
                </p>
              </div>
            )}

            {/* Daily Actions Checklist */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-6">Daily Embodiment Practices</h3>
              {currentPhase.dailyActions.map((action) => (
                <button
                  key={action.check}
                  onClick={() => toggleCheck(action.check)}
                  className={`w-full p-6 rounded-xl text-left transition-all transform hover:scale-102 ${
                    completedChecks[action.check]
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                      : 'bg-white/10 border border-white/20 text-white hover:bg-white/15'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-bold text-lg mb-2">{action.action}</div>
                      <p className="text-sm opacity-90 mb-2">{action.detail}</p>
                      <div className="text-xs opacity-75">⏰ {action.time}</div>
                    </div>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ml-4 ${
                        completedChecks[action.check]
                          ? 'bg-white text-green-600'
                          : 'bg-white/20 text-white'
                      }`}
                    >
                      {completedChecks[action.check] ? <Check className="w-6 h-6" /> : <span>✓</span>}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Sync Buttons */}
            <div className="flex gap-4 justify-center mt-8">
              <button
                onClick={syncToCalendar}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all"
              >
                📅 Sync to Google Calendar
              </button>
              <button
                onClick={syncToWhatsApp}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all"
              >
                💬 Sync to WhatsApp
              </button>
            </div>

            {/* Next Phase Prompt */}
            <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-xl p-8 border border-amber-400/50">
              <p className="text-amber-100 text-lg">
                <span className="font-bold">Next Phase Readiness: </span>
                {currentPhase.nextPhasePrompt}
              </p>
            </div>
          </div>
        )}

        {/* BODY STACK VIEW */}
        {viewMode === 'body-stack' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              THE EMBODIMENT STACK
              <br />
              <span className="text-lg font-light text-purple-300">From Sovereignty to Whole Being</span>
            </h2>

            {/* Draw the body stack from bottom to top */}
            <div className="flex flex-col-reverse space-y-4 space-y-reverse">
              {bodyStack.map((level, idx) => (
                <div
                  key={level.level}
                  className={`bg-gradient-to-r ${level.color} rounded-xl p-8 transform transition-all hover:scale-105 cursor-pointer`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm opacity-75 font-bold">Level {level.level}</div>
                      <h3 className="text-2xl font-bold text-white">{level.name}</h3>
                      <p className="text-white/80 mt-2">{level.description}</p>
                    </div>
                    <div className="text-4xl ml-4 flex-shrink-0">
                      {level.level === 1 && '⚓'}
                      {level.level === 2 && '🌍'}
                      {level.level === 3 && '🔗'}
                      {level.level === 4 && '⚡'}
                      {level.level === 5 && '🧭'}
                      {level.level === 6 && '😍'}
                      {level.level === 7 && '👑'}
                      {level.level === 8 && '🙏'}
                      {level.level === 9 && '🦢'}
                      {level.level === 10 && '✨'}
                      {level.level === 11 && '💝'}
                      {level.level === 12 && '👸'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/10 rounded-xl p-8 border border-white/20 mt-8">
              <h3 className="text-xl font-bold mb-4">How the Stack Works</h3>
              <p className="text-purple-200 mb-4">
                Each level builds on the one below. You cannot access "Assured & Provoked" without first being "Grounded." 
                You cannot embody "Whole Being Practitioner" without moving through all 12 levels.
              </p>
              <p className="text-purple-200">
                <span className="font-bold">The daily practices activate the level you're embodying.</span> The movement ritual 
                (Ballet, Bands, Belly Dance) is the linchpin that catalyzes integration from one level to the next.
              </p>
            </div>
          </div>
        )}

        {/* 2026 VISION VIEW */}
        {viewMode === 'vision' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">{vision2026.title}</h2>
              <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text">
                {vision2026.centralHub.revenue}
              </p>
              <p className="text-purple-200 text-lg mt-4">
                Integrated practitioner. 4 core roles. 5+ revenue streams. Sovereign embodiment.
              </p>
            </div>

            {/* Central Hub */}
            <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-12 border-2 border-pink-400/50">
              <h3 className="text-3xl font-bold text-white mb-4">{vision2026.centralHub.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {vision2026.centralHub.roles.map((role) => (
                  <div key={role} className="bg-white/20 rounded-lg p-4 text-center">
                    <p className="text-xl font-bold text-white">{role}</p>
                  </div>
                ))}
              </div>
              <p className="text-purple-100 text-lg">
                {vision2026.centralHub.description}
              </p>
            </div>

            {/* Revenue Streams */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Revenue Streams (5+)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vision2026.streams.map((stream, idx) => (
                  <div
                    key={stream.name}
                    className="bg-white/5 border border-white/20 rounded-xl p-8 hover:border-white/40 transition-all"
                  >
                    <h4 className="text-xl font-bold text-white mb-2">{stream.name}</h4>
                    <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text mb-4">
                      {stream.revenue}
                    </div>
                    <p className="text-purple-200 mb-4">{stream.description}</p>
                    <p className="text-sm text-amber-300">📍 {stream.integration}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2026 Key Milestones */}
            <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-xl p-8 border border-amber-400/30">
              <h3 className="text-2xl font-bold mb-6">2026 Key Milestones</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-bold text-white">Expert Positioning</p>
                    <p className="text-purple-200 text-sm">Recognized as pre-symptom microbiome expert. Speaking on major platforms.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-bold text-white">Goldfinch Health Partnership</p>
                    <p className="text-purple-200 text-sm">LPN-led pain management protocols live. Opioid settlement funding flowing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-bold text-white">The Natural Nipple Scaling</p>
                    <p className="text-purple-200 text-sm">Fertility-to-feeding platform with sponsor ecosystem. Microbiome monitoring integrated.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-bold text-white">Revenue Diversification</p>
                    <p className="text-purple-200 text-sm">Multiple streams flowing. $2.65M target actualized from aligned revenue sources.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-bold text-white">Whole Being Practitioner Brand</p>
                    <p className="text-purple-200 text-sm">No longer "Reproductive Specialist." You are the embodied, sovereign expert.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center pb-8">
          <div className="inline-block bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-8 border border-pink-400/30 max-w-2xl">
            <p className="text-pink-200 text-sm font-bold mb-3">✨ YOUR EMBODIED NORTH STAR ✨</p>
            <p className="text-white text-xl italic font-light">
              "Start with Whole Being Alignment to feel deeply connected for Energetic Restoration."
            </p>
            <p className="text-purple-200 text-sm mt-4">
              The states drive the revenue. The practices activate the states. The embodiment IS the brand.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default EmpressEmbodimentBot;
