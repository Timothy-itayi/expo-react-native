# 🕳️ Pit Mode Implementation Guide

## Overview

Pit Mode is a strategic card game mode that focuses on trait prediction and the pit system. At the start of each round, a single trait is revealed to both players. Players then make high/low predictions about their card's trait value compared to their opponent's, select cards, and reveal the results. Correct predictions keep cards, while wrong predictions send cards to the pit forever.

## 🏗️ Architecture

### Core Components

```
compare/
├── types/
│   └── pitMode.ts                 # Type definitions and interfaces
├── services/
│   └── pitGameService.ts          # Core game logic and state management
├── components/pit/
│   ├── TraitRevealPhase.tsx       # Trait revelation UI
│   ├── PredictionPhase.tsx        # High/low prediction UI
│   ├── TraitSelectionPhase.tsx    # Card selection UI
│   ├── BattleRevealPhase.tsx      # Results and animations
│   └── PitGameOverOverlay.tsx     # Custom game over screen
├── screens/
│   └── PitGameScreen.tsx          # Main pit game orchestrator
├── app/
│   ├── game-modes.tsx             # Game mode selection screen
│   └── pit-game.tsx               # Pit game route
└── components/
    └── GameModeSelector.tsx       # Mode selection UI
```

### Data Flow

1. **Game Initialization**: `PitGameService.createNewGame()`
2. **Trait Reveal**: `PitGameService.startNewRound()` → TraitRevealPhase
3. **Prediction Phase**: `PitGameService.makePrediction()` → PredictionPhase
4. **Card Selection**: `PitGameService.selectCard()` → TraitSelectionPhase
5. **Reveal Phase**: `PitGameService.revealAndProcess()` → BattleRevealPhase
6. **Result Processing**: `PitGameService.processRoundResult()`

## 🎮 Game Mechanics

### Core Rules

1. **Trait Revelation**: Each round starts with a single trait revealed to both players
2. **High/Low Prediction**: Both players privately predict if their card's trait value will be higher or lower than their opponent's
3. **Card Selection**: Each player chooses one card from their hand to submit for the round
4. **Reveal Phase**: Both cards are revealed and predictions are checked
5. **Pit System**: Wrong predictions send cards to the pit forever, correct predictions keep cards

### Victory Conditions

- **Card Collection**: Collect all opponent's cards
- **Survival**: Last player with cards wins
- **Game Over**: All cards in pit (draw)

### Scoring System

- **No Points**: Pit mode focuses on card collection, not points
- **Card Retention**: Correct predictions keep cards in hand
- **Pit Loss**: Wrong predictions lose cards to pit forever

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Run the Application

```bash
npx expo start
```

### 3. Navigate to Pit Mode

1. Open the app
2. Tap "🎮 Play Game"
3. Select "🕳️ Pit Mode"
4. Start playing!

## 🎯 Usage Guide

### For Players

1. **Trait Reveal**: See which trait will be compared this round
2. **Make Prediction**: Choose higher or lower for your card's trait value
3. **Select Card**: Pick a card from your hand to play
4. **Watch Reveal**: See the results and which cards go to pit
5. **Manage Hand**: Keep your best cards for future rounds

### For Developers

#### Adding New Traits

1. Update `Trait` type in `types/pitMode.ts`:
```typescript
export type Trait = 'speed' | 'power' | 'grip' | 'weight' | 'newTrait';
```

2. Update trait arrays in components:
```typescript
const traits = [
  // ... existing traits
  { trait: 'newTrait', label: 'New Trait', emoji: '🆕', color: '#color' }
];
```

#### Modifying Game Configuration

Update `PitGameService.config`:
```typescript
static updateGameConfig({
  startingCards: 4,
  traitCycleMode: 'random' // or 'cycle'
});
```

#### Adding New Victory Conditions

1. Update `VictoryCondition` type
2. Implement logic in `checkVictoryConditions()`
3. Add UI handling in `PitGameOverOverlay`

## 🔧 Configuration Options

### Game Settings

```typescript
interface PitGameConfig {
  startingCards: number;      // Cards per player (default: 3)
  traitMatchBonus: number;    // Bonus for trait match (default: 1)
  pitPenalty: number;         // Penalty for pit (default: 0)
  traitCycleMode: 'random' | 'cycle'; // Trait selection mode
}
```

### AI Behavior

The CPU AI can be enhanced by modifying these methods in `PitGameService`:

- `generateCPUPrediction()`: CPU prediction logic
- `generateCPUCardSelection()`: CPU card selection logic

## 🎨 UI Components

### TraitRevealPhase
- Trait revelation with visual feedback
- Round number display
- Continue to predictions button

### PredictionPhase
- High/Low prediction buttons
- Trait information display
- Strategic tips

### TraitSelectionPhase
- Card selection with visual feedback
- Best card highlighting for revealed trait
- Confirmation button

### BattleRevealPhase
- Animated prediction reveal
- Card comparison display
- Results and pit information

### PitGameOverOverlay
- Victory condition-specific messages
- Final hand sizes display
- Play again functionality

## 🧪 Testing

### Manual Testing Checklist

- [ ] Game initialization with correct cards
- [ ] Trait revelation phase
- [ ] Prediction phase functionality
- [ ] Card selection with trait highlighting
- [ ] Battle reveal animations
- [ ] Pit system functionality
- [ ] Victory condition detection
- [ ] Game over overlay display
- [ ] Play again functionality

### Automated Testing (Future)

```typescript
// Example test structure
describe('PitGameService', () => {
  test('should create new game with correct state', () => {
    const state = PitGameService.createNewGame(playerCards, cpuCards);
    expect(state.playerHand).toHaveLength(3);
    expect(state.gamePhase).toBe('trait-reveal');
  });
});
```

## 🔮 Future Enhancements

### Planned Features

1. **Advanced AI**: Smarter CPU opponent with pattern recognition
2. **Pit Mechanics**: Special pit-based abilities or recovery
3. **Statistics**: Track pit losses and win rates
4. **Multiplayer**: Real-time multiplayer pit mode

## 🐛 Troubleshooting

### Common Issues

1. **Cards not updating**: Check PitGameService method calls
2. **UI not responding**: Verify component prop updates
3. **State not updating**: Check PitGameService method calls

### Debug Information

Debug logs are prefixed with 🕳️ [PitGameService]:
```typescript
console.log('🕳️ [PitGameService] Debug message');
```

## 🤝 Contributing

When contributing to Pit Mode:

1. Follow the existing code style
2. Add debug logs for new features
3. Test pit mechanics thoroughly
4. Update documentation for new features 