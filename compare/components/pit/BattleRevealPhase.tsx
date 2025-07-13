import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeInUp, SlideInLeft, SlideInRight } from 'react-native-reanimated';
import { PitRound } from '../../types/pitMode';
import Card from '../Card';

interface BattleRevealPhaseProps {
  round: PitRound;
  onContinue: () => void;
}

const BattleRevealPhase: React.FC<BattleRevealPhaseProps> = ({
  round,
  onContinue
}) => {
  const [revealStep, setRevealStep] = useState<'predictions' | 'cards' | 'results'>('predictions');

  useEffect(() => {
    // Auto-progress through reveal steps
    const timer1 = setTimeout(() => setRevealStep('cards'), 2000);
    const timer2 = setTimeout(() => setRevealStep('results'), 4000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

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

  const renderPredictions = () => (
    <Animated.View entering={FadeInDown.delay(200)} style={{
      alignItems: 'center',
      marginBottom: 40
    }}>
      <Text style={{
        fontSize: 24,
        fontWeight: '700',
        color: '#333333',
        marginBottom: 20
      }}>
        Predictions Made
      </Text>
      
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 500,
        gap: 20
      }}>
        <Animated.View entering={SlideInLeft.delay(400)} style={{
          flex: 1,
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#333333',
            marginBottom: 10
          }}>
            You Predicted
          </Text>
          <View style={{
            backgroundColor: '#ffffff',
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 0,
            borderWidth: 2,
            borderColor: round.playerPrediction === 'higher' ? '#4CAF50' : '#F44336',
            alignItems: 'center',
            minWidth: 120
          }}>
            <Text style={{
              fontSize: 24,
              marginBottom: 5
            }}>
              {round.playerPrediction === 'higher' ? '📈' : '📉'}
            </Text>
            <Text style={{
              fontSize: 18,
              fontWeight: '700',
              color: round.playerPrediction === 'higher' ? '#4CAF50' : '#F44336',
              letterSpacing: 1
            }}>
              {round.playerPrediction.toUpperCase()}
            </Text>
          </View>
        </Animated.View>

        <Animated.View entering={SlideInRight.delay(600)} style={{
          flex: 1,
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#333333',
            marginBottom: 10
          }}>
            CPU Predicted
          </Text>
          <View style={{
            backgroundColor: '#ffffff',
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 0,
            borderWidth: 2,
            borderColor: round.cpuPrediction === 'higher' ? '#4CAF50' : '#F44336',
            alignItems: 'center',
            minWidth: 120
          }}>
            <Text style={{
              fontSize: 24,
              marginBottom: 5
            }}>
              {round.cpuPrediction === 'higher' ? '📈' : '📉'}
            </Text>
            <Text style={{
              fontSize: 18,
              fontWeight: '700',
              color: round.cpuPrediction === 'higher' ? '#4CAF50' : '#F44336',
              letterSpacing: 1
            }}>
              {round.cpuPrediction.toUpperCase()}
            </Text>
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );

  const renderCardReveal = () => (
    <Animated.View entering={FadeInUp.delay(200)} style={{
      alignItems: 'center',
      marginBottom: 40
    }}>
      <Text style={{
        fontSize: 24,
        fontWeight: '700',
        color: '#333333',
        marginBottom: 20
      }}>
        Cards Revealed
      </Text>
      
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 500,
        gap: 20
      }}>
        <Animated.View entering={SlideInLeft.delay(400)} style={{
          flex: 1,
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#333333',
            marginBottom: 10
          }}>
            Your Card
          </Text>
          <Card card={round.playerCard} battle />
          <Text style={{
            fontSize: 18,
            fontWeight: '700',
            color: traitInfo.color,
            marginTop: 10
          }}>
            {traitInfo.label}: {round.playerValue}
          </Text>
        </Animated.View>

        <Animated.View entering={SlideInRight.delay(600)} style={{
          flex: 1,
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#333333',
            marginBottom: 10
          }}>
            CPU Card
          </Text>
          <Card card={round.cpuCard} battle />
          <Text style={{
            fontSize: 18,
            fontWeight: '700',
            color: traitInfo.color,
            marginTop: 10
          }}>
            {traitInfo.label}: {round.cpuValue}
          </Text>
        </Animated.View>
      </View>
    </Animated.View>
  );

  const renderResults = () => (
    <Animated.View entering={FadeInUp.delay(200)} style={{
      alignItems: 'center',
      marginBottom: 40
    }}>
      <Text style={{
        fontSize: 24,
        fontWeight: '700',
        color: '#333333',
        marginBottom: 20
      }}>
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
        <Text style={{
          fontSize: 32,
          marginBottom: 15
        }}>
          {traitInfo.emoji}
        </Text>
        <Text style={{
          fontSize: 20,
          fontWeight: '600',
          color: traitInfo.color,
          marginBottom: 15
        }}>
          {traitInfo.label} Comparison
        </Text>
        
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: 20
        }}>
          <Text style={{
            fontSize: 16,
            color: '#333333'
          }}>
            You: {round.playerValue}
          </Text>
          <Text style={{
            fontSize: 16,
            color: '#333333'
          }}>
            CPU: {round.cpuValue}
          </Text>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: 20
        }}>
          <View style={{
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 14,
              color: '#666666',
              marginBottom: 5
            }}>
              Your Prediction
            </Text>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: round.playerCorrect ? '#4CAF50' : '#F44336'
            }}>
              {round.playerCorrect ? '✅ Correct' : '❌ Wrong'}
            </Text>
          </View>
          
          <View style={{
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 14,
              color: '#666666',
              marginBottom: 5
            }}>
              CPU Prediction
            </Text>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: round.cpuCorrect ? '#4CAF50' : '#F44336'
            }}>
              {round.cpuCorrect ? '✅ Correct' : '❌ Wrong'}
            </Text>
          </View>
        </View>

        <View style={{
          backgroundColor: '#f5f5f5',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRadius: 0,
          borderWidth: 1,
          borderColor: '#ddd',
          alignItems: 'center',
          width: '100%'
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#333333',
            marginBottom: 10
          }}>
            Cards to Pit: {round.cardsToPit.length}
          </Text>
          {round.cardsToPit.length > 0 ? (
            <Text style={{
              fontSize: 14,
              color: '#666666',
              textAlign: 'center',
              lineHeight: 20
            }}>
              {round.cardsToPit.map(card => card.name).join(', ')}
            </Text>
          ) : (
            <Text style={{
              fontSize: 14,
              color: '#4CAF50',
              fontWeight: '600'
            }}>
              No cards lost to pit!
            </Text>
          )}
        </View>
      </View>
    </Animated.View>
  );

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20
    }}>
      {revealStep === 'predictions' && renderPredictions()}
      {revealStep === 'cards' && renderCardReveal()}
      {revealStep === 'results' && renderResults()}

      {revealStep === 'results' && (
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
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#ffffff',
              letterSpacing: 1
            }}>
              Continue
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default BattleRevealPhase; 