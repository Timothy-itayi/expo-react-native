import React, { useEffect, useState } from 'react';
import {
  Text,
  View
} from 'react-native';
import Animated, {
  FadeInDown
} from 'react-native-reanimated';
import { CardFan } from '../components/CardFan';
import BattleCard from '../components/cards/BattleCard';
import GameOverOverlay from '../components/GameOverOverlay';
import { CardType } from '../data/cards';
import { BattleTracker } from '../data/game/battleTracker';
import { GameState, GameStateFactory } from '../data/game/gameStateFactory';
import { RewardManager } from '../data/rewards/rewardManager';
import { GameScreenStyles as styles } from "../styles/GameScreen.styles";
import { BattleReward } from '../types/rewards';

type Attribute = 'speed' | 'power' | 'grip';

interface RoundResult {
  playerCard: CardType;
  cpuCard: CardType;
  result: 'Player' | 'CPU' | 'Draw';
  attribute: Attribute;
}

const ScoreBoard = ({ 
  playerScore, 
  cpuScore,
  totalPoints
}: { 
  playerScore: number; 
  cpuScore: number;
  totalPoints: number;
}) => {
  return (
    <Animated.View 
      entering={FadeInDown.springify()}
      style={styles.scoreBoard}
    >
      <View style={styles.scoreRow}>
        <View style={styles.scoreItem}>
          <Text style={styles.playerName}>You</Text>
          <Text style={styles.scoreValue}>{playerScore}</Text>
        </View>
        <Text style={styles.scoreDivider}>vs</Text>
        <View style={styles.scoreItem}>
          <Text style={styles.playerName}>CPU</Text>
          <Text style={styles.scoreValue}>{cpuScore}</Text>
        </View>
      </View>
      <Text style={styles.pointsText}>Total Points: {totalPoints}</Text>
    </Animated.View>
  );
};

