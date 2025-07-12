import React, { useState } from 'react';
import { Dimensions, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { CardType } from '../data/cardFactory';
import FanCard from './cards/FanCard';
import ModalCard from './cards/ModalCard';

interface CardFanProps {
  cards: CardType[];
  onSelectAttribute?: (trait: 'speed' | 'power' | 'grip') => void;
}

const CARD_OVERLAP = 80;
const CARD_ROTATION = 5;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const CardFan = ({ cards, onSelectAttribute }: CardFanProps) => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  const handleSelectTrait = (trait: 'speed' | 'power' | 'grip') => {
    onSelectAttribute?.(trait);
    setSelectedCard(null);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const renderFannedCards = () => {
    const centerX = SCREEN_WIDTH / 2;
    const fanWidth = cards.length * CARD_OVERLAP;
    const startX = centerX - (fanWidth / 2);

    return cards.map((card, index) => {
      const offset = startX + (index * CARD_OVERLAP);
      const rotation = (index - (cards.length - 1) / 2) * CARD_ROTATION;
      
      const style = {
        position: 'absolute' as const,
        left: offset,
        transform: [{ rotate: `${rotation}deg` }],
        zIndex: index,
      };

      return (
        <TouchableWithoutFeedback
          key={card.id}
          onPress={() => setSelectedCard(card)}
        >
          <View style={style}>
            <FanCard card={card} />
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
    height: 200,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fanContainer: {
    height: 180,
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