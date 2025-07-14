import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CardFactory, CardType } from '../data/cards';
import { GambleGameService } from '../services/gamble-game-service';
import { GambleGameState, Trait, Prediction, GambleRound } from '../types/gambleMode';

import GambleGameOverOverlay from '../components/Gamble/GambleGameOverlay';
import BattleCard from '../components/cards/BattleCard';
import { CardFan } from '../components/CardFan';
import { GameScreenStyles as styles } from '../styles/GameScreen.styles';

const TRAITS = [
  { key: 'speed', label: 'Speed' },
  { key: 'power', label: 'Power' },
  { key: 'grip', label: 'Grip' },
  { key: 'weight', label: 'Weight' },
];

// ScoreBoard component matching GameScreen
const ScoreBoard = ({ 
  playerScore, 
  cpuScore,
  playerDeckSize,
  cpuDeckSize,
  roundNumber
}: { 
  playerScore: number; 
  cpuScore: number;
  playerDeckSize: number;
  cpuDeckSize: number;
  roundNumber: number;
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
        <Text style={styles.pointsText}>Round {roundNumber}</Text>
        <Text style={styles.pointsText}>Your Deck: {playerDeckSize} | CPU: {cpuDeckSize}</Text>
      </View>
    </Animated.View>
  );
};

