import React, { useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut
} from 'react-native-reanimated';
import { CardType } from '../data/cards';
import BattleCard from './cards/BattleCard';
import FanCard from './cards/FanCard';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface CardFanProps {
  cards: CardType[];
  onSelectAttribute?: (attribute: 'speed' | 'power' | 'grip') => void;
}

const CARD_OVERLAP = 80; // Increased overlap for wider cards
const CARD_ROTATION = 5; // Degrees of rotation between cards
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const CardFan = ({ cards, onSelectAttribute }: CardFanProps) => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  const renderFannedCards = () => {
    return cards.map((card, index) => {
      const offset = index * CARD_OVERLAP;
      const rotation = (index - (cards.length - 1) / 2) * CARD_ROTATION;
      
      const style = {
        position: 'absolute' as const,
        left: offset,
        transform: [{ rotate: `${rotation}deg` }],
        zIndex: index,
      };

      return (
        <AnimatedTouchable
          key={card.id}
          style={[style]}
          entering={FadeIn.delay(index * 100)}
          exiting={FadeOut}
          onPress={() => setSelectedCard(card)}
        >
          <FanCard card={card} />
        </AnimatedTouchable>
      );
    });
  };

  const renderAttributeButtons = () => {
    const attributes: Array<'speed' | 'power' | 'grip'> = ['speed', 'power', 'grip'];
    
    return attributes.map((attr) => (
      <TouchableOpacity
        key={attr}
        style={styles.attributeButton}
        onPress={() => {
          onSelectAttribute?.(attr);
          setSelectedCard(null);
        }}
      >
        <Text style={styles.attributeButtonText}>
          {attr.charAt(0).toUpperCase() + attr.slice(1)}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={[styles.fanContainer, { marginLeft: SCREEN_WIDTH / 6 }]}>
        {renderFannedCards()}
      </View>

      <Modal
        visible={selectedCard !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedCard(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedCard(null)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              {selectedCard && (
                <>
                  <BattleCard card={selectedCard} />
                  <View style={styles.attributeButtons}>
                    {renderAttributeButtons()}
                  </View>
                </>
              )}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
  },
  fanContainer: {
    height: 180,
    marginLeft: SCREEN_WIDTH / 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.9,
    maxHeight: SCREEN_HEIGHT * 0.9,
  },
  attributeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    gap: 10,
  },
  attributeButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000000',
    flex: 1,
  },
  attributeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },
}); 