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
    <View style={[styles.statColumn, getHighlightStyle(attr)]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.card}>
      {/* Card Name */}
      <View style={styles.cardHeader}>
        <Text style={styles.name} numberOfLines={1}>{card.name}</Text>
      </View>

      {/* Car Image */}
      <View style={styles.imageContainer}>
        <Image source={card.image} style={styles.image} resizeMode="cover" />
      </View>

      {/* Stats Table */}
      <View style={styles.statsContainer}>
        {renderStat('SPD', card.speed, 'speed')}
        {renderStat('PWR', card.power, 'power')}
        {renderStat('GRP', card.weight, 'grip')}
      </View>
    </View>
  );
};

export default BattleCard; 