const GambleGameScreen: React.FC = () => {
  const [gambleGame, setGambleGame] = useState<GambleGameState>(GambleGameService.createInitialState());
  const [showGameOver, setShowGameOver] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null);
  const [cardsFlipped, setCardsFlipped] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    setCardsFlipped(false);
    setSelectedPrediction(null);
  }, [gambleGame.roundNumber]);

  useEffect(() => {
    // Reset transition state when round changes
    if (gambleGame.gamePhase === 'prediction' && !gambleGame.traitToChoose) {
      setIsTransitioning(false);
    }
  }, [gambleGame.roundNumber, gambleGame.gamePhase]);

  const initializeGame = async () => {
    const gameCards = CardFactory.createCardSet(20); // Create a larger deck
    let newGameState = GambleGameService.createNewGame(gameCards);
    setShowGameOver(false);
    setSelectedPrediction(null);
    setCardsFlipped(false);
    setIsTransitioning(false);
    // Always start the first round!
    newGameState = GambleGameService.startNewRound(newGameState);
    setGambleGame(newGameState);
  };

  // Card placeholder for unrevealed cards
  const CardPlaceholder = () => (
    <View style={{
      width: 150,
      height: 210,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#bbb',
      backgroundColor: '#fafafa',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 8,
      marginVertical: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    }}>
      <Text style={{ fontSize: 40, color: '#bbb', fontWeight: 'bold' }}>?</Text>
    </View>
  );

  // --- Winner/Loser Helper ---
  // Removed getRoundWinner function - now focusing on prediction accuracy instead

  // Helper to get trait label
  const getTraitLabel = (trait: Trait) => {
    switch (trait) {
      case 'speed': return 'Speed';
      case 'power': return 'Power';
      case 'grip': return 'Grip';
      case 'weight': return 'Weight';
      default: return trait;
    }
  };

  // --- Battle Zone ---
  const renderBattleZone = () => {
    const round = gambleGame.currentRound;
    const phase = gambleGame.gamePhase;
    // Always render the battle zone with fixed height
    return (
      <View style={[styles.battleSection]}>
        <Text style={styles.battleTitle}>Battle Zone</Text>
        
        {/* Show trait above cards during prediction phase */}
        {phase === 'prediction' && round && (
          <View style={{ alignItems: 'center', marginBottom: 5 }}> {/* reduced from 16 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#0074d9', textAlign: 'center' }}>
              Trait: {getTraitLabel(round.revealedTrait)}
            </Text>
          </View>
        )}
        
        <View style={[styles.battleContent, { minHeight: 100 }]}> {/* reduced from 220 */}
          {/* Player Card or Placeholder */}
          <View style={{ alignItems: 'center' }}>
            {(phase === 'reveal' || phase === 'result') && round ? (
              <BattleCard
                card={round.playerCard}
                selectedAttribute={['reveal', 'result'].includes(phase) ? round.revealedTrait === 'weight' ? undefined : round.revealedTrait : undefined}
                result={
                  round.playerValue > round.cpuValue
                    ? 'win'
                    : round.playerValue < round.cpuValue
                    ? 'lose'
                    : 'draw'
                }
              />
            ) : (
              <CardPlaceholder />
            )}
            <Text style={styles.cardLabel}>Your Card</Text>
            {(phase === 'reveal' || phase === 'result') && round && (
              <Text style={styles.resultText}>
                {round.revealedTrait.charAt(0).toUpperCase() + round.revealedTrait.slice(1)}: {round.playerValue}
              </Text>
            )}
          </View>
          {/* CPU Card or Placeholder */}
          <View style={{ alignItems: 'center' }}>
            {(phase === 'reveal' || phase === 'result') && round ? (
              <BattleCard
                card={round.cpuCard}
                selectedAttribute={['reveal', 'result'].includes(phase) ? round.revealedTrait === 'weight' ? undefined : round.revealedTrait : undefined}
                result={
                  round.cpuValue > round.playerValue
                    ? 'win'
                    : round.cpuValue < round.playerValue
                    ? 'lose'
                    : 'draw'
                }
              />
            ) : (
              <CardPlaceholder />
            )}
            <Text style={styles.cardLabel}>Opponent's Card</Text>
            {(phase === 'reveal' || phase === 'result') && round && (
              <Text style={styles.resultText}>
                {round.revealedTrait.charAt(0).toUpperCase() + round.revealedTrait.slice(1)}: {round.cpuValue}
              </Text>
            )}
          </View>
        </View>
        {/* Controls in the battle zone */}
        <View style={{ width: '100%', alignItems: 'center', marginTop: 8 }}>
          {/* Trait selection phase */}
          {gambleGame.traitToChoose && gambleGame.traitChooser === 'player' && (
            <View style={styles.traitButtons}>
              {TRAITS.map(trait => (
                <TouchableOpacity
                  key={trait.key}
                  style={styles.traitButton}
                  onPress={() => {
                    const afterTrait = GambleGameService.selectPlayerTrait(gambleGame, trait.key as Trait);
                    setGambleGame(afterTrait);
                  }}
                >
                  <Text style={styles.traitButtonText}>{trait.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {/* Prediction phase */}
          {phase === 'prediction' && !gambleGame.traitToChoose && (
            <View style={styles.traitButtons}>
              <TouchableOpacity
                onPress={() => setSelectedPrediction('higher')}
                disabled={cardsFlipped}
                style={[
                  styles.traitButton,
                  selectedPrediction === 'higher' && { backgroundColor: '#333333' },
                  cardsFlipped && { opacity: 0.5 }
                ]}>
                <Text style={[
                  styles.traitButtonText,
                  selectedPrediction === 'higher' && { color: '#ffffff' }
                ]}>Higher</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedPrediction('lower')}
                disabled={cardsFlipped}
                style={[
                  styles.traitButton,
                  selectedPrediction === 'lower' && { backgroundColor: '#333333' },
                  cardsFlipped && { opacity: 0.5 }
                ]}>
                <Text style={[
                  styles.traitButtonText,
                  selectedPrediction === 'lower' && { color: '#ffffff' }
                ]}>Lower</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* Flip phase (after prediction) */}
          {phase === 'prediction' && selectedPrediction && (
            <View style={[styles.traitButtons, { marginTop: 8 }]}> 
              <TouchableOpacity
                onPress={handleFlipCards}
                disabled={!selectedPrediction || cardsFlipped}
                style={[
                  styles.traitButton,
                  { flex: 1, marginHorizontal: 20 },
                  (!selectedPrediction || cardsFlipped) && { opacity: 0.5 }
                ]}>
                <Text style={styles.traitButtonText}>Flip Cards</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* Result phase */}
          {(phase === 'reveal' || phase === 'result') && round && (
            <View style={styles.resultSection}>
              {/* Prediction Results - Focus on prediction accuracy */}
              <Text style={[
                styles.winnerText, 
                { 
                  color: round.playerCorrect ? '#2ecc40' : '#ff4136',
                  fontSize: 20,
                  fontWeight: 'bold'
                }
              ]}>
                Your prediction: {round.playerCorrect ? 'CORRECT! 🎉' : 'WRONG! ❌'}
              </Text>
              <Text style={[
                styles.winnerText, 
                { 
                  color: round.cpuCorrect ? '#2ecc40' : '#ff4136',
                  fontSize: 16
                }
              ]}>
                CPU prediction: {round.cpuCorrect ? 'Correct' : 'Wrong'}
              </Text>
              
              {/* Card comparison results */}
              <Text style={[styles.winnerText, { fontSize: 14, color: '#666666', marginTop: 8 }]}>
                {round.playerValue > round.cpuValue 
                  ? `Your ${getTraitLabel(round.revealedTrait)} (${round.playerValue}) was higher than CPU's (${round.cpuValue})`
                  : round.cpuValue > round.playerValue
                  ? `CPU's ${getTraitLabel(round.revealedTrait)} (${round.cpuValue}) was higher than yours (${round.playerValue})`
                  : `Both cards had the same ${getTraitLabel(round.revealedTrait)} value (${round.playerValue})`
                }
              </Text>
              
              {/* Transition indicator */}
              {isTransitioning && (
                <View style={{ 
                  marginTop: 16, 
                  padding: 12, 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#dee2e6'
                }}>
                  <Text style={{ 
                    fontSize: 16, 
                    color: '#495057', 
                    textAlign: 'center',
                    fontWeight: '500'
                  }}>
                    Preparing next round...
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  

  // --- Main Action Handlers ---
  function handleFlipCards() {
    if (!selectedPrediction || !gambleGame.currentRound || gambleGame.gamePhase !== 'prediction' || cardsFlipped) return;
    
    setCardsFlipped(true);
    
    // Step 1: Flip cards and reveal results
    const afterFlip = GambleGameService.flipCards(gambleGame, selectedPrediction);
    setGambleGame(afterFlip);
    
    // Step 2: Show results for 4 seconds, then process round
    setTimeout(() => {
      const processedState = GambleGameService.processRoundResult(afterFlip);
      setGambleGame(processedState);
      
      // Step 3: If game is over, show overlay
      if (processedState.isGameOver) {
        setShowGameOver(true);
        return;
      }
      
      // Step 4: Show transition indicator
      setIsTransitioning(true);
      
      // Step 5: Wait 2 more seconds before starting next round (total 6s for results)
      setTimeout(() => {
        const nextRound = GambleGameService.startNewRound(processedState);
        setGambleGame(nextRound);
        
        // Reset UI state smoothly
        setCardsFlipped(false);
        setSelectedPrediction(null);
        setIsTransitioning(false);
      }, 2000);
      
    }, 4000); // Show results for 4 seconds
  }

  // --- Main Render ---
  return (
    <View style={[styles.container, { position: 'relative' }]}>
      {/* Scoreboard */}
      <ScoreBoard 
        playerScore={gambleGame.playerScore}
        cpuScore={gambleGame.cpuScore}
        playerDeckSize={gambleGame.playerDeck.length}
        cpuDeckSize={gambleGame.cpuDeck.length}
        roundNumber={gambleGame.roundNumber}
      />

      {/* Battle Zone (always present, stable height) */}
      {renderBattleZone()}

      

      {/* Game Over Overlay */}
      {showGameOver && (
        <GambleGameOverOverlay
          playerScore={gambleGame.playerScore}
          cpuScore={gambleGame.cpuScore}
          victoryCondition={gambleGame.victoryCondition}
          onPlayAgain={initializeGame}
        />
      )}
    </View>
  );
};

export default GambleGameScreen; 