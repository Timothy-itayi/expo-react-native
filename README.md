# expo-react-native

(｀・ω・´) **Showdown: Card Battle Game** 

A React Native card battle game where players compete with unique car cards! ＼(≧▽≦)／

## System Design ⚙️

### Core Architecture (⌐■_■)
- React Native + Expo
- TypeScript for type safety
- Expo Router for navigation

### Game Engine ヽ(°〇°)ﾉ
- Factory pattern for game state management
- Battle tracker system for match history
- Reward system with point calculations

### Data Flow (｀･ω･´)ゞ
```
GameStateFactory → GameScreen → Battle Components
         ↓              ↓             ↓
    State Logic    UI Rendering    User Input
         ↓              ↓             ↓
   Battle Logic  ←  Game Flow   ← Player Actions
```

### Components (◕‿◕✿)
- `CardFan`: Interactive card selection
- `BattleCard`: Card display and animations
- `GameOverlay`: Battle results and rewards

### State Management (｀_´)ゞ
- Local state with React hooks
- AsyncStorage for persistence
- Supabase for leaderboards

### Battle System ᕦ(ò_óˇ)ᕤ
- 3 key attributes: Speed, Power, Grip
- Turn-based gameplay
- CPU opponent AI

## Work in Progress ⚡️

More exciting features coming soon! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