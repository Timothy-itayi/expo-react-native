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
import { CardFactory, CardManager, CardType } from '../data/cards';
import { BattleTracker } from '../data/game/battleTracker';
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
  const [deck, setDeck] = useState<CardType[]>([]);
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [cpuHand, setCpuHand] = useState<CardType[]>([]);
  const [playerWins, setPlayerWins] = useState<CardType[]>([]);
  const [cpuWins, setCpuWins] = useState<CardType[]>([]);
  const [currentRound, setCurrentRound] = useState<RoundResult | null>(null);
  const [battleTracker] = useState(() => new BattleTracker());
  const [rewards, setRewards] = useState<BattleReward[]>([]);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState({ player: 0, cpu: 0 });

  const isGameOver = playerHand.length === 0;

  useEffect(() => {
    const initializeGame = async () => {
      // Initialize reward manager
      await RewardManager.initialize();
      const stats = RewardManager.getStats();
      setTotalPoints(stats.totalPoints);
      
      // Force reset card storage and regenerate cards
      await CardManager.forceReset();
      
      // Get 6 unique cards (3 for player, 3 for CPU)
      const gameCards = CardFactory.createCardSet(6);
      console.log('🎮 Initializing game with unique cards:', 
        gameCards.map(card => `${card.name}(${card.id})`).join(', ')
      );
      
      setDeck(gameCards);
      setPlayerHand(gameCards.slice(0, 3));
      setCpuHand(gameCards.slice(3, 6));
      setPlayerWins([]);
      setCpuWins([]);
      setCurrentRound(null);
      setRewards([]);
      setCurrentScore({ player: 0, cpu: 0 });
      
      // Start new battle tracking
      battleTracker.startNewBattle();
    };

    initializeGame();
  }, []);

  const updateScore = () => {
    const state = battleTracker.getCurrentState();
    setCurrentScore({
      player: state.cpuCardLosses, // When CPU loses, player wins
      cpu: state.playerCardLosses  // When player loses, CPU wins
    });
    console.log('📊 Score updated:', {
      player: state.cpuCardLosses,
      cpu: state.playerCardLosses
    });
  };

  const handleAttributeSelect = (attr: Attribute) => {
    const playerCard = playerHand[0];
    const cpuCard = cpuHand[0];

    const playerValue = playerCard[attr];
    const cpuValue = cpuCard[attr];

    let result: RoundResult['result'] = 'Draw';

    if (playerValue > cpuValue) result = 'Player';
    else if (cpuValue > playerValue) result = 'CPU';

    const roundResult = { playerCard, cpuCard, result, attribute: attr };
    
    // Record the round
    battleTracker.recordRound(roundResult);
    updateScore(); // Update score after recording the round

    if (result === 'Player') {
      setPlayerWins([...playerWins, playerCard, cpuCard]);
    } else if (result === 'CPU') {
      setCpuWins([...cpuWins, playerCard, cpuCard]);
    }

    setPlayerHand(playerHand.slice(1));
    setCpuHand(cpuHand.slice(1));
    setCurrentRound(roundResult);

    // Check if game is over after this move
    if (playerHand.length <= 1) {
      handleGameOver();
    }
  };

  const handleGameOver = async () => {
    const battleResult = battleTracker.getBattleResult();
    const newRewards = await RewardManager.processBattleResult(battleResult);
    setRewards(newRewards);
    
    // Update total points
    const stats = RewardManager.getStats();
    setTotalPoints(stats.totalPoints);
    
    // Reset tracker for next game
    battleTracker.startNewBattle();
  };

  const resetGame = async () => {
    // Get 6 new unique cards
    const newGameCards = CardFactory.createCardSet(6);
    console.log('🔄 Resetting game with new unique cards:', 
      newGameCards.map(card => `${card.name}(${card.id})`).join(', ')
    );
    
    setDeck(newGameCards);
    setPlayerHand(newGameCards.slice(0, 3));
    setCpuHand(newGameCards.slice(3, 6));
    setPlayerWins([]);
    setCpuWins([]);
    setCurrentRound(null);
    setRewards([]);
    setCurrentScore({ player: 0, cpu: 0 });
    
    // Start new battle tracking
    battleTracker.startNewBattle();
  };

  return (
    <View style={styles.container}>
      {/* Scoreboard */}
      <ScoreBoard 
        playerScore={currentScore.player}
        cpuScore={currentScore.cpu}
        totalPoints={totalPoints}
      />

      {/* Rest of the component remains the same */}
      <View style={styles.battleSection}>
        <Text style={styles.battleTitle}>Battle Zone</Text>

        {currentRound ? (
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
        ) : (
          <Text style={styles.instructions}>
            Select a card and choose a trait to start the battle!
          </Text>
        )}
      </View>

      {/* Player's Hand */}
      <View style={styles.playerSection}>
        <Text style={styles.sectionLabel}>Your Hand</Text>
        {!isGameOver && (
          <CardFan 
            cards={playerHand}
            onSelectAttribute={handleAttributeSelect}
          />
        )}
      </View>

      {/* Game Over Overlay */}
      {isGameOver && (
        <View style={styles.battleOverlay}>
          <View style={styles.battleOverlayContent}>
            <Text style={styles.winnerText}>
              {currentScore.player > currentScore.cpu ? (
                'You Win!'
              ) : currentScore.player < currentScore.cpu ? (
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
