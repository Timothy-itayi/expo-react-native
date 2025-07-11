import React from 'react';
import { Image, Text, View } from 'react-native';
import { BattleCardStyles as styles } from '../../styles/cards';
import { BaseCardProps } from './BaseCard';

const BattleCard = ({ card, selectedAttribute, result }: BaseCardProps) => {
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
    <View style={styles.card}>
      {/* Card Number and Name */}
      <View style={styles.cardHeader}>
        <View style={styles.cardNumberContainer}>
          <Text style={styles.cardNumber}>{card.id}</Text>
        </View>
        <Text style={styles.name} numberOfLines={1}>{card.name}</Text>
      </View>

      {/* Car Image */}
      <View style={styles.imageContainer}>
        <Image source={card.image} style={styles.image} resizeMode="contain" />
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

export default BattleCard; 