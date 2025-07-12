import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { FanCardStyles as styles } from '../../styles/cards/fan.styles';
import { BaseCardProps } from './BaseCard';

const FanCard = ({ card, selectedAttribute, result }: BaseCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    // Log card details when component mounts
    console.log(`🎴 Rendering card ${card.id} (${card.name})`);
    console.log(`📷 Image source:`, card.image);
  }, [card]);

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

  const handleImageLoadStart = () => {
    console.log(`🔄 Starting to load image for card ${card.id} (${card.name})`);
    setImageLoaded(false);
    setImageError(null);
  };

  const handleImageLoad = () => {
    console.log(`✅ Successfully loaded image for card ${card.id} (${card.name})`);
    setImageLoaded(true);
    setImageError(null);
  };

  const handleImageError = (error: any) => {
    const errorMsg = `Failed to load image for card ${card.id} (${card.name}): ${error}`;
    console.error(`❌ ${errorMsg}`);
    setImageError(errorMsg);
    setImageLoaded(false);
  };

  return (
    <View style={styles.card}>
      {/* Card Number and Name */}
      <View style={styles.cardHeader}>
        <View style={styles.cardNumberContainer}>
          <Text style={styles.cardNumber}>{card.id}</Text>
        </View>
        <Text style={styles.name} numberOfLines={2}>{card.name}</Text>
      </View>

      {/* Car Image */}
      <View style={styles.imageContainer}>
        <Image
          source={card.image}
          style={[
            styles.image,
            { opacity: imageLoaded ? 1 : 0.3 }
          ]}
          resizeMode="contain"
          onLoadStart={handleImageLoadStart}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        {imageError && (
          <Text style={styles.errorText}>!</Text>
        )}
      </View>

      {/* Stats Table */}
      <View style={styles.statsContainer}>
        {renderStat('speed', card.speed, 'speed')}
        {renderStat('power', card.power, 'power')}
        {renderStat('weight', card.weight, 'grip')}
      </View>
    </View>
  );
};

export default FanCard; 