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
  // Store initial cards for the game
  private static initialPlayerCards: CardType[] = [];
  private static initialCPUCards: CardType[] = [];

  private static logDebug(message: string, data?: any) {
    console.log(`🎮 [GameStateFactory] ${message}`, data ? data : '');
  }

  static createInitialState(): GameState {
    // Clear stored cards when creating initial state
    this.initialPlayerCards = [];
    this.initialCPUCards = [];
    
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
    
    // Only create new cards if we don't have initial cards stored
    if (this.initialPlayerCards.length === 0 || this.initialCPUCards.length === 0) {
      const gameCards = CardFactory.createCardSet(6);
      this.initialPlayerCards = gameCards.slice(0, 3);
      this.initialCPUCards = gameCards.slice(3, 6);
      
      this.logDebug('Generated new cards:', 
        gameCards.map(card => `${card.name}(${card.id})`).join(', ')
      );
    } else {
      this.logDebug('Reusing existing cards:', 
        [...this.initialPlayerCards, ...this.initialCPUCards]
          .map(card => `${card.name}(${card.id})`).join(', ')
      );
    }

    return {
      deck: [...this.initialPlayerCards, ...this.initialCPUCards],
      playerHand: [...this.initialPlayerCards],
      cpuHand: [...this.initialCPUCards],
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
    // Clear stored cards when resetting points
    this.initialPlayerCards = [];
    this.initialCPUCards = [];
  }

  static createGameOverState(currentState: GameState): GameState {
    // Clear stored cards when game is over
    this.initialPlayerCards = [];
    this.initialCPUCards = [];
    
    return {
      ...currentState,
      isGameOver: true,
      isGameStarted: false
    };
  }
} 