const GameScreen = () => {
  const [gameState, setGameState] = useState<GameState>(GameStateFactory.createInitialState());
  const [currentRound, setCurrentRound] = useState<RoundResult | null>(null);
  const [battleTracker] = useState(() => new BattleTracker());
  const [rewards, setRewards] = useState<BattleReward[]>([]);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [showGameOver, setShowGameOver] = useState(false);
  const [isTransitioningToGameOver, setIsTransitioningToGameOver] = useState(false);

  useEffect(() => {
    const initializeGame = async () => {
      setShowGameOver(false);
      setIsTransitioningToGameOver(false);
      
      // Reset points when entering the screen
      await GameStateFactory.resetPoints();
      
      // Initialize reward manager
      await RewardManager.initialize();
      const stats = RewardManager.getStats();
      setTotalPoints(stats.totalPoints);
      
      // Create new game state
      const newGameState = await GameStateFactory.createNewGame();
      setGameState(newGameState);
      
      // Start new battle tracking
      battleTracker.startNewBattle();
    };

    initializeGame();

    // Cleanup when component unmounts
    return () => {
      // gameAudio.cleanup(); // Removed audio cleanup
    };
  }, []);

  const updateScore = () => {
    const state = battleTracker.getCurrentState();
    setGameState(prevState => ({
      ...prevState,
      score: {
        player: state.cpuCardLosses,
        cpu: state.playerCardLosses
      }
    }));
  };

  const handleCardSelect = (selectedCard: CardType, attr: Attribute) => {
    console.log('🎮 [handleCardSelect] Selected card:', `${selectedCard.name}(${selectedCard.id})`);
    console.log('🎮 Selected attribute:', attr);
    
    const cpuCard = gameState.cpuHand[0];
    console.log('🎮 CPU card:', `${cpuCard.name}(${cpuCard.id})`);

    const playerValue = selectedCard[attr];
    const cpuValue = cpuCard[attr];

    let result: RoundResult['result'] = 'Draw';

    if (playerValue > cpuValue) result = 'Player';
    else if (cpuValue > playerValue) result = 'CPU';

    console.log(`🎮 Battle result: ${result} (${selectedCard.name}: ${playerValue} vs ${cpuCard.name}: ${cpuValue})`);

    const roundResult = { playerCard: selectedCard, cpuCard, result, attribute: attr };
    
    // Record the round
    battleTracker.recordRound(roundResult);
    updateScore();

    setGameState(prevState => {
      const newState = { ...prevState };
      
      if (result === 'Player') {
        newState.playerWins = [...prevState.playerWins, selectedCard, cpuCard];
      } else if (result === 'CPU') {
        newState.cpuWins = [...prevState.cpuWins, selectedCard, cpuCard];
      }

      // Remove the selected card and CPU's card
      newState.playerHand = prevState.playerHand.filter(card => card.id !== selectedCard.id);
      newState.cpuHand = prevState.cpuHand.slice(1);
      
      console.log('🎮 Remaining player hand:', newState.playerHand.map(card => `${card.name}(${card.id})`));
      console.log('🎮 Remaining CPU hand:', newState.cpuHand.map(card => `${card.name}(${card.id})`));
      
      // Check if game is over
      if (newState.playerHand.length === 0) {
        console.log('🎮 Game over - no cards remaining');
        setIsTransitioningToGameOver(true);
        // Mark the game as over but don't show overlay yet
        setTimeout(() => {
          setGameState(currentState => GameStateFactory.createGameOverState(currentState));
        }, 200);
        return newState;
      }
      
      return newState;
    });

    setCurrentRound(roundResult);
  };

  const handleReorderCards = (newCards: CardType[]) => {
    console.log('🎮 [handleReorderCards] Reordering cards:', newCards.map(card => `${card.name}(${card.id})`));
    setGameState(prevState => {
      const newState = {
        ...prevState,
        playerHand: newCards
      };
      console.log('🎮 [handleReorderCards] New state:', {
        player: newState.playerHand.map(card => `${card.name}(${card.id})`)
      });
      return newState;
    });
  };

  const handleGameOver = async () => {
    const battleResult = battleTracker.getBattleResult();
    const newRewards = await RewardManager.processBattleResult(battleResult);
    setRewards(newRewards);
    
    // Update total points
    const stats = RewardManager.getStats();
    setTotalPoints(stats.totalPoints);
    
    // Show the overlay after processing rewards
    setTimeout(() => {
      setShowGameOver(true);
    }, 500);
  };

  // Watch for game over state changes
  useEffect(() => {
    if (gameState.isGameOver) {
      console.log('🎮 [GameOver] Handling game over state');
      handleGameOver();
    }
  }, [gameState.isGameOver]);

  const resetGame = async () => {
    console.log('🎮 [resetGame] Starting new game');
    setShowGameOver(false);
    setIsTransitioningToGameOver(false);
    const newGameState = await GameStateFactory.createNewGame();
    console.log('🎮 [resetGame] New game cards:', {
      player: newGameState.playerHand.map(card => `${card.name}(${card.id})`),
      cpu: newGameState.cpuHand.map(card => `${card.name}(${card.id})`)
    });
    setGameState(newGameState);
    setCurrentRound(null);
    setRewards([]);
    battleTracker.startNewBattle();

    // Switch back to gameplay music
    // try {
    //   await gameAudio.play(); // Removed audio play
    // } catch (error: unknown) {
    //   console.error('Failed to play gameplay music:', error);
    // }
  };

  // Add debug logging for initial game state
  useEffect(() => {
    console.log('🎮 [GameState] Current state:', {
      player: gameState.playerHand.map(card => `${card.name}(${card.id})`),
      cpu: gameState.cpuHand.map(card => `${card.name}(${card.id})`),
      isGameStarted: gameState.isGameStarted,
      isGameOver: gameState.isGameOver
    });
  }, [gameState]);

  return (
    <View style={[styles.container, { position: 'relative' }]}>
      {/* Scoreboard */}
      <ScoreBoard 
        playerScore={gameState.score.player}
        cpuScore={gameState.score.cpu}
        totalPoints={totalPoints}
      />

      {/* Battle Section */}
      <View style={[styles.battleSection, { zIndex: 1 }]}>
        <Text style={styles.battleTitle}>Battle Zone</Text>

        {currentRound && (gameState.isGameStarted || isTransitioningToGameOver) ? (
          <>
            <View style={styles.battleContent}>
              {/* Player Card */}
              <View style={{ alignItems: 'center' }}>
                <BattleCard
                  card={currentRound.playerCard}
                  selectedAttribute={currentRound.attribute}
                  result={
                    currentRound.playerCard[currentRound.attribute] >
                    currentRound.cpuCard[currentRound.attribute]
                      ? 'win'
                      : currentRound.playerCard[currentRound.attribute] <
                        currentRound.cpuCard[currentRound.attribute]
                      ? 'lose'
                      : 'draw'
                  }
                />
                <Text style={styles.cardLabel}>Your Card</Text>
              </View>

              {/* CPU Card */}
              <View style={{ alignItems: 'center' }}>
                <BattleCard
                  card={currentRound.cpuCard}
                  selectedAttribute={currentRound.attribute}
                  result={
                    currentRound.cpuCard[currentRound.attribute] >
                    currentRound.playerCard[currentRound.attribute]
                      ? 'win'
                      : currentRound.cpuCard[currentRound.attribute] <
                        currentRound.playerCard[currentRound.attribute]
                      ? 'lose'
                      : 'draw'
                  }
                />
                <Text style={styles.cardLabel}>Opponent's Card</Text>
              </View>
            </View>
          </>
        ) : gameState.isGameStarted && !isTransitioningToGameOver ? (
          <Text style={styles.instructions}>
            Select a card and choose a trait to start the battle!
          </Text>
        ) : null}
      </View>

      {/* Player's Hand */}
      <View style={[styles.playerSection, { zIndex: 1 }]}>
        <Text style={styles.sectionLabel}>Your Hand</Text>
        {gameState.isGameStarted && !gameState.isGameOver && !isTransitioningToGameOver && (
          <CardFan 
            cards={gameState.playerHand}
            onSelectCard={handleCardSelect}
          />
        )}
      </View>

      {/* Game Over Overlay */}
      {showGameOver && gameState.isGameOver && (
        <GameOverOverlay
          playerScore={gameState.score.player}
          cpuScore={gameState.score.cpu}
          rewards={rewards}
          onPlayAgain={resetGame}
        />
      )}
    </View>
  );
};

export default GameScreen;
