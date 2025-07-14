import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Trait } from '../../types/gambleMode';

interface TraitRevealPhaseProps {
  revealedTrait: Trait;
  roundNumber: number;
  onContinue: () => void;
}

const TraitRevealPhase: React.FC<TraitRevealPhaseProps> = ({
  revealedTrait,
  roundNumber,
  onContinue
}) => {
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

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20
    }}>
      <Animated.View entering={FadeInDown.delay(200)} style={{
        alignItems: 'center',
        marginBottom: 40
      }}>
        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          color: '#333333',
          marginBottom: 10
        }}>
          Round {roundNumber}
        </Text>
        <Text style={{
          fontSize: 16,
          color: '#666666',
          textAlign: 'center',
          lineHeight: 22
        }}>
          A trait has been revealed for this round!
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(400)} style={{
        backgroundColor: '#ffffff',
        paddingHorizontal: 30,
        paddingVertical: 25,
        borderRadius: 0,
        borderWidth: 3,
        borderColor: traitInfo.color,
        alignItems: 'center',
        marginBottom: 40,
        minWidth: 280
      }}>
        <Text style={{
          fontSize: 48,
          marginBottom: 15
        }}>
          {traitInfo.emoji}
        </Text>
        <Text style={{
          fontSize: 28,
          fontWeight: '700',
          color: traitInfo.color,
          marginBottom: 10,
          letterSpacing: 1
        }}>
          {traitInfo.label}
        </Text>
        <Text style={{
          fontSize: 16,
          color: '#666666',
          textAlign: 'center',
          lineHeight: 22
        }}>
          Both players will predict if their card's{'\n'}
          {traitInfo.label.toLowerCase()} will be higher or lower{'\n'}
          than their opponent's
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(600)}>
        <TouchableOpacity
          onPress={onContinue}
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
            Continue to Predictions
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default TraitRevealPhase; 