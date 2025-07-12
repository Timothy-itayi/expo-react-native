// Types for battle rewards system

export interface BattleReward {
  type: 'points' | 'streak' | 'perfect' | 'comeback';
  amount: number;
  description: string;
  timestamp: Date;
}

export interface GameStats {
  totalGames: number;
  totalWins: number;
  currentStreak: number;
  bestStreak: number;
  totalPoints: number;
  perfectWins: number;
  comebackWins: number;
}

export interface BattleResult {
  playerWins: number;
  cpuWins: number;
  isPerfectWin: boolean;
  isComebackWin: boolean;
  roundResults: RoundResult[];
}

// Import from existing game types
import { CardType } from '../data/cardFactory';

export interface RoundResult {
  playerCard: CardType;
  cpuCard: CardType;
  result: 'Player' | 'CPU' | 'Draw';
  attribute: 'speed' | 'power' | 'grip';
} 