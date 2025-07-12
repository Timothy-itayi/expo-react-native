import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Animated, {
  FadeIn,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { BattleCardStyles as styles } from '../../styles/cards';
import { BaseCardProps } from './BaseCard';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface BattleCardProps extends BaseCardProps {
  onSelectTrait?: (trait: 'speed' | 'power' | 'grip') => void;
  isInteractive?: boolean;
  isLarge?: boolean;
}

const BattleCard = ({ 
  card, 
  selectedAttribute, 
  result,
  onSelectTrait,
  isInteractive = false,
  isLarge = false,
}: BattleCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const scale = useSharedValue(1);
  const pressed = useSharedValue(1);

  const getHighlightStyle = (attr: 'speed' | 'power' | 'grip') => {
    if (selectedAttribute !== attr) return null;
    if (result === 'win') return styles.traitWin;
    if (result === 'lose') return styles.traitLose;
    if (result === 'draw') return styles.traitDraw;
    return null;
  };

  const handleTraitPress = (trait: 'speed' | 'power' | 'grip') => {
    if (!isInteractive) return;
    
    // Animate the trait row
    scale.value = withSequence(
      withSpring(1.05, { damping: 2 }),
      withTiming(1, { duration: 200 })
    );
    
    onSelectTrait?.(trait);
  };

  const renderStat = (label: string, value: number, attr: 'speed' | 'power' | 'grip') => {
    const animatedStyle = useAnimatedStyle(() => {
      const scaleValue = interpolate(
        pressed.value,
        [0, 1],
        [0.97, 1]
      );
      
      return {
        transform: [
          { scale: selectedAttribute === attr ? scale.value : scaleValue }
        ],
        opacity: interpolate(
          pressed.value,
          [0, 1],
          [0.8, 1]
        ),
      };
    });

    return (
      <AnimatedPressable
        style={[styles.statRow, getHighlightStyle(attr), animatedStyle]}
        onPress={() => handleTraitPress(attr)}
        onPressIn={() => {
          pressed.value = withSpring(0, { damping: 15, stiffness: 150 });
        }}
        onPressOut={() => {
          pressed.value = withSpring(1, { damping: 15, stiffness: 150 });
        }}
        disabled={!isInteractive}
      >
        <Text style={[
          styles.statLabel,
          isInteractive && styles.statLabelInteractive
        ]}>
          {label}
        </Text>
        <Text style={[
          styles.statValue,
          isInteractive && styles.statValueInteractive
        ]}>
          {value}
        </Text>
      </AnimatedPressable>
    );
  };

  return (
    <Animated.View 
      style={[
        styles.card,
        isLarge && styles.cardLarge,
      ]}
      entering={FadeIn.duration(300)}
    >
      {/* Card Number and Name */}
      <View style={styles.cardHeader}>
        <View style={styles.cardNumberContainer}>
          <Text style={[
            styles.cardNumber,
            isLarge && styles.cardNumberLarge,
          ]}>
            {card.id}
          </Text>
        </View>
        <Text style={[
          styles.name,
          isLarge && styles.nameLarge,
        ]} numberOfLines={1}>
          {card.name}
        </Text>
      </View>

      {/* Car Image - Wrapped in Animated.View to avoid conflicts */}
      <Animated.View style={styles.imageContainer}>
        <Image
          source={card.image}
          style={[
            styles.image,
            { opacity: imageLoaded ? 1 : 0 }
          ]}
          resizeMode="contain"
          onLoadStart={() => setImageLoaded(false)}
          onLoad={() => setImageLoaded(true)}
        />
      </Animated.View>

      {/* Stats Table */}
      <View style={styles.statsContainer}>
        {renderStat('speed', card.speed, 'speed')}
        {renderStat('power', card.power, 'power')}
        {renderStat('weight', card.weight, 'grip')}
      </View>
    </Animated.View>
  );
};

export default BattleCard; 