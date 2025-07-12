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

interface GameOverOverlayProps {
  playerScore: number;
  cpuScore: number;
  rewards: Array<{ description: string; amount: number }>;
  onPlayAgain: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const GameOverOverlay = ({ 
  playerScore, 
  cpuScore, 
  rewards, 
  onPlayAgain 
}: GameOverOverlayProps) => {
  const buttonOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0.8);

  useEffect(() => {
    // Animate button after all rewards are shown
    const lastRewardDelay = 500 + (rewards.length * 300);
    
    buttonOpacity.value = withDelay(
      lastRewardDelay + 300,
      withSpring(1)
    );
    buttonScale.value = withDelay(
      lastRewardDelay + 300,
      withSpring(1, { damping: 6 })
    );
  }, [rewards.length]);

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ scale: buttonScale.value }]
  }));

  const getWinnerText = () => {
    if (playerScore > cpuScore) return 'You Win!';
    if (cpuScore > playerScore) return 'CPU Wins!';
    return "It's a Draw!";
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.content}>
        <Animated.Text 
          entering={FadeInDown.springify().delay(200)}
          style={styles.winnerText}
        >
          {getWinnerText()}
        </Animated.Text>
        
        {/* Rewards Section */}
        {rewards.length > 0 && (
          <Animated.View 
            entering={FadeInDown.springify().delay(500)}
            style={styles.rewardsContainer}
          >
            <Text style={styles.rewardsTitle}>Rewards Earned:</Text>
            {rewards.map((reward, index) => (
              <Animated.Text 
                key={index}
                entering={SlideInDown.delay(500 + (index * 300))}
                style={styles.rewardText}
              >
                {reward.description}: +{reward.amount} points
              </Animated.Text>
            ))}
          </Animated.View>
        )}

        {/* Play Again Button */}
        <AnimatedPressable 
          style={[styles.playAgainButton, buttonStyle]}
          onPress={onPlayAgain}
        >
          <Text style={styles.playAgainText}>Play Again</Text>
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
    zIndex: 1000, // Ensure it's above everything
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
    elevation: 5, // Android elevation
    shadowColor: '#000000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  winnerText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 32,
    textAlign: 'center',
    letterSpacing: -1,
  },
  rewardsContainer: {
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
  },
  rewardsTitle: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 16,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  rewardText: {
    fontSize: 24,
    color: '#000000',
    marginVertical: 4,
    fontWeight: '600',
    letterSpacing: 1,
  },
  playAgainButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 0,
    marginTop: 8,
    borderWidth: 2,
    borderColor: '#000000',
    width: '100%',
    alignItems: 'center',
  },
  playAgainText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default GameOverOverlay; 