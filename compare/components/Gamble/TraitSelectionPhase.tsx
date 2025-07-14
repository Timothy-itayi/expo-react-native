import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { CardType } from '../../data/cards';
import { Trait } from '../../types/gambleMode';
import Card from '../Card';

interface TraitSelectionPhaseProps {
  playerCards: CardType[];
  revealedTrait: Trait;
  onCardSelected: (card: CardType) => void;
}

const TraitSelectionPhase: React.FC<TraitSelectionPhaseProps> = ({
  playerCards,
  revealedTrait,
  onCardSelected
}) => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  const getTraitInfo = (trait: Trait) => {
    switch (trait) {
      case 'speed':
        return { label: 'Speed', emoji: '⚡', color: '#FF6B6B' };
      case 'power':
        return { label: 'Power', emoji: '💪', color: '#4ECDC4' };
      case 'grip':
        return { label: 'Grip', emoji: '🎯', color: '#45B7D1' };
      case 'weight':
        return { label: 'Weight', emoji: '⚖️', color: '#96CEB4' };
      default:
        return { label: 'Unknown', emoji: '❓', color: '#FFEAA7' };
    }
  };

  const traitInfo = getTraitInfo(revealedTrait);

  const handleCardSelect = (card: CardType) => {
    setSelectedCard(card);
  };

  const handleConfirmSelection = () => {
    if (selectedCard) {
      onCardSelected(selectedCard);
    }
  };

  const getBestCardForTrait = (cards: CardType[], trait: Trait): CardType => {
    return cards.reduce((best, current) => 
      current[trait] > best[trait] ? current : best
    );
  };

  const bestCard = getBestCardForTrait(playerCards, revealedTrait);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20
    }}>
      <Animated.View entering={FadeInDown.delay(200)} style={{
        alignItems: 'center',
        marginBottom: 30
      }}>
        <Text style={{
          fontSize: 24,
          fontWeight: '700',
          color: '#333333',
          marginBottom: 10
        }}>
          Choose Your Card
        </Text>
        <Text style={{
          fontSize: 16,
          color: '#666666',
          textAlign: 'center',
          lineHeight: 22
        }}>
          Select a card to play for this round's{'\n'}
          <Text style={{ fontWeight: '600', color: traitInfo.color }}>
            {traitInfo.label}
          </Text> challenge
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(400)} style={{
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 0,
        borderWidth: 2,
        borderColor: traitInfo.color,
        alignItems: 'center',
        marginBottom: 30,
        minWidth: 280
      }}>
        <Text style={{
          fontSize: 32,
          marginBottom: 10
        }}>
          {traitInfo.emoji}
        </Text>
        <Text style={{
          fontSize: 20,
          fontWeight: '600',
          color: traitInfo.color,
          marginBottom: 5
        }}>
          {traitInfo.label} Challenge
        </Text>
        <Text style={{
          fontSize: 14,
          color: '#666666',
          textAlign: 'center'
        }}>
          Your best {traitInfo.label.toLowerCase()} card: {bestCard.name} ({bestCard[revealedTrait]})
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(600)} style={{
        width: '100%',
        maxWidth: 500
      }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#333333',
          marginBottom: 15,
          textAlign: 'center'
        }}>
          Your Hand ({playerCards.length} cards)
        </Text>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ 
            alignItems: 'center', 
            paddingHorizontal: 10,
            gap: 15
          }}
          style={{ minHeight: 200 }}
        >
          {playerCards.map(card => (
            <TouchableOpacity
              key={card.id}
              onPress={() => handleCardSelect(card)}
              style={{
                opacity: selectedCard?.id === card.id ? 1 : 0.7,
                transform: [{ scale: selectedCard?.id === card.id ? 1.05 : 1 }]
              }}
            >
              <Card 
                card={card} 
                select={false}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {selectedCard && (
        <Animated.View entering={FadeInUp.delay(800)} style={{
          marginTop: 20,
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#333333',
            marginBottom: 10
          }}>
            Selected: {selectedCard.name}
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#666666',
            marginBottom: 20
          }}>
            {traitInfo.label}: {selectedCard[revealedTrait]}
          </Text>
          
          <TouchableOpacity
            onPress={handleConfirmSelection}
            style={{
              backgroundColor: '#000000',
              paddingHorizontal: 40,
              paddingVertical: 15,
              borderRadius: 0,
              borderWidth: 2,
              borderColor: '#000000'
            }}
            activeOpacity={0.8}
          >
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#ffffff',
              letterSpacing: 1
            }}>
              Confirm Selection
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <Animated.View entering={FadeInUp.delay(1000)} style={{
        marginTop: 20,
        paddingHorizontal: 20
      }}>
        <Text style={{
          fontSize: 14,
          color: '#888888',
          textAlign: 'center',
          lineHeight: 20
        }}>
          💡 Tip: Consider your card's {traitInfo.label.toLowerCase()} value{'\n'}
          when making your prediction. Higher values{'\n'}
          might suggest predicting "higher"!
        </Text>
      </Animated.View>
    </View>
  );
};

export default TraitSelectionPhase; 