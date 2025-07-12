import React, { useState } from 'react';
import { Dimensions, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { CardType } from '../data/cardFactory';
import FanCard from './cards/FanCard';
import ModalCard from './cards/ModalCard';

interface CardFanProps {
  cards: CardType[];
  onSelectCard?: (card: CardType, trait: 'speed' | 'power' | 'grip') => void;
}

// Adjusted constants for better card spacing with more cards
const CARD_OVERLAP = 60; // Reduced from 80 to allow more cards
const CARD_ROTATION = 4; // Reduced from 5 for a gentler curve
const MAX_FAN_WIDTH = Dimensions.get('window').width * 0.85; // 85% of screen width
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const CardFan = ({ cards, onSelectCard }: CardFanProps) => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  const handleSelectTrait = (trait: 'speed' | 'power' | 'grip') => {
    if (!selectedCard) {
      console.warn('❌ No card selected when trying to select trait');
      return;
    }
    
    console.log('🎴 [handleSelectTrait] Selected card:', `${selectedCard.name}(${selectedCard.id})`);
    console.log(`🎴 Selected trait: ${trait}`);
    
    onSelectCard?.(selectedCard, trait);
    setSelectedCard(null);
  };

  const handleCardSelect = (card: CardType) => {
    console.log(`🎴 [handleCardSelect] Selected card ${card.name}(${card.id})`);
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    console.log('🎴 [handleCloseModal] Closing modal, clearing selected card');
    setSelectedCard(null);
  };

  const renderFannedCards = () => {
    // Calculate the total width needed for all cards
    const totalWidth = cards.length * CARD_OVERLAP;
    
    // If total width exceeds MAX_FAN_WIDTH, adjust the overlap
    const adjustedOverlap = totalWidth > MAX_FAN_WIDTH 
      ? (MAX_FAN_WIDTH / cards.length)
      : CARD_OVERLAP;

    // Center the fan
    const fanWidth = cards.length * adjustedOverlap;
    const startX = (SCREEN_WIDTH - fanWidth) / 3;

    return cards.map((card, index) => {
      const offset = startX + (index * adjustedOverlap);
      const rotation = (index - (cards.length - 1) / 2) * CARD_ROTATION;
      
      const style = {
        position: 'absolute' as const,
        left: offset,
        transform: [{ rotate: `${rotation}deg` }],
        zIndex: index,
      };

      // Generate a unique key using both card ID and index
      const uniqueKey = `card-${card.id}-${index}`;

      return (
        <TouchableWithoutFeedback
          key={uniqueKey}
          onPress={() => handleCardSelect(card)}
        >
          <View style={style}>
            <FanCard 
              card={card}
              selectedAttribute={undefined}
              result={undefined}
            />
          </View>
        </TouchableWithoutFeedback>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.fanContainer}>
        {renderFannedCards()}
      </View>

      <Modal
        visible={selectedCard !== null}
        transparent
        animationType="none"
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {selectedCard && (
                  <ModalCard 
                    card={selectedCard}
                    onSelectTrait={handleSelectTrait}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 220, // Increased height to accommodate more cards
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fanContainer: {
    height: 200, // Increased height
    width: '100%',
    position: 'relative',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.95,
    maxHeight: SCREEN_HEIGHT * 0.9,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
}); 