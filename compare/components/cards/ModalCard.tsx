import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { ModalCardStyles as styles } from '../../styles/cards';
import { BaseCardProps } from './BaseCard';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedImage = Animated.createAnimatedComponent(Image);

// GSAP-like spring config for a natural, bouncy feel
const springConfig = {
  damping: 10,    // Lower damping for more bounce
  stiffness: 100, // Balanced stiffness for natural movement
  mass: 0.5,      // Lighter mass for quicker response
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

// GSAP-like timing config for smooth transitions
const timingConfig = {
  duration: 400,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1), // GSAP's default ease
};

interface ModalCardProps extends BaseCardProps {
  onSelectTrait?: (trait: 'speed' | 'power' | 'grip') => void;
}

const ModalCard = ({ card, selectedAttribute, result, onSelectTrait }: ModalCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const pressedValues = {
    speed: useSharedValue(1),
    power: useSharedValue(1),
    grip: useSharedValue(1),
  };
  const imageOpacity = useSharedValue(0);

  const getHighlightStyle = (attr: 'speed' | 'power' | 'grip') => {
    if (selectedAttribute !== attr) return null;
    if (result === 'win') return styles.traitWin;
    if (result === 'lose') return styles.traitLose;
    if (result === 'draw') return styles.traitDraw;
    return null;
  };

  const createAnimatedStyle = (trait: 'speed' | 'power' | 'grip') => {
    return useAnimatedStyle(() => {
      const scale = interpolate(
        pressedValues[trait].value,
        [0, 1],
        [0.95, 1]
      );
      
      return {
        transform: [{ scale }],
        opacity: interpolate(
          pressedValues[trait].value,
          [0, 1],
          [0.7, 1]
        ),
      };
    });
  };

  const handlePressIn = (trait: 'speed' | 'power' | 'grip') => {
    // Quick press down animation
    pressedValues[trait].value = withTiming(0, {
      duration: 100,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const handlePressOut = (trait: 'speed' | 'power' | 'grip') => {
    // Bounce back with spring
    pressedValues[trait].value = withSequence(
      withSpring(1.05, springConfig),
      withSpring(1, springConfig)
    );
    onSelectTrait?.(trait);
  };

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: imageOpacity.value,
    };
  });

  const handleImageLoad = () => {
    setImageLoaded(true);
    imageOpacity.value = withTiming(1, {
      duration: 600,
      easing: Easing.bezier(0.4, 0, 0.2, 1), // Smooth ease-out
    });
  };

  const renderTraitButton = (label: string, value: number, trait: 'speed' | 'power' | 'grip') => (
    <AnimatedPressable
      style={[
        styles.traitButton,
        getHighlightStyle(trait),
        createAnimatedStyle(trait),
      ]}
      onPressIn={() => handlePressIn(trait)}
      onPressOut={() => handlePressOut(trait)}
    >
      <Text style={styles.traitLabel}>{label}</Text>
      <Text style={styles.traitValue}>{value}</Text>
    </AnimatedPressable>
  );

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardNumberContainer}>
          <Text style={styles.cardNumber}>{card.id}</Text>
        </View>
        <Text style={styles.name} numberOfLines={2}>{card.name}</Text>
      </View>

      <View style={styles.imageContainer}>
        <AnimatedImage
          source={card.image}
          style={[
            styles.image,
            imageAnimatedStyle
          ]}
          resizeMode="contain"
          onLoadStart={() => setImageLoaded(false)}
          onLoad={handleImageLoad}
        />
      </View>

      <View style={styles.traitsContainer}>
        {renderTraitButton('speed', card.speed, 'speed')}
        {renderTraitButton('power', card.power, 'power')}
        {renderTraitButton('weight', card.weight, 'grip')}
      </View>
    </View>
  );
};

export default ModalCard; 