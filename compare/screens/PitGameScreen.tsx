import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CardFactory, CardType } from '../data/cards';
import { PitGameService } from '../services/pitGameService';
import { PitGameState, Trait, Prediction, PitRound } from '../types/pitMode';
import { advanceToPredictionIfCpuChooser } from '../services/pitGameService';

import PitGameOverOverlay from '../components/pit/PitGameOverOverlay';
import Card from '../components/Card';

const TRAITS = [
  { key: 'speed', label: 'Speed' },
  { key: 'power', label: 'Power' },
  { key: 'grip', label: 'Grip' },
  { key: 'weight', label: 'Weight' },
];

const PitGameScreen: React.FC = () => {
  const [pitGame, setPitGame] = useState<PitGameState>(PitGameService.createInitialState());
  const [showGameOver, setShowGameOver] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null);
  const [cardsFlipped, setCardsFlipped] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    setCardsFlipped(false);
    setSelectedPrediction(null);
  }, [pitGame.roundNumber]);

  const initializeGame = async () => {
    const gameCards = CardFactory.createCardSet(20); // Create a larger deck
    let newGameState = PitGameService.createNewGame(gameCards);
    setShowGameOver(false);
    setSelectedPrediction(null);
    setCardsFlipped(false);
    if (newGameState.traitChooser === 'cpu') {
      newGameState = PitGameService.startNewRound(newGameState);
      newGameState = advanceToPredictionIfCpuChooser(newGameState);
    }
    setPitGame(newGameState);
  };

  // 1. Game Info Bar
  const renderInfoBar = () => (
    <View style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee', paddingVertical: 10, paddingHorizontal: 16 }}>
      <Text style={{ fontWeight: '700', fontSize: 18, marginBottom: 2 }}>Pit Mode</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontSize: 14, color: '#333' }}>Player Score: <Text style={{ color: '#2ecc40', fontWeight: '700' }}>{pitGame.playerScore}</Text></Text>
          <Text style={{ fontSize: 14, color: '#333' }}>CPU Score: <Text style={{ color: '#ff4136', fontWeight: '700' }}>{pitGame.cpuScore}</Text></Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 14, color: '#333' }}>Round {pitGame.roundNumber}</Text>
          <Text style={{ fontSize: 14, color: '#333' }}>Your Deck: <Text style={{ color: '#0074d9', fontWeight: '700' }}>{pitGame.playerDeck.length} cards</Text></Text>
          <Text style={{ fontSize: 14, color: '#333' }}>CPU Deck: <Text style={{ color: '#ff4136', fontWeight: '700' }}>{pitGame.cpuDeck.length} cards</Text></Text>
        </View>
      </View>
    </View>
  );

  // 2. Prediction Phase
  const renderPredictionPhase = () => (
    <View style={{ padding: 20, alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 18, color: '#222' }}>
        Will your card's {pitGame.currentRound?.revealedTrait?.toUpperCase()} value be higher or lower than your opponent's?
      </Text>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <TouchableOpacity
          onPress={() => setSelectedPrediction('higher')}
          disabled={cardsFlipped}
          style={{ 
            flex: 1, 
            backgroundColor: selectedPrediction === 'higher' ? '#222' : '#f5f5f5', 
            borderRadius: 8, 
            paddingVertical: 10, 
            alignItems: 'center', 
            marginRight: 6, 
            borderWidth: 1, 
            borderColor: selectedPrediction === 'higher' ? '#222' : '#ccc', 
            minWidth: 90,
            opacity: cardsFlipped ? 0.5 : 1
          }}>
          <Text style={{ fontWeight: '700', fontSize: 15, color: selectedPrediction === 'higher' ? '#fff' : '#222' }}>Higher</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedPrediction('lower')}
          disabled={cardsFlipped}
          style={{ 
            flex: 1, 
            backgroundColor: selectedPrediction === 'lower' ? '#222' : '#f5f5f5', 
            borderRadius: 8, 
            paddingVertical: 10, 
            alignItems: 'center', 
            marginLeft: 6, 
            borderWidth: 1, 
            borderColor: selectedPrediction === 'lower' ? '#222' : '#ccc', 
            minWidth: 90,
            opacity: cardsFlipped ? 0.5 : 1
          }}>
          <Text style={{ fontWeight: '700', fontSize: 15, color: selectedPrediction === 'lower' ? '#fff' : '#222' }}>Lower</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // 3. Card Flip Phase (now handles prediction and reveal)
  const renderCardFlipPhase = () => (
    <View style={{ padding: 20, alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 18, color: '#222' }}>Ready to flip cards?</Text>
      <Text style={{ fontSize: 14, color: '#666', marginBottom: 20, textAlign: 'center' }}>
        Both players will flip the top card from their deck
      </Text>
      <TouchableOpacity
        onPress={handleFlipCards}
        disabled={!selectedPrediction || cardsFlipped}
        style={{ 
          backgroundColor: (!selectedPrediction || cardsFlipped) ? '#eee' : '#0074d9', 
          borderRadius: 8, 
          paddingVertical: 15, 
          paddingHorizontal: 30, 
          alignItems: 'center',
          opacity: (!selectedPrediction || cardsFlipped) ? 0.7 : 1
        }}>
        <Text style={{ fontWeight: '700', fontSize: 16, color: (!selectedPrediction || cardsFlipped) ? '#aaa' : '#fff' }}>Flip Cards</Text>
      </TouchableOpacity>
    </View>
  );

  // 4. Battle Reveal (highlight trait)
  const renderBattleReveal = () => {
    const round = pitGame.currentRound;
    if (!round || (pitGame.gamePhase !== 'reveal' && pitGame.gamePhase !== 'result')) return null;
    const highlightStyle = { fontWeight: 'bold', color: '#0074d9', textDecorationLine: 'underline' };
    return (
      <View style={{ backgroundColor: '#fff', paddingVertical: 24, alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' }}>
        <Text style={{ fontWeight: '700', fontSize: 18, marginBottom: 18, color: '#111' }}>Card Comparison</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginBottom: 18 }}>
          <View style={{ alignItems: 'center', marginRight: 24 }}>
            <Card card={round.playerCard} large={false} highlightTrait={round.revealedTrait} />
            <Text style={{ fontWeight: '600', fontSize: 15, marginTop: 8 }}>You</Text>
            <Text style={{ fontSize: 14, color: '#111', marginTop: 2 }}>
              {round.revealedTrait.charAt(0).toUpperCase() + round.revealedTrait.slice(1)}: <Text style={highlightStyle}>{round.playerValue}</Text>
            </Text>
          </View>
          <View style={{ alignItems: 'center', marginLeft: 24 }}>
            <Card card={round.cpuCard} large={false} highlightTrait={round.revealedTrait} />
            <Text style={{ fontWeight: '600', fontSize: 15, marginTop: 8 }}>CPU</Text>
            <Text style={{ fontSize: 14, color: '#111', marginTop: 2 }}>
              {round.revealedTrait.charAt(0).toUpperCase() + round.revealedTrait.slice(1)}: <Text style={highlightStyle}>{round.cpuValue}</Text>
            </Text>
          </View>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: '600', fontSize: 15, color: '#111' }}>Result</Text>
          <Text style={{ fontSize: 14, color: round.playerCorrect ? '#2ecc40' : '#ff4136', marginTop: 2 }}>
            Your prediction: <Text style={{ fontWeight: '700' }}>{round.playerCorrect ? 'Correct' : 'Wrong'}</Text>
          </Text>
          <Text style={{ fontSize: 14, color: round.cpuCorrect ? '#2ecc40' : '#ff4136', marginTop: 2 }}>
            CPU prediction: <Text style={{ fontWeight: '700' }}>{round.cpuCorrect ? 'Correct' : 'Wrong'}</Text>
          </Text>
        </View>
        <View style={{ marginTop: 8 }}>
          {round.cardsToPit.length > 0 ? (
            <Text style={{ fontSize: 14, color: '#ff9800' }}>To Pit: <Text style={{ fontWeight: '700' }}>{round.cardsToPit.map(c => c.name).join(', ')}</Text></Text>
          ) : (
            <Text style={{ fontSize: 14, color: '#2ecc40' }}>No cards to pit</Text>
          )}
        </View>
      </View>
    );
  };

  // 5. Pit Preview
  const renderPitPreview = () => (
    <View style={{ backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee', padding: 16, alignItems: 'center' }}>
      <Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 2 }}>Pit Preview</Text>
      <Text style={{ fontSize: 14, color: '#ff9800', fontWeight: '700', marginBottom: 2 }}>Pit: {pitGame.pit.length} cards</Text>
      <Text style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>Cards in the pit are lost forever</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', gap: 8 }} style={{ minHeight: 60 }}>
        {pitGame.pit.length === 0 ? (
          <Text style={{ color: '#bbb', fontStyle: 'italic', fontSize: 13 }}>(No cards in pit)</Text>
        ) : (
          pitGame.pit.map(card => (
            <Card key={card.id} card={card} />
          ))
        )}
      </ScrollView>
    </View>
  );

  // --- Main Action Handlers ---
  function handleFlipCards() {
    if (!selectedPrediction || !pitGame.currentRound || pitGame.gamePhase !== 'prediction' || cardsFlipped) return;
    setCardsFlipped(true);
    // Flip cards, lock prediction, and reveal
    const afterFlip = PitGameService.flipCards(pitGame, selectedPrediction);
    setPitGame(afterFlip);
    setTimeout(() => {
      const processedState = PitGameService.processRoundResult(afterFlip);
      const nextRound = advanceToPredictionIfCpuChooser(PitGameService.startNewRound(processedState));
      setPitGame(nextRound);
      if (nextRound.isGameOver) {
        setShowGameOver(true);
      }
    }, 2000);
  }

  // --- Main Render ---
  if (pitGame.traitToChoose && pitGame.traitChooser === 'player') {
    return (
      <View style={{ flex: 1, backgroundColor: '#fafafa', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <Text style={{ fontWeight: '700', fontSize: 20, marginBottom: 24, color: '#111' }}>Choose a trait for this round</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {TRAITS.map(trait => (
            <TouchableOpacity
              key={trait.key}
              style={{ 
                backgroundColor: '#fff', 
                borderWidth: 2, 
                borderColor: '#111', 
                borderRadius: 8, 
                paddingVertical: 18, 
                paddingHorizontal: 18, 
                marginHorizontal: 6, 
                minWidth: 80, 
                alignItems: 'center' 
              }}
              onPress={() => {
                const afterTrait = PitGameService.selectPlayerTrait(pitGame, trait.key as Trait);
                const afterRound = advanceToPredictionIfCpuChooser(PitGameService.startNewRound(afterTrait));
                setPitGame(afterRound);
              }}
            >
              <Text style={{ fontWeight: '700', fontSize: 16, color: '#111' }}>{trait.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
      {renderInfoBar()}
      {/* No current trait display */}
      {renderPredictionPhase()}
      {renderCardFlipPhase()}
      {renderBattleReveal()}
      {renderPitPreview()}
      {showGameOver && (
        <PitGameOverOverlay
          playerScore={pitGame.playerScore}
          cpuScore={pitGame.cpuScore}
          victoryCondition={pitGame.victoryCondition}
          onPlayAgain={initializeGame}
        />
      )}
    </View>
  );
};

export default PitGameScreen; 