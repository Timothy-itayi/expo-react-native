import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Trait, Prediction } from '../../types/gambleMode';

interface PredictionPhaseProps {
  revealedTrait: Trait;
  onPredictionMade: (prediction: Prediction) => void;
}

const PredictionPhase: React.FC<PredictionPhaseProps> = ({
  revealedTrait,
  onPredictionMade
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
          fontSize: 24,
          fontWeight: '700',
          color: '#333333',
          marginBottom: 15
        }}>
          Make Your Prediction
        </Text>
        <Text style={{
          fontSize: 18,
          color: '#666666',
          textAlign: 'center',
          lineHeight: 24
        }}>
          Will your card's {traitInfo.label.toLowerCase()}{'\n'}
          be higher or lower than your opponent's?
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(400)} style={{
        alignItems: 'center',
        marginBottom: 40
      }}>
        <Text style={{
          fontSize: 48,
          marginBottom: 20
        }}>
          {traitInfo.emoji}
        </Text>
        <Text style={{
          fontSize: 20,
          fontWeight: '600',
          color: traitInfo.color,
          marginBottom: 30
        }}>
          {traitInfo.label}
        </Text>
      </Animated.View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 400,
        gap: 20
      }}>
        <Animated.View entering={FadeInUp.delay(600)} style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => onPredictionMade('higher')}
            style={{
              backgroundColor: '#ffffff',
              paddingHorizontal: 30,
              paddingVertical: 25,
              borderRadius: 0,
              borderWidth: 3,
              borderColor: '#4CAF50',
              alignItems: 'center',
              minHeight: 120
            }}
            activeOpacity={0.8}
          >
            <Text style={{
              fontSize: 36,
              marginBottom: 10
            }}>
              📈
            </Text>
            <Text style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#4CAF50',
              letterSpacing: 1
            }}>
              HIGHER
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#666666',
              textAlign: 'center',
              marginTop: 5
            }}>
              My {traitInfo.label.toLowerCase()}{'\n'}
              will be greater
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(800)} style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => onPredictionMade('lower')}
            style={{
              backgroundColor: '#ffffff',
              paddingHorizontal: 30,
              paddingVertical: 25,
              borderRadius: 0,
              borderWidth: 3,
              borderColor: '#F44336',
              alignItems: 'center',
              minHeight: 120
            }}
            activeOpacity={0.8}
          >
            <Text style={{
              fontSize: 36,
              marginBottom: 10
            }}>
              📉
            </Text>
            <Text style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#F44336',
              letterSpacing: 1
            }}>
              LOWER
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#666666',
              textAlign: 'center',
              marginTop: 5
            }}>
              My {traitInfo.label.toLowerCase()}{'\n'}
              will be less
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Animated.View entering={FadeInUp.delay(1000)} style={{
        marginTop: 30,
        paddingHorizontal: 20
      }}>
        <Text style={{
          fontSize: 14,
          color: '#888888',
          textAlign: 'center',
          lineHeight: 20
        }}>
          💡 Tip: Choose your prediction carefully.{'\n'}
          Correct predictions keep your card,{'\n'}
          wrong predictions send it to the pit!
        </Text>
      </Animated.View>
    </View>
  );
};

export default PredictionPhase; 