import { CardType } from '../data/cards';

export type Trait = 'speed' | 'power' | 'grip' | 'weight';

export type Prediction = 'higher' | 'lower';

export interface PitRound {
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
  gamePhase: 'trait-reveal' | 'prediction' | 'card-selection' | 'reveal' | 'result';
}

export interface PitGameState {
  // Core game state
  playerHand: CardType[];
  cpuHand: CardType[];
  pit: CardType[]; // Cards that go to pit when predictions are wrong
  
  // Scoring
  playerScore: number;
  cpuScore: number;
  totalPoints: number;
  
  // Round state
  currentRound: PitRound | null;
  roundNumber: number;
  
  // Game flow
  gamePhase: 'selection' | 'trait-reveal' | 'prediction' | 'card-selection' | 'reveal' | 'result';
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

export interface PitGameConfig {
  startingCards: number;
  traitMatchBonus: number;
  pitPenalty: number;
  traitCycleMode: 'random' | 'cycle';
}

export type VictoryCondition = 'cardCollection' | 'survival' | 'gameOver'; 