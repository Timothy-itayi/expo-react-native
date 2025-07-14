import { CardType } from '../data/cards';
import { 
  GambleGameState, 
  GambleRound, 
  Trait, 
  GambleGameConfig,
  VictoryCondition,
  Prediction
} from '../types/gambleMode';

export class GambleGameService {
  private static config: GambleGameConfig = {
    startingCards: 3,
    traitMatchBonus: 1,
    pitPenalty: 0,
    traitCycleMode: 'cycle'
  };

  private static logDebug(message: string, data?: any) {
    console.log(`🕳️ [GambleGameService] ${message}`, data ? data : '');
  }

  static createInitialState(): GambleGameState {
    return {
      playerDeck: [],
      cpuDeck: [],
      pit: [], // Will remain empty in Gamble mode
      playerScore: 0,
      cpuScore: 0,
      totalPoints: 0,
      currentRound: null,
      roundNumber: 0,
      gamePhase: 'selection',
      isGameStarted: false,
      isGameOver: false,
      victoryCondition: null,
      traitCycle: ['speed', 'power', 'grip', 'weight'],
      currentTraitIndex: 0,
      traitChooser: 'cpu',
      traitToChoose: true
    };
  }

  static createNewGame(allCards: CardType[]): GambleGameState {
    this.logDebug('Creating new gamble game with split decks', {
      deckSize: allCards.length,
      cardNames: allCards.map(c => c.name)
    });
    // Shuffle and split deck
    const shuffled = shuffleArray(allCards);
    const half = Math.floor(shuffled.length / 2);
    const playerDeck = shuffled.slice(0, half);
    const cpuDeck = shuffled.slice(half);
    return {
      playerDeck,
      cpuDeck,
      pit: [],
      playerScore: 0,
      cpuScore: 0,
      totalPoints: 0,
      currentRound: null,
      roundNumber: 1,
      gamePhase: 'trait-reveal',
      isGameStarted: true,
      isGameOver: false,
      victoryCondition: null,
      traitCycle: ['speed', 'power', 'grip', 'weight'],
      currentTraitIndex: 0,
      traitChooser: 'cpu',
      traitToChoose: true
    };
  }

  static startNewRound(currentState: GambleGameState): GambleGameState {
    this.logDebug('Starting new round', { roundNumber: currentState.roundNumber });
    // Check if we have enough cards in both decks
    if (currentState.playerDeck.length < 1 || currentState.cpuDeck.length < 1) {
      return {
        ...currentState,
        isGameOver: true,
        victoryCondition: 'gameOver'
      };
    }
    // If trait needs to be chosen, handle it automatically
    if (currentState.traitToChoose) {
      if (currentState.traitChooser === 'cpu') {
        // CPU chooses the trait and immediately creates the round
        const revealedTrait = this.cpuChooseTraitRandom();
        const round: GambleRound = {
          revealedTrait,
          roundNumber: currentState.roundNumber,
          playerCard: currentState.playerDeck[0],
          cpuCard: currentState.cpuDeck[0],
          playerPrediction: 'higher', // Will be set by player before flip
          cpuPrediction: 'higher', // Will be set by CPU before flip
          playerValue: 0,
          cpuValue: 0,
          playerCorrect: false,
          cpuCorrect: false,
          cardsToPit: [],
          playerKeepsCard: false,
          cpuKeepsCard: false,
          gamePhase: 'prediction'
        };
        return {
          ...currentState,
          revealedTrait,
          traitToChoose: false,
          currentRound: round,
          gamePhase: 'prediction'
        };
      } else {
        // Player needs to choose the trait; wait for UI to call selectPlayerTrait
        return {
          ...currentState,
          revealedTrait: undefined,
          gamePhase: 'trait-reveal',
          currentRound: null
        };
      }
    }
    // If trait is chosen, create a round and move to prediction phase
    if (!currentState.traitToChoose && currentState.revealedTrait) {
      const revealedTrait = currentState.revealedTrait;
      const round: GambleRound = {
        revealedTrait,
        roundNumber: currentState.roundNumber,
        playerCard: currentState.playerDeck[0],
        cpuCard: currentState.cpuDeck[0],
        playerPrediction: 'higher', // Will be set by player before flip
        cpuPrediction: 'higher', // Will be set by CPU before flip
        playerValue: 0,
        cpuValue: 0,
        playerCorrect: false,
        cpuCorrect: false,
        cardsToPit: [],
        playerKeepsCard: false,
        cpuKeepsCard: false,
        gamePhase: 'prediction'
      };
      return {
        ...currentState,
        currentRound: round,
        gamePhase: 'prediction'
      };
    }
    // fallback (should not happen)
    return currentState;
  }

