import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { FanCardStyles as styles } from '../../styles/cards';
import { BaseCardProps } from './BaseCard';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const FanCard = ({ card, selectedAttribute, result }: BaseCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getHighlightStyle = (attr: 'speed' | 'power' | 'grip') => {
    if (selectedAttribute !== attr) return null;
    if (result === 'win') return styles.traitWin;
    if (result === 'lose') return styles.traitLose;
    if (result === 'draw') return styles.traitDraw;
    return null;
  };

  const renderStat = (label: string, value: number, attr: 'speed' | 'power' | 'grip') => (
    <View style={[styles.statRow, getHighlightStyle(attr)]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );

  return (
    <Animated.View 
      style={styles.card}
      entering={FadeIn.duration(300)}
    >
      {/* Card Number and Name */}
      <View style={styles.cardHeader}>
        <View style={styles.cardNumberContainer}>
          <Text style={styles.cardNumber}>{card.id}</Text>
        </View>
        <Text style={styles.name} numberOfLines={2}>{card.name}</Text>
      </View>

      {/* Car Image */}
      <View style={styles.imageContainer}>
        <AnimatedImage
          source={card.image}
          style={[
            styles.image,
            { opacity: imageLoaded ? 1 : 0 }
          ]}
          resizeMode="contain"
          onLoadStart={() => setImageLoaded(false)}
          onLoad={() => setImageLoaded(true)}
          entering={FadeIn.duration(300)}
        />
      </View>

      {/* Stats Table */}
      <View style={styles.statsContainer}>
        {renderStat('speed', card.speed, 'speed')}
        {renderStat('power', card.power, 'power')}
        {renderStat('weight', card.weight, 'grip')}
      </View>
    </Animated.View>
  );
};

export default FanCard; 