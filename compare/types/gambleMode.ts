import { CardType } from '../data/cards';

export type Trait = 'speed' | 'power' | 'grip' | 'weight';

export type Prediction = 'higher' | 'lower';

export interface GambleRound {
  // Round setup
  revealedTrait: Trait;
  roundNumber: number;
  
  // Player selections
  playerCard: CardType;
  cpuCard: CardType;
  playerPrediction: Prediction;
  cpuPrediction: Prediction;
  
  // Results
  playerValue: number;
  cpuValue: number;
  playerCorrect: boolean;
  cpuCorrect: boolean;
  
  // Outcome
  cardsToPit: CardType[];
  playerKeepsCard: boolean;
  cpuKeepsCard: boolean;
  
  // Game state
  gamePhase: 'trait-reveal' | 'cpu-trait-reveal' | 'prediction' | 'card-flip' | 'reveal' | 'result';
}

export interface GambleGameState {
  // Core game state - split decks
  playerDeck: CardType[];
  cpuDeck: CardType[];
  pit: CardType[]; // Will remain empty in Gamble mode
  
  // Scoring
  playerScore: number;
  cpuScore: number;
  totalPoints: number;
  
  // Round state
  currentRound: GambleRound | null;
  roundNumber: number;
  
  // Game flow
  gamePhase: 'selection' | 'trait-reveal' | 'cpu-trait-reveal' | 'prediction' | 'card-flip' | 'reveal' | 'result';
  isGameStarted: boolean;
  isGameOver: boolean;
  
  // Victory conditions
  victoryCondition: 'cardCollection' | 'survival' | 'gameOver' | null;
  
  // Trait cycling
  traitCycle: Trait[];
  currentTraitIndex: number;

  // Alternating trait chooser
  traitChooser: 'cpu' | 'player';
  traitToChoose: boolean;
  revealedTrait?: Trait;
}

export interface GambleGameConfig {
  startingCards: number;
  traitMatchBonus: number;
  pitPenalty: number;
  traitCycleMode: 'random' | 'cycle';
}

export type VictoryCondition = 'cardCollection' | 'survival' | 'gameOver'; 