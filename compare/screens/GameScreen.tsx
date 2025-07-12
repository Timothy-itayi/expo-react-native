import React, { useEffect, useState } from 'react';
import {
  Pressable,
  Text,
  View
} from 'react-native';
import Animated, {
  FadeInDown
} from 'react-native-reanimated';
import { CardFan } from '../components/CardFan';
import BattleCard from '../components/cards/BattleCard';
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

  useEffect(() => {
    const initializeGame = async () => {
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

  const handleAttributeSelect = (attr: Attribute) => {
    const playerCard = gameState.playerHand[0];
    const cpuCard = gameState.cpuHand[0];

    const playerValue = playerCard[attr];
    const cpuValue = cpuCard[attr];

    let result: RoundResult['result'] = 'Draw';

    if (playerValue > cpuValue) result = 'Player';
    else if (cpuValue > playerValue) result = 'CPU';

    const roundResult = { playerCard, cpuCard, result, attribute: attr };
    
    // Record the round
    battleTracker.recordRound(roundResult);
    updateScore();

    setGameState(prevState => {
      const newState = { ...prevState };
      
      if (result === 'Player') {
        newState.playerWins = [...prevState.playerWins, playerCard, cpuCard];
      } else if (result === 'CPU') {
        newState.cpuWins = [...prevState.cpuWins, playerCard, cpuCard];
      }

      newState.playerHand = prevState.playerHand.slice(1);
      newState.cpuHand = prevState.cpuHand.slice(1);
      
      // Check if game is over
      if (newState.playerHand.length === 0) {
        return GameStateFactory.createGameOverState(newState);
      }
      
      return newState;
    });

    setCurrentRound(roundResult);
  };

  const handleGameOver = async () => {
    const battleResult = battleTracker.getBattleResult();
    const newRewards = await RewardManager.processBattleResult(battleResult);
    setRewards(newRewards);
    
    // Update total points
    const stats = RewardManager.getStats();
    setTotalPoints(stats.totalPoints);
  };

  // Watch for game over state changes
  useEffect(() => {
    if (gameState.isGameOver) {
      handleGameOver();
    }
  }, [gameState.isGameOver]);

  const resetGame = async () => {
    const newGameState = await GameStateFactory.createNewGame();
    setGameState(newGameState);
    setCurrentRound(null);
    setRewards([]);
    battleTracker.startNewBattle();
  };

  return (
    <View style={styles.container}>
      {/* Scoreboard */}
      <ScoreBoard 
        playerScore={gameState.score.player}
        cpuScore={gameState.score.cpu}
        totalPoints={totalPoints}
      />

      {/* Battle Section */}
      <View style={styles.battleSection}>
        <Text style={styles.battleTitle}>Battle Zone</Text>

        {currentRound && gameState.isGameStarted ? (
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

            {currentRound.result === 'Draw' && (
              <Text style={[styles.resultText, { color: '#000' }]}>
                It&apos;s a Draw!
              </Text>
            )}
          </>
        ) : gameState.isGameStarted ? (
          <Text style={styles.instructions}>
            Select a card and choose a trait to start the battle!
          </Text>
        ) : null}
      </View>

      {/* Player's Hand */}
      <View style={styles.playerSection}>
        <Text style={styles.sectionLabel}>Your Hand</Text>
        {gameState.isGameStarted && !gameState.isGameOver && (
          <CardFan 
            cards={gameState.playerHand}
            onSelectAttribute={handleAttributeSelect}
          />
        )}
      </View>

      {/* Game Over Overlay */}
      {gameState.isGameOver && (
        <View style={styles.battleOverlay}>
          <View style={styles.battleOverlayContent}>
            <Text style={styles.winnerText}>
              {gameState.score.player > gameState.score.cpu ? (
                'You Win!'
              ) : gameState.score.player < gameState.score.cpu ? (
                'CPU Wins!'
              ) : (
                "It's a Draw!"
              )}
            </Text>
            
            {/* Display Rewards */}
            {rewards.length > 0 && (
              <View style={styles.rewardsContainer}>
                <Text style={styles.rewardsTitle}>Rewards Earned:</Text>
                {rewards.map((reward, index) => (
                  <Text key={index} style={styles.rewardText}>
                    {reward.description}: +{reward.amount} points
                  </Text>
                ))}
              </View>
            )}

            <Pressable 
              style={({ pressed }) => [
                styles.playAgainButton,
                pressed && {
                  transform: [{ scale: 0.95 }],
                  backgroundColor: '#f5f5f5'
                }
              ]}
              onPress={resetGame}
            >
              <Text style={styles.playAgainText}>Play Again</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default GameScreen;
