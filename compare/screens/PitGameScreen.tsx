import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CardFactory, CardType } from '../data/cards';
import { PitGameService } from '../services/pitGameService';
import { PitGameState, Trait, Prediction, PitRound } from '../types/pitMode';


import PitGameOverOverlay from '../components/pit/PitGameOverOverlay';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons';

const TRAITS = [
  { key: 'speed', label: 'Speed' },
  { key: 'power', label: 'Power' },
  { key: 'grip', label: 'Grip' },
  { key: 'weight', label: 'Weight' },
];

const PitGameScreen: React.FC = () => {
  const [gameState, setGameState] = useState<PitGameState>(PitGameService.createInitialState());
  const [showGameOver, setShowGameOver] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [isTraitSelectionPending, setIsTraitSelectionPending] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = async () => {
    const gameCards = CardFactory.createCardSet(6);
    const playerCards = gameCards.slice(0, 3);
    const cpuCards = gameCards.slice(3, 6);
    let newGameState = PitGameService.createNewGame(playerCards, cpuCards);
    setShowGameOver(false);
    setSelectedPrediction(null);
    setSelectedCard(null);
    // If CPU is the trait chooser, pick trait and start round immediately
    if (newGameState.traitChooser === 'cpu') {
      newGameState = PitGameService.startNewRound(newGameState);
    }
    setGameState(newGameState);
  };

  // --- Layout Section Renderers ---



  // 2. Game Info Bar
  const renderInfoBar = () => (
    <View style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee', paddingVertical: 10, paddingHorizontal: 16 }}>
      <Text style={{ fontWeight: '700', fontSize: 18, marginBottom: 2 }}>Pit Mode</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontSize: 14, color: '#333' }}>Your Hand: <Text style={{ color: '#2ecc40', fontWeight: '700' }}>{gameState.playerHand.length} cards</Text></Text>
          <Text style={{ fontSize: 14, color: '#333' }}>CPU Hand: <Text style={{ color: '#ff4136', fontWeight: '700' }}>{gameState.cpuHand.length} cards</Text></Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 14, color: '#333' }}>Round {gameState.roundNumber}</Text>
          <Text style={{ fontSize: 14, color: '#333' }}>Pit: <Text style={{ color: '#ff9800', fontWeight: '700' }}>{gameState.pit.length} cards</Text></Text>
        </View>
      </View>
    </View>
  );

  // 3. Trait of the Round
  const renderTraitOfRound = () => {
    const trait = gameState.currentRound?.revealedTrait;
    if (!trait) return null;
    const traitMap = {
      speed: { label: 'SPEED', icon: '🚀' },
      power: { label: 'POWER', icon: '💪' },
      grip: { label: 'GRIP', icon: '🎯' },
      weight: { label: 'WEIGHT', icon: '⚖️' }
    };
    const t = traitMap[trait];
    return (
      <View style={{ borderBottomWidth: 1, borderColor: '#eee', paddingVertical: 12, alignItems: 'center', backgroundColor: '#fff' }}>
        <Text style={{ fontWeight: '600', fontSize: 16, color: '#222' }}>Current Trait: <Text style={{ fontWeight: '700', color: '#000' }}>{t.label}</Text></Text>
      </View>
    );
  };

  // 4. Prediction Phase
  const renderPredictionPhase = () => (
    <View style={{ padding: 20, alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 18, color: '#222' }}>What’s your prediction?</Text>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <TouchableOpacity
          onPress={() => setSelectedPrediction('higher')}
          style={{ flex: 1, backgroundColor: selectedPrediction === 'higher' ? '#222' : '#f5f5f5', borderRadius: 8, paddingVertical: 10, alignItems: 'center', marginRight: 6, borderWidth: 1, borderColor: selectedPrediction === 'higher' ? '#222' : '#ccc', minWidth: 90 }}>
          <Text style={{ fontWeight: '700', fontSize: 15, color: selectedPrediction === 'higher' ? '#fff' : '#222' }}>Higher</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedPrediction('lower')}
          style={{ flex: 1, backgroundColor: selectedPrediction === 'lower' ? '#222' : '#f5f5f5', borderRadius: 8, paddingVertical: 10, alignItems: 'center', marginLeft: 6, borderWidth: 1, borderColor: selectedPrediction === 'lower' ? '#222' : '#ccc', minWidth: 90 }}>
          <Text style={{ fontWeight: '700', fontSize: 15, color: selectedPrediction === 'lower' ? '#fff' : '#222' }}>Lower</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // 5. Hand Selection
  const renderHandSelection = () => (
    <View style={{ padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 10, color: '#222' }}>Your Hand</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', gap: 12 }} style={{ minHeight: 160 }}>
        {gameState.playerHand.map(card => (
          <TouchableOpacity
            key={card.id}
            onPress={() => setSelectedCard(card)}
            style={{ opacity: selectedCard?.id === card.id ? 1 : 0.7, transform: [{ scale: selectedCard?.id === card.id ? 1.05 : 1 }], marginRight: 8 }}>
            <Card card={card} large={false} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={{ color: '#888', fontSize: 13, marginTop: 8, textAlign: 'center' }}>Tap to choose a card to play</Text>
    </View>
  );

  const renderTraitReveal = () => {
    if (!gameState.revealedTrait || gameState.traitToChoose) return null;
    const who = gameState.traitChooser === 'cpu' ? 'CPU chose' : 'You chose';
    const traitLabel = gameState.revealedTrait.charAt(0).toUpperCase() + gameState.revealedTrait.slice(1);
    return (
      <View style={{ paddingVertical: 16, alignItems: 'center', backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' }}>
        <Text style={{ fontWeight: '600', fontSize: 16, color: '#111' }}>{who}: <Text style={{ fontWeight: '700', color: '#000' }}>{traitLabel}</Text></Text>
      </View>
    );
  };

  const renderBattleReveal = () => {
    const round = gameState.currentRound;
    if (!round || (gameState.gamePhase !== 'reveal' && gameState.gamePhase !== 'result')) return null;
    return (
      <View style={{ backgroundColor: '#fff', paddingVertical: 24, alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' }}>
        <Text style={{ fontWeight: '700', fontSize: 18, marginBottom: 18, color: '#111' }}>Card Comparison</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginBottom: 18 }}>
          <View style={{ alignItems: 'center', marginRight: 24 }}>
            <Card card={round.playerCard} large={false} />
            <Text style={{ fontWeight: '600', fontSize: 15, marginTop: 8 }}>You</Text>
            <Text style={{ fontSize: 14, color: '#111', marginTop: 2 }}>{round.revealedTrait.charAt(0).toUpperCase() + round.revealedTrait.slice(1)}: <Text style={{ fontWeight: '700' }}>{round.playerValue}</Text></Text>
          </View>
          <View style={{ alignItems: 'center', marginLeft: 24 }}>
            <Card card={round.cpuCard} large={false} />
            <Text style={{ fontWeight: '600', fontSize: 15, marginTop: 8 }}>CPU</Text>
            <Text style={{ fontSize: 14, color: '#111', marginTop: 2 }}>{round.revealedTrait.charAt(0).toUpperCase() + round.revealedTrait.slice(1)}: <Text style={{ fontWeight: '700' }}>{round.cpuValue}</Text></Text>
          </View>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: '600', fontSize: 15, color: '#111' }}>Result</Text>
          <Text style={{ fontSize: 14, color: round.playerCorrect ? '#111' : '#888', marginTop: 2 }}>Your prediction: <Text style={{ fontWeight: '700' }}>{round.playerCorrect ? 'Correct' : 'Wrong'}</Text></Text>
          <Text style={{ fontSize: 14, color: round.cpuCorrect ? '#111' : '#888', marginTop: 2 }}>CPU prediction: <Text style={{ fontWeight: '700' }}>{round.cpuCorrect ? 'Correct' : 'Wrong'}</Text></Text>
        </View>
        <View style={{ marginTop: 8 }}>
          {round.cardsToPit.length > 0 ? (
            <Text style={{ fontSize: 14, color: '#111' }}>To Pit: <Text style={{ fontWeight: '700' }}>{round.cardsToPit.map(c => c.name).join(', ')}</Text></Text>
          ) : (
            <Text style={{ fontSize: 14, color: '#111' }}>No cards to pit</Text>
          )}
        </View>
      </View>
    );
  };

  // 7. Main Action Button
  const renderMainActionButton = () => (
    <View style={{ padding: 20, backgroundColor: '#fff' }}>
      <TouchableOpacity
        disabled={!selectedPrediction || !selectedCard}
        onPress={handleSubmitPredictionAndCard}
        style={{ backgroundColor: (!selectedPrediction || !selectedCard) ? '#eee' : '#222', borderRadius: 8, paddingVertical: 18, alignItems: 'center', opacity: (!selectedPrediction || !selectedCard) ? 0.7 : 1 }}>
        <Text style={{ fontWeight: '700', fontSize: 16, color: (!selectedPrediction || !selectedCard) ? '#aaa' : '#fff' }}>
          Submit Prediction & Card
        </Text>
      </TouchableOpacity>
    </View>
  );

  // 8. Pit Preview
  const renderPitPreview = () => (
    <View style={{ backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee', padding: 16, alignItems: 'center' }}>
      <Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 2 }}>Pit Preview</Text>
      <Text style={{ fontSize: 14, color: '#ff9800', fontWeight: '700', marginBottom: 2 }}>Pit: {gameState.pit.length} cards</Text>
      <Text style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>Cards in the pit are lost forever</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', gap: 8 }} style={{ minHeight: 60 }}>
        {gameState.pit.length === 0 ? (
          <Text style={{ color: '#bbb', fontStyle: 'italic', fontSize: 13 }}>(No cards in pit)</Text>
        ) : (
          gameState.pit.map(card => (
            <Card key={card.id} card={card} />
          ))
        )}
      </ScrollView>
    </View>
  );


  // --- Main Action Handler ---
  function handleSubmitPredictionAndCard() {
    if (!selectedPrediction || !selectedCard || !gameState.currentRound || gameState.traitToChoose) return;
    // 1. Make prediction
    const afterPrediction = PitGameService.makePrediction(gameState, selectedPrediction);
    // 2. Select card
    const afterCard = PitGameService.selectCard(afterPrediction, selectedCard);
    // 3. Reveal and process
    setTimeout(() => {
      const revealedState = PitGameService.revealAndProcess(afterCard);
      setGameState(revealedState);
      setSelectedPrediction(null);
      setSelectedCard(null);
    }, 800);
    setGameState(afterCard);
  }

  // --- Main Render ---
  if (gameState.traitToChoose && gameState.traitChooser === 'player') {
    return (
      <View style={{ flex: 1, backgroundColor: '#fafafa', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <Text style={{ fontWeight: '700', fontSize: 20, marginBottom: 24, color: '#111' }}>Choose a trait for this round</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {TRAITS.map(trait => (
            <TouchableOpacity
              key={trait.key}
              style={{ backgroundColor: '#fff', borderWidth: 2, borderColor: '#111', borderRadius: 8, paddingVertical: 18, paddingHorizontal: 18, marginHorizontal: 6, minWidth: 80, alignItems: 'center' }}
              onPress={() => {
                const afterTrait = PitGameService.selectPlayerTrait(gameState, trait.key as Trait);
                const afterRound = PitGameService.startNewRound(afterTrait);
                setGameState(afterRound);
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
      {renderTraitReveal()}
      {renderBattleReveal()}
      {renderTraitOfRound()}
      {gameState.currentRound && !gameState.traitToChoose && gameState.gamePhase === 'card-selection' && renderHandSelection()}
      {gameState.currentRound && !gameState.traitToChoose && gameState.gamePhase === 'prediction' && renderPredictionPhase()}
      {gameState.currentRound && !gameState.traitToChoose && (gameState.gamePhase === 'prediction' || gameState.gamePhase === 'card-selection') && renderMainActionButton()}
      {renderPitPreview()}
      
      {showGameOver && (
        <PitGameOverOverlay
          playerScore={gameState.playerScore}
          cpuScore={gameState.cpuScore}
          victoryCondition={gameState.victoryCondition}
          onPlayAgain={initializeGame}
        />
      )}
    </View>
  );
};

export default PitGameScreen; 