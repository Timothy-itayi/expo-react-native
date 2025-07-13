# 🕳️ Pit Mode Implementation Guide

## Overview

Pit Mode is a strategic card game mode that focuses on trait matching and the pit system. Players must carefully choose their traits - matching traits result in battles for points, while non-matching cards are lost to the pit forever.

## 🏗️ Architecture

### Core Components

```
compare/
├── types/
│   └── bluffMode.ts              # Type definitions and interfaces
├── services/
│   └── bluffGameService.ts       # Core game logic and state management
├── components/bluff/
│   ├── TraitSelectionPhase.tsx   # Card and trait selection UI
│   ├── BattleRevealPhase.tsx     # Battle results and animations
│   └── BluffGameOverOverlay.tsx  # Custom game over screen
├── screens/
│   └── BluffGameScreen.tsx       # Main pit game orchestrator
├── app/
│   ├── game-modes.tsx            # Game mode selection screen
│   └── bluff-game.tsx            # Pit game route
└── components/
    └── GameModeSelector.tsx      # Mode selection UI
```

### Data Flow

1. **Game Initialization**: `PitGameService.createNewGame()`
2. **Selection Phase**: Player selects card and trait → `PitGameService.selectTraits()`
3. **Reveal Phase**: Traits are revealed → `PitGameService.revealAndBattle()`
4. **Scoring Phase**: Results processed → `PitGameService.processRoundResult()`

## 🎮 Game Mechanics

### Core Rules

1. **Hidden Hand System**: Each player starts with 3 hidden cards
2. **Trait Matching**: Cards only battle if both players choose the same trait
3. **Pit System**: Non-matching cards go to the "pit" and are lost forever
4. **Strategic Selection**: Players must balance trait values with opponent prediction

### Victory Conditions

- **Card Collection**: Collect all opponent's cards
- **Point Threshold**: Reach target points (default: 100)
- **Survival**: Last player with cards wins
- **Game Over**: All cards in pit (draw)

### Scoring System

- **Base Points**: Value of the winning trait
- **Trait Match Bonus**: +1 point when traits match
- **Pit Penalty**: 0 points when cards go to pit

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

1. **Selection Phase**: Pick a card and commit to a trait
2. **Watch the Reveal**: See if traits match and who wins
3. **Score Points**: Earn points based on victories
4. **Manage the Pit**: Avoid losing valuable cards to the pit

### For Developers

#### Adding New Traits

1. Update `Trait` type in `types/bluffMode.ts`:
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
  targetPoints: 150,
  traitMatchBonus: 2
});
```

#### Adding New Victory Conditions

1. Update `VictoryCondition` type
2. Implement logic in `checkVictoryConditions()`
3. Add UI handling in `BluffGameOverOverlay`

## 🔧 Configuration Options

### Game Settings

```typescript
interface PitGameConfig {
  startingCards: number;      // Cards per player (default: 3)
  targetPoints: number;       // Points to win (default: 100)
  traitMatchBonus: number;    // Bonus for trait match (default: 1)
  pitPenalty: number;         // Penalty for pit (default: 0)
}
```

### AI Behavior

The CPU AI can be enhanced by modifying these methods in `PitGameService`:

- `generateCPUTraitSelection()`: CPU trait selection logic

## 🎨 UI Components

### TraitSelectionPhase
- Card selection with visual feedback
- Trait buttons showing values
- Best trait highlighting
- Pit system explanation

### BattleRevealPhase
- Animated trait reveal
- Battle result display
- Bonus points notification
- Pit cards display

### BluffGameOverOverlay
- Victory condition-specific messages
- Final score display
- Play again functionality

## 🧪 Testing

### Manual Testing Checklist

- [ ] Game initialization with correct cards
- [ ] Trait selection with card highlighting
- [ ] Battle reveal animations
- [ ] Scoring system accuracy
- [ ] Victory condition detection
- [ ] Game over overlay display
- [ ] Play again functionality
- [ ] Pit system functionality

### Automated Testing (Future)

```typescript
// Example test structure
describe('PitGameService', () => {
  test('should create new game with correct state', () => {
    const state = PitGameService.createNewGame(playerCards, cpuCards);
    expect(state.playerHand).toHaveLength(3);
    expect(state.gamePhase).toBe('selection');
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