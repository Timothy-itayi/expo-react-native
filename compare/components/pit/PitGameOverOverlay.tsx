import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
    FadeInDown,
    SlideInDown,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring
} from 'react-native-reanimated';
import { VictoryCondition } from '../../types/pitMode';

interface PitGameOverOverlayProps {
  playerScore: number;
  cpuScore: number;
  victoryCondition: VictoryCondition | null;
  onPlayAgain: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PitGameOverOverlay: React.FC<PitGameOverOverlayProps> = ({ 
  playerScore, 
  cpuScore, 
  victoryCondition,
  onPlayAgain 
}) => {
  const buttonOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0.8);

  useEffect(() => {
    // Animate button after a delay
    buttonOpacity.value = withDelay(800, withSpring(1));
    buttonScale.value = withDelay(800, withSpring(1, { damping: 6 }));
  }, []);

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ scale: buttonScale.value }]
  }));

  const getVictoryInfo = () => {
    switch (victoryCondition) {
      case 'cardCollection':
        return {
          title: 'Card Collection Victory',
          message: 'You collected all opponent cards'
        };
      case 'pointThreshold':
        return {
          title: 'Point Threshold Victory',
          message: 'You reached the target points'
        };
      case 'survival':
        return {
          title: 'Survival Victory',
          message: 'You were the last player with cards'
        };
      case 'gameOver':
        return {
          title: 'Game Over',
          message: 'All cards have been sent to the pit. No cards remain.'
        };
      default:
        return {
          title: 'Game Over',
          message: 'The game has ended'
        };
    }
  };

  const victoryInfo = getVictoryInfo();

  return (
    <View style={styles.overlay}>
      <View style={styles.content}>
        {/* Victory Title */}
        <Animated.Text 
          entering={FadeInDown.springify().delay(400)}
          style={styles.victoryTitle}
        >
          {victoryInfo.title}
        </Animated.Text>
        
        {/* Victory Message */}
        <Animated.Text 
          entering={FadeInDown.springify().delay(600)}
          style={styles.victoryMessage}
        >
          {victoryInfo.message}
        </Animated.Text>

        {/* Final Scores */}
        <Animated.View 
          entering={SlideInDown.delay(700)}
          style={styles.scoresContainer}
        >
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Your Score:</Text>
            <Text style={styles.scoreValue}>
              {playerScore}
            </Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>CPU Score:</Text>
            <Text style={styles.scoreValue}>
              {cpuScore}
            </Text>
          </View>
        </Animated.View>

        {/* Play Again Button */}
        <AnimatedPressable 
          style={[styles.playAgainButton, buttonStyle]}
          onPress={onPlayAgain}
        >
          <Text style={styles.playAgainText}>
            Play Again
          </Text>
        </AnimatedPressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    backgroundColor: '#ffffff',
    padding: 32,
    borderRadius: 0,
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
    borderWidth: 2,
    borderColor: '#000000',
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  victoryTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: -0.5,
    color: '#000000'
  },
  victoryMessage: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
    fontWeight: '500'
  },
  scoresContainer: {
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000'
  },
  playAgainButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 0,
    borderWidth: 2,
    borderColor: '#000000',
    width: '100%',
    alignItems: 'center',
  },
  playAgainText: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#000000'
  },
});

export default PitGameOverOverlay; 