  // Remove makePrediction, merge logic into flipCards

  static flipCards(currentState: GambleGameState, playerPrediction: Prediction): GambleGameState {
    if (!currentState.currentRound) {
      throw new Error('No current round to flip cards');
    }
    this.logDebug('Flipping cards from player and cpu decks');
    // Get the top cards from each deck
    const playerCard = currentState.playerDeck[0];
    const cpuCard = currentState.cpuDeck[0];
    const remainingPlayerDeck = currentState.playerDeck.slice(1);
    const remainingCpuDeck = currentState.cpuDeck.slice(1);
    // CPU makes its prediction randomly
    const cpuPrediction = this.generateCPUPrediction(currentState.currentRound.revealedTrait);
    // Get the actual values
    const trait = currentState.currentRound.revealedTrait;
    const playerValue = playerCard[trait];
    const cpuValue = cpuCard[trait];
    // Check predictions
    const playerCorrect = this.checkPrediction(playerPrediction, playerValue, cpuValue);
    const cpuCorrect = this.checkPrediction(cpuPrediction, cpuValue, playerValue);
    // Determine outcomes
    const playerKeepsCard = playerCorrect;
    const cpuKeepsCard = cpuCorrect;
    // No cards go to pit in Gamble mode
    const cardsToPit: CardType[] = [];
    // Handle tiebreaker if both predictions are correct
    let finalPlayerKeepsCard = playerKeepsCard;
    let finalCpuKeepsCard = cpuKeepsCard;
    let finalCardsToPit = [];
    if (playerCorrect && cpuCorrect) {
      // Tiebreaker: winner gets both cards
      if (playerValue > cpuValue) {
        finalPlayerKeepsCard = true;
        finalCpuKeepsCard = false;
      } else if (cpuValue > playerValue) {
        finalPlayerKeepsCard = false;
        finalCpuKeepsCard = true;
      } else {
        // Perfect tie - both keep their cards
        finalPlayerKeepsCard = true;
        finalCpuKeepsCard = true;
      }
    }
    const updatedRound: GambleRound = {
      ...currentState.currentRound,
      playerCard,
      cpuCard,
      playerPrediction,
      cpuPrediction,
      playerValue,
      cpuValue,
      playerCorrect,
      cpuCorrect,
      playerKeepsCard: finalPlayerKeepsCard,
      cpuKeepsCard: finalCpuKeepsCard,
      cardsToPit: [], // No cards to pit
      gamePhase: 'reveal'
    };
    this.logDebug('Round revealed', {
      trait,
      playerValue,
      cpuValue,
      playerCorrect,
      cpuCorrect,
      cardsToPit: []
    });
    return {
      ...currentState,
      playerDeck: remainingPlayerDeck,
      cpuDeck: remainingCpuDeck,
      currentRound: updatedRound,
      gamePhase: 'reveal'
    };
  }

  static processRoundResult(currentState: GambleGameState): GambleGameState {
    if (!currentState.currentRound) {
      throw new Error('No current round to process');
    }
    const round = currentState.currentRound;
    // No cards go to pit in Gamble mode
    const newPit = currentState.pit;
    // Update scores
    let newPlayerScore = currentState.playerScore;
    let newCpuScore = currentState.cpuScore;
    if (round.playerKeepsCard) newPlayerScore += 1;
    if (round.cpuKeepsCard) newCpuScore += 1;
    // Prepare for next round
    const nextRoundNumber = currentState.roundNumber + 1;
    const nextTraitChooser = currentState.traitChooser === 'player' ? 'cpu' : 'player';
    // Check victory conditions
    const victoryCondition = this.checkVictoryConditions({
      ...currentState,
      pit: newPit,
      playerScore: newPlayerScore,
      cpuScore: newCpuScore,
      roundNumber: nextRoundNumber
    });
    const newState: GambleGameState = {
      ...currentState,
      pit: newPit,
      playerScore: newPlayerScore,
      cpuScore: newCpuScore,
      roundNumber: nextRoundNumber,
      traitChooser: nextTraitChooser,
      traitToChoose: true,
      currentRound: null,
      gamePhase: 'trait-reveal',
      isGameOver: victoryCondition !== null,
      victoryCondition,
      playerDeck: currentState.playerDeck,
      cpuDeck: currentState.cpuDeck
    };
    this.logDebug('Round processed', {
      playerScore: newPlayerScore,
      cpuScore: newCpuScore,
      cardsToPit: [],
      nextTraitChooser,
      victoryCondition
    });
    return newState;
  }

  private static getTraitForRound(state: GambleGameState): Trait {
    return state.traitCycle[state.currentTraitIndex % state.traitCycle.length];
  }

  private static generateCPUPrediction(trait: Trait): Prediction {
    // Simple random prediction for now
    return Math.random() > 0.5 ? 'higher' : 'lower';
  }

  private static cpuChooseTraitRandom(): Trait {
    const traits: Trait[] = ['speed', 'power', 'grip', 'weight'];
    return traits[Math.floor(Math.random() * traits.length)];
  }

  private static checkPrediction(prediction: Prediction, ownValue: number, opponentValue: number): boolean {
    if (prediction === 'higher') {
      return ownValue > opponentValue;
    } else {
      return ownValue < opponentValue;
    }
  }

  private static checkVictoryConditions(state: GambleGameState): VictoryCondition | null {
    // Game over if deck is empty
    if (state.playerDeck.length === 0 && state.cpuDeck.length === 0) {
      return 'gameOver';
    }
    
    // Could add more victory conditions here
    return null;
  }

  static getGameConfig(): GambleGameConfig {
    return { ...this.config };
  }

  static updateGameConfig(newConfig: Partial<GambleGameConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  static selectPlayerTrait(currentState: GambleGameState, trait: Trait): GambleGameState {
    this.logDebug('Player selected trait', { trait });
    
    // Create a round immediately after player selects trait, just like CPU does
    const round: GambleRound = {
      revealedTrait: trait,
      roundNumber: currentState.roundNumber,
      playerCard: currentState.playerDeck[0],
      cpuCard: currentState.cpuDeck[0],
      playerPrediction: 'higher', // Will be set by player before flip
      cpuPrediction: 'higher', // Will be set by CPU before flip
      playerValue: 0,
      cpuValue: 0,
      playerCorrect: false,
      cpuCorrect: false,
      cardsToPit: [],
      playerKeepsCard: false,
      cpuKeepsCard: false,
      gamePhase: 'prediction'
    };
    
    return {
      ...currentState,
      revealedTrait: trait,
      traitToChoose: false,
      currentRound: round,
      gamePhase: 'prediction'
    };
  }

  private static cpuChooseTrait(cpuHand: CardType[]): Trait {
    // This method is no longer used since we don't have hands
    // Keeping for backward compatibility but it's deprecated
    const traits: Trait[] = ['speed', 'power', 'grip', 'weight'];
    return traits[Math.floor(Math.random() * traits.length)];
  }
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
} 