import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideOutDown,
} from 'react-native-reanimated';
import { CardType } from '../data/cards';
import FanCard from './cards/FanCard';
import ModalCard from './cards/ModalCard';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface CardFanProps {
  cards: CardType[];
  onSelectAttribute?: (attribute: 'speed' | 'power' | 'grip') => void;
}

const CARD_OVERLAP = 80;
const CARD_ROTATION = 5;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const CardFan = ({ cards, onSelectAttribute }: CardFanProps) => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      try {
        const imagePromises = cards.map((card) => {
          return Image.prefetch(Image.resolveAssetSource(card.image).uri);
        });
        await Promise.all(imagePromises);
        setImagesPreloaded(true);
      } catch (error) {
        console.warn('Error preloading images:', error);
        setImagesPreloaded(true);
      }
    };

    preloadImages();
  }, [cards]);

  const handleSelectTrait = (trait: 'speed' | 'power' | 'grip') => {
    setIsClosing(true);
    setTimeout(() => {
      onSelectAttribute?.(trait);
      setSelectedCard(null);
      setIsClosing(false);
    }, 300);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedCard(null);
      setIsClosing(false);
    }, 300);
  };

  const renderFannedCards = () => {
    if (!imagesPreloaded) {
      return null;
    }

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
          entering={FadeIn.delay(index * 100).duration(300)}
          exiting={FadeOut.duration(200)}
          onPress={() => setSelectedCard(card)}
        >
          <FanCard card={card} />
        </AnimatedTouchable>
      );
    });
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
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <Animated.View 
                style={styles.modalContent}
                exiting={isClosing ? SlideOutDown.duration(300) : undefined}
              >
                {selectedCard && (
                  <ModalCard 
                    card={selectedCard}
                    onSelectTrait={handleSelectTrait}
                  />
                )}
              </Animated.View>
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
  },
  fanContainer: {
    height: 180,
    marginLeft: SCREEN_WIDTH / 4,
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