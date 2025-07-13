import { CardType } from '../data/cards';
import { 
  PitGameState, 
  PitRound, 
  Trait, 
  PitGameConfig,
  VictoryCondition,
  Prediction
} from '../types/pitMode';

export class PitGameService {
  private static config: PitGameConfig = {
    startingCards: 3,
    traitMatchBonus: 1,
    pitPenalty: 0,
    traitCycleMode: 'cycle'
  };

  private static logDebug(message: string, data?: any) {
    console.log(`🕳️ [PitGameService] ${message}`, data ? data : '');
  }

  static createInitialState(): PitGameState {
    return {
      playerHand: [],
      cpuHand: [],
      pit: [],
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

  static createNewGame(playerCards: CardType[], cpuCards: CardType[]): PitGameState {
    this.logDebug('Creating new pit game', {
      playerCards: playerCards.map(c => c.name),
      cpuCards: cpuCards.map(c => c.name)
    });

    return {
      playerHand: [...playerCards],
      cpuHand: [...cpuCards],
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

  static startNewRound(currentState: PitGameState): PitGameState {
    this.logDebug('Starting new round', { roundNumber: currentState.roundNumber });

    // If trait needs to be chosen, set gamePhase to 'trait-reveal' and wait for trait selection
    if (currentState.traitToChoose) {
      if (currentState.traitChooser === 'cpu') {
        // CPU chooses the trait (best for its hand)
        const revealedTrait = this.cpuChooseTrait(currentState.cpuHand);
        return {
          ...currentState,
          revealedTrait,
          traitToChoose: false,
          gamePhase: 'prediction',
          currentRound: null
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
      const round: PitRound = {
        revealedTrait,
        roundNumber: currentState.roundNumber,
        playerCard: currentState.playerHand[0], // Will be updated when player selects
        cpuCard: currentState.cpuHand[0], // Will be updated when CPU selects
        playerPrediction: 'higher', // Will be updated when player predicts
        cpuPrediction: 'higher', // Will be updated when CPU predicts
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

  static makePrediction(
    currentState: PitGameState,
    playerPrediction: Prediction
  ): PitGameState {
    if (!currentState.currentRound) {
      throw new Error('No current round to make prediction');
    }

    this.logDebug('Making prediction', { playerPrediction });

    // Generate CPU prediction
    const cpuPrediction = this.generateCPUPrediction(currentState.currentRound.revealedTrait);

    const updatedRound: PitRound = {
      ...currentState.currentRound,
      playerPrediction,
      cpuPrediction,
      gamePhase: 'card-selection'
    };

    return {
      ...currentState,
      currentRound: updatedRound,
      gamePhase: 'card-selection'
    };
  }

  static selectCard(
    currentState: PitGameState,
    playerCard: CardType
  ): PitGameState {
    if (!currentState.currentRound) {
      throw new Error('No current round to select card');
    }

    this.logDebug('Selecting card', { playerCard: playerCard.name });

    // Generate CPU card selection
    const cpuCard = this.generateCPUCardSelection(currentState.cpuHand, currentState.currentRound.revealedTrait);

    const updatedRound: PitRound = {
      ...currentState.currentRound,
      playerCard,
      cpuCard,
      gamePhase: 'reveal'
    };

    return {
      ...currentState,
      currentRound: updatedRound,
      gamePhase: 'reveal'
    };
  }

  static revealAndProcess(currentState: PitGameState): PitGameState {
    if (!currentState.currentRound) {
      throw new Error('No current round to reveal');
    }

    const round = { ...currentState.currentRound };
    const trait = round.revealedTrait;

    // Get the actual values
    const playerValue = round.playerCard[trait];
    const cpuValue = round.cpuCard[trait];

    // Check predictions
    const playerCorrect = this.checkPrediction(round.playerPrediction, playerValue, cpuValue);
    const cpuCorrect = this.checkPrediction(round.cpuPrediction, cpuValue, playerValue);

    // Determine outcomes
    const playerKeepsCard = playerCorrect;
    const cpuKeepsCard = cpuCorrect;

    // Cards that go to pit
    const cardsToPit: CardType[] = [];
    if (!playerKeepsCard) cardsToPit.push(round.playerCard);
    if (!cpuKeepsCard) cardsToPit.push(round.cpuCard);

    // Handle tiebreaker if both predictions are correct
    let finalPlayerKeepsCard = playerKeepsCard;
    let finalCpuKeepsCard = cpuKeepsCard;
    let finalCardsToPit = [...cardsToPit];

    if (playerCorrect && cpuCorrect) {
      // Tiebreaker: winner gets both cards
      if (playerValue > cpuValue) {
        finalPlayerKeepsCard = true;
        finalCpuKeepsCard = false;
        finalCardsToPit = [round.cpuCard];
      } else if (cpuValue > playerValue) {
        finalPlayerKeepsCard = false;
        finalCpuKeepsCard = true;
        finalCardsToPit = [round.playerCard];
      } else {
        // Perfect tie - both keep their cards
        finalPlayerKeepsCard = true;
        finalCpuKeepsCard = true;
        finalCardsToPit = [];
      }
    }

    const updatedRound: PitRound = {
      ...round,
      playerValue,
      cpuValue,
      playerCorrect,
      cpuCorrect,
      playerKeepsCard: finalPlayerKeepsCard,
      cpuKeepsCard: finalCpuKeepsCard,
      cardsToPit: finalCardsToPit,
      gamePhase: 'result'
    };

    this.logDebug('Round revealed', {
      trait,
      playerValue,
      cpuValue,
      playerCorrect,
      cpuCorrect,
      cardsToPit: finalCardsToPit.map(c => c.name)
    });

    return {
      ...currentState,
      currentRound: updatedRound,
      gamePhase: 'result'
    };
  }

  static processRoundResult(currentState: PitGameState): PitGameState {
    if (!currentState.currentRound) {
      throw new Error('No current round to process');
    }

    const round = currentState.currentRound;
    let newState = { ...currentState };

    // Update hands based on who keeps their cards
    if (!round.playerKeepsCard) {
      newState.playerHand = newState.playerHand.filter(card => card.id !== round.playerCard.id);
    }
    if (!round.cpuKeepsCard) {
      newState.cpuHand = newState.cpuHand.filter(card => card.id !== round.cpuCard.id);
    }

    // Add cards to pit
    newState.pit = [...newState.pit, ...round.cardsToPit];

    if (round.cardsToPit.length > 0) {
      // Shuffle the pit
      newState.pit = shuffleArray(newState.pit);
    }

    // Check victory conditions
    const victoryCondition = this.checkVictoryConditions(newState);
    if (victoryCondition) {
      newState.victoryCondition = victoryCondition;
      newState.isGameOver = true;
      newState.isGameStarted = false;
    } else {
      // Prepare for next round
      newState.roundNumber += 1;
      newState.currentTraitIndex = (newState.currentTraitIndex + 1) % newState.traitCycle.length;
      newState.traitChooser = newState.traitChooser === 'cpu' ? 'player' : 'cpu';
      newState.traitToChoose = true;
      newState.revealedTrait = undefined;
    }

    // Clear current round
    newState.currentRound = null;

    this.logDebug('Round processed', {
      playerHandSize: newState.playerHand.length,
      cpuHandSize: newState.cpuHand.length,
      pitSize: newState.pit.length,
      victoryCondition: newState.victoryCondition
    });

    return newState;
  }

  private static getTraitForRound(state: PitGameState): Trait {
    if (this.config.traitCycleMode === 'random') {
      const traits: Trait[] = ['speed', 'power', 'grip', 'weight'];
      return traits[Math.floor(Math.random() * traits.length)];
    } else {
      // Cycle through traits
      return state.traitCycle[state.currentTraitIndex];
    }
  }

  private static generateCPUPrediction(trait: Trait): Prediction {
    // Simple AI: randomly choose higher or lower
    return Math.random() > 0.5 ? 'higher' : 'lower';
  }

  private static generateCPUCardSelection(cpuHand: CardType[], trait: Trait): CardType {
    // Simple AI: choose the card with the highest value for the revealed trait
    let bestCard = cpuHand[0];
    let bestValue = bestCard[trait];

    for (const card of cpuHand) {
      if (card[trait] > bestValue) {
        bestValue = card[trait];
        bestCard = card;
      }
    }

    return bestCard;
  }

  private static checkPrediction(prediction: Prediction, ownValue: number, opponentValue: number): boolean {
    if (prediction === 'higher') {
      return ownValue > opponentValue;
    } else {
      return ownValue < opponentValue;
    }
  }

  private static checkVictoryConditions(state: PitGameState): VictoryCondition | null {
    // Card collection victory
    if (state.cpuHand.length === 0 && state.playerHand.length > 0) {
      return 'cardCollection';
    }

    // Survival victory (last player with cards)
    if (state.playerHand.length === 0 && state.cpuHand.length > 0) {
      return 'survival';
    }

    // Game over: both hands empty (all cards in pit)
    if (state.playerHand.length === 0 && state.cpuHand.length === 0) {
      return 'gameOver';
    }

    return null;
  }

  static getGameConfig(): PitGameConfig {
    return { ...this.config };
  }

  static updateGameConfig(newConfig: Partial<PitGameConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  // Player selects trait (when it's their turn)
  static selectPlayerTrait(currentState: PitGameState, trait: Trait): PitGameState {
    return {
      ...currentState,
      revealedTrait: trait,
      traitToChoose: false,
      gamePhase: 'prediction',
      currentRound: null
    };
  }

  // CPU chooses the trait that is best for its hand
  private static cpuChooseTrait(cpuHand: CardType[]): Trait {
    // Find the trait with the highest max value in CPU's hand
    const traits: Trait[] = ['speed', 'power', 'grip', 'weight'];
    let bestTrait: Trait = traits[0];
    let bestValue = -Infinity;
    for (const trait of traits) {
      const maxValue = Math.max(...cpuHand.map(card => card[trait]));
      if (maxValue > bestValue) {
        bestValue = maxValue;
        bestTrait = trait;
      }
    }
    return bestTrait;
  }
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
} 