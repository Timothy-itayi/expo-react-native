import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { GambleRound } from '../../types/gambleMode';
import Card from '../Card';

interface BattleRevealPhaseProps {
  round: GambleRound;
  onContinue: () => void;
}

const BattleRevealPhase: React.FC<BattleRevealPhaseProps> = ({
  round,
  onContinue
}) => {
  const getTraitInfo = (trait: string) => {
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

  const traitInfo = getTraitInfo(round.revealedTrait);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20
    }}>
      {/* Results Section Only */}
      <Animated.View entering={FadeInUp.delay(200)} style={{ alignItems: 'center', marginBottom: 40 }}>
        <Text style={{ fontSize: 24, fontWeight: '700', color: '#333333', marginBottom: 20 }}>
          Round Results
        </Text>
        <View style={{
          backgroundColor: '#ffffff',
          paddingHorizontal: 30,
          paddingVertical: 25,
          borderRadius: 0,
          borderWidth: 3,
          borderColor: traitInfo.color,
          alignItems: 'center',
          marginBottom: 30,
          minWidth: 300
        }}>
          <Text style={{ fontSize: 32, marginBottom: 15 }}>{traitInfo.emoji}</Text>
          <Text style={{ fontSize: 20, fontWeight: '600', color: traitInfo.color, marginBottom: 15 }}>
            {traitInfo.label} Comparison
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 }}>
            <Text style={{ fontSize: 16, color: '#333333' }}>
              You: {round.playerValue}
            </Text>
            <Text style={{ fontSize: 16, color: '#333333' }}>
              CPU: {round.cpuValue}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: '#666666', marginBottom: 5 }}>
                Your Prediction
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '600', color: round.playerCorrect ? '#4CAF50' : '#F44336' }}>
                {round.playerCorrect ? '✅ Correct' : '❌ Wrong'}
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: '#666666', marginBottom: 5 }}>
                CPU Prediction
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '600', color: round.cpuCorrect ? '#4CAF50' : '#F44336' }}>
                {round.cpuCorrect ? '✅ Correct' : '❌ Wrong'}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
      <Animated.View entering={FadeInUp.delay(800)}>
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
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#ffffff', letterSpacing: 1 }}>
            Continue
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default BattleRevealPhase; 