# Contradiction 4.0 - Quick Reference

## 🎮 Game Flow Chart

```
┌─────────────────────────────────────────────────────────┐
│                     MAIN MENU                           │
│  "Contradiction 4.0"                                    │
│  [Start Revolution →]                                   │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│                  LEVEL SELECT                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ 🏰 Feudal│  │🏭 Factory│  │💻 Tech   │            │
│  │  Farm    │→ │ (locked) │→ │(locked)  │            │
│  └──────────┘  └──────────┘  └──────────┘            │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│              LEVEL: Introduction                        │
│  🏰 Feudal Farm - Medieval Era                         │
│  "Peasants work the lord's land..."                    │
│  Current Productivity: 100 units/day                   │
│  [🤖 Introduce Advanced AI →]                          │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│              LEVEL: AI Revolution                       │
│  🤖 Productivity: 100 → 400 units/day!                 │
│  ⚠️ Contradiction: AI boosts output but feudal         │
│     lords still oppress peasants                       │
│                                                         │
│  Choose how to resolve:                                │
│  ┌─────────────────────────────────────────┐          │
│  │ 1. Keep Feudal System                   │          │
│  │    Lords control AI, peasants stay bound│          │
│  └─────────────────────────────────────────┘          │
│  ┌─────────────────────────────────────────┐          │
│  │ 2. Partial Reform                       │          │
│  │    Free some peasants, create wage labor│          │
│  └─────────────────────────────────────────┘          │
│  ┌─────────────────────────────────────────┐          │
│  │ 3. Cooperative Ownership                │          │
│  │    Peasants collectively own AI          │          │
│  └─────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│                   OUTCOME                               │
│  ⚔️ REVOLUTION! / ⚖️ TRANSITION / ✨ HARMONY!          │
│                                                         │
│  Result: "The peasants revolt! They see..."            │
│  Stability: -50%  [━━━━━━░░░░] ❌                     │
│                                                         │
│  🧔 Marx's Analysis:                                   │
│  "The contradiction becomes unbearable..."             │
│                                                         │
│  [← Back to Levels]  [Continue →]                     │
└─────────────────────────────────────────────────────────┘
                         ↓
         (Repeat for levels 2 & 3)
                         ↓
┌─────────────────────────────────────────────────────────┐
│              FINAL ANALYSIS                             │
│  Historical Analysis Complete                          │
│                                                         │
│  ┌─────┐  ┌─────┐  ┌─────┐                           │
│  │✨ 2 │  │⚖️ 1 │  │⚔️ 0 │                           │
│  │Success│ │Trans│  │Revol│                           │
│  └─────┘  └─────┘  └─────┘                           │
│                                                         │
│  🌟 Stable Socialist Society                           │
│  Total Stability: +110                                 │
│                                                         │
│  🧔 Marx's Final Verdict:                              │
│  "Progress, but the struggle continues..."             │
│                                                         │
│  [🔄 Play Again]  [📊 Review Levels]                   │
└─────────────────────────────────────────────────────────┘
```

## 📊 Choice Outcomes Matrix

| Choice | Level 1 (Feudal) | Level 2 (Capitalist) | Level 3 (Tech) |
|--------|------------------|----------------------|----------------|
| **Keep Old System** | ⚔️ Revolution (-50) | ⚔️ Revolution (-60) | ⚔️ Revolution (-70) |
| **Partial Reform** | ⚖️ Transition (+20) | ⚖️ Transition (+30) | ⚖️ Transition (+35) |
| **Cooperative** | ✨ Harmony (+50) | ✨ Harmony (+60) | ✨ Harmony (+80) |

## 🎯 Scoring Breakdown

### Individual Level Stability
- **Revolution**: Large negative (-50 to -70)
- **Transition**: Moderate positive (+20 to +35)
- **Harmony**: Large positive (+50 to +80)

### Final Overall Outcome
| Total Stability | Verdict | Description |
|----------------|---------|-------------|
| 100+ | 🌟 Utopia | Perfect harmony achieved |
| 0 to 99 | ✅ Stable | Moderate success |
| -50 to -1 | ⚠️ Crisis | On the brink |
| < -50 | 💥 Collapse | System failure |

## 🧔 Mentor Marx Quotes by Level

### Level 1 (Feudal Farm)
- "The hand-mill gives you society with the feudal lord..."
- "The contradiction becomes unbearable. The new productive forces shatter the old chains!"

### Level 2 (Factory)
- "Capital digs its own grave. The expropriators are expropriated!"
- "The associated producers rationally regulate their interchange with nature!"

### Level 3 (Tech)
- "The contradiction reaches its highest form. The material conditions for liberation are fully ripe!"
- "From each according to ability, to each according to need. The realm of freedom begins!"

## 🎨 UI Component Breakdown

```
Contradiction40Game (Main Container)
├── Main Menu State
│   ├── Title & Description
│   ├── Start Button
│   └── Mentor Marx Toggle
│
├── Level Select State
│   ├── Progress Display
│   ├── LevelCard x3
│   │   ├── Icon & Name
│   │   ├── Era Label
│   │   └── Completion Status
│   └── Mentor Marx Button
│
├── Playing State
│   ├── GameLevel Component
│   │   ├── Introduction Phase
│   │   │   ├── Level Info
│   │   │   ├── Current System
│   │   │   └── AI Introduction Button
│   │   │
│   │   ├── Choice Phase
│   │   │   ├── Productivity Boost
│   │   │   ├── Contradiction Display
│   │   │   └── 3 Choice Buttons
│   │   │
│   │   └── Result Phase
│   │       ├── Outcome Title
│   │       ├── Result Text
│   │       ├── Stability Bar
│   │       ├── Marx Quote
│   │       └── Navigation Buttons
│   │
│   └── Floating Mentor Button
│
└── Completed State
    ├── Statistics Grid
    ├── Overall Outcome
    ├── Final Verdict
    └── Action Buttons

MentorMarx Component (Overlay)
├── Marx Avatar
├── Quote/Hint Text
└── Next Insight Button
```

## 🔑 Key Component Props

### Contradiction40Game
```javascript
// State Management
gameState: 'menu' | 'levelSelect' | 'playing' | 'completed'
currentLevel: Level | null
completedLevels: { [levelId]: Outcome }
totalStability: number
showMentor: boolean
```

### GameLevel
```javascript
level: Level              // Current level data
onChoiceMade: (outcome, levelId) => void
onBack: () => void
```

### LevelCard
```javascript
level: Level
isActive: boolean        // Can be played
isCompleted: boolean     // Has been played
outcome: Outcome | null  // Result if completed
onClick: () => void
```

### MentorMarx
```javascript
currentLevel: Level | null
showHint: boolean
```

## 🎨 Color Coding

| Color | Usage | Hex |
|-------|-------|-----|
| Communist Red | Revolution, critical | #993140 |
| Cyber Blue | AI, tech, UI accents | #00D4FF |
| Revolutionary Gold | Success, Mentor Marx | #FFD700 |
| Neural Green | Harmony, positive outcomes | #00FF88 |
| Steel Gray | Neutral, disabled | #2F4F4F |
| Cream White | Text, readable content | #FFF8DC |
| Deep Black | Backgrounds | #050001 |

## 📱 Responsive Breakpoints

```css
/* Mobile: Default styles */
/* Tablet: 768px+ */
md:text-4xl, md:grid-cols-2

/* Desktop: 1024px+ */
lg:flex-row, lg:w-[57%]

/* Large Desktop: 1280px+ */
xl:mt-0

/* Extra Large: 1536px+ */
2xl:text-8xl
```

## 🚀 Quick Testing Checklist

- [ ] Main menu loads with animations
- [ ] Level 1 unlocked, others locked
- [ ] AI introduction increases productivity
- [ ] All 3 choices work in each level
- [ ] Stability bar animates correctly
- [ ] Marx quotes appear in results
- [ ] Next level unlocks after completion
- [ ] Final analysis calculates correctly
- [ ] Restart resets all state
- [ ] Mentor Marx toggle works
- [ ] Mobile responsive layout
- [ ] Floating game button visible

## 🎓 Educational Talking Points

When explaining the game:
1. **LLSX (生产力)**: Productive forces = technology + labor power
2. **QHSX (生产关系)**: Relations of production = ownership + distribution
3. **Contradiction**: When LLSX advances but QHSX stays old → tension
4. **Resolution**: Either adapt QHSX to match LLSX, or revolution happens
5. **Historical Materialism**: Society evolves through these contradictions

## 💡 Pro Tips

- Try all 3 choices in one level to see different outcomes
- Aim for all "Harmony" results for the best ending
- Read Marx quotes carefully - they explain the theory
- Use Mentor Marx hints when stuck
- The game mirrors real historical transitions
- Each era shows escalating stakes (feudal → capitalist → digital)

---

**Quick Start**: Click floating "PLAY NOW" button → Start Revolution → Make choices!
