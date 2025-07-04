import React from 'react';
import { Image, Text, View } from 'react-native';
import { CardType } from '../data/cards';
import { Cardstyles as styles } from '../styles/card.styles';

type Props = {
  card: CardType;
  large?: boolean;
  selectedAttribute?: 'speed' | 'power' | 'grip';
  result?: 'win' | 'lose' | 'draw';
};

const Card = ({ card, large = false, selectedAttribute, result }: Props) => {
  const getHighlightStyle = (attr: 'speed' | 'power' | 'grip') => {
    if (selectedAttribute !== attr) return null;
    if (result === 'win') return styles.traitWin;
    if (result === 'lose') return styles.traitLose;
    if (result === 'draw') return styles.traitDraw;
    return null;
  };

  return (
    <View style={[styles.card, large && styles.cardLarge]}>
      <View style={styles.cardHeader}>
        <Text style={styles.name} numberOfLines={1}>{card.name}</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={card.image} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statRow}>
          <View style={[styles.statItem, getHighlightStyle('speed')]}>
            <Text style={styles.statLabel}>SPD</Text>
            <Text style={styles.statValue}>{card.speed}</Text>
          </View>
          <View style={[styles.statItem, getHighlightStyle('power')]}>
            <Text style={styles.statLabel}>PWR</Text>
            <Text style={styles.statValue}>{card.power}</Text>
          </View>
          <View style={[styles.statItem, getHighlightStyle('grip')]}>
            <Text style={styles.statLabel}>GRP</Text>
            <Text style={styles.statValue}>{card.grip}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardFooter}>
   
      </View>
    </View>
  );
};

export default Card;
