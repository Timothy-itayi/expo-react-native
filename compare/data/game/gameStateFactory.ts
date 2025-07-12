import { CardFactory, CardType } from '../cards';
import { RewardManager } from '../rewards/rewardManager';

export interface GameState {
  deck: CardType[];
  playerHand: CardType[];
  cpuHand: CardType[];
  playerWins: CardType[];
  cpuWins: CardType[];
  currentRound: null;
  score: {
    player: number;
    cpu: number;
  };
  isGameStarted: boolean;
  isGameOver: boolean;
}

export class GameStateFactory {
  private static logDebug(message: string, data?: any) {
    console.log(`🎮 [GameStateFactory] ${message}`, data ? data : '');
  }

  static createInitialState(): GameState {
    return {
      deck: [],
      playerHand: [],
      cpuHand: [],
      playerWins: [],
      cpuWins: [],
      currentRound: null,
      score: { player: 0, cpu: 0 },
      isGameStarted: false,
      isGameOver: false
    };
  }

  static async createNewGame(): Promise<GameState> {
    this.logDebug('Creating new game state');
    
    // Get 6 unique cards (3 for player, 3 for CPU)
    const gameCards = CardFactory.createCardSet(6);
    this.logDebug('Generated unique cards:', 
      gameCards.map(card => `${card.name}(${card.id})`).join(', ')
    );

    return {
      deck: gameCards,
      playerHand: gameCards.slice(0, 3),
      cpuHand: gameCards.slice(3, 6),
      playerWins: [],
      cpuWins: [],
      currentRound: null,
      score: { player: 0, cpu: 0 },
      isGameStarted: true,
      isGameOver: false
    };
  }

  static async resetPoints(): Promise<void> {
    this.logDebug('Resetting points');
    await RewardManager.forceReset();
  }

  static createGameOverState(currentState: GameState): GameState {
    return {
      ...currentState,
      isGameOver: true,
      isGameStarted: false
    };
  }
} 