import React from 'react';
import { Image, Text, View } from 'react-native';
import { CardType } from '../data/cards';
import { Cardstyles as styles } from '../styles/card.styles';

type Props = {
  card: CardType;
  large?: boolean;
  battle?: boolean;
  selectedAttribute?: 'speed' | 'power' | 'grip';
  result?: 'win' | 'lose' | 'draw';
};

const Card = ({ card, large = false, battle = false, selectedAttribute, result }: Props) => {
  const getHighlightStyle = (attr: 'speed' | 'power' | 'grip') => {
    if (selectedAttribute !== attr) return null;
    if (result === 'win') return styles.traitWin;
    if (result === 'lose') return styles.traitLose;
    if (result === 'draw') return styles.traitDraw;
    return null;
  };

  const renderStat = (label: string, value: number, attr: 'speed' | 'power' | 'grip') => (
    <View style={[
      styles.statRow,
      battle && styles.statRowBattle,
      getHighlightStyle(attr)
    ]}>
      <Text style={[
        styles.statLabel,
        battle && styles.statLabelBattle
      ]}>{label}</Text>
      <Text style={[
        styles.statValue,
        battle && styles.statValueBattle
      ]}>{value}</Text>
    </View>
  );

  return (
    <View style={[
      styles.card,
      large && styles.cardLarge,
      battle && styles.cardBattle
    ]}>
      {/* Card Number and Name */}
      <View style={[
        styles.cardHeader,
        battle && styles.cardHeaderBattle
      ]}>
        <View style={[
          styles.cardNumberContainer,
          battle && styles.cardNumberContainerBattle
        ]}>
          <Text style={[
            styles.cardNumber,
            battle && styles.cardNumberBattle
          ]}>{card.id}</Text>
        </View>
        <Text style={[
          styles.name,
          battle && styles.nameBattle
        ]} numberOfLines={2}>{card.name}</Text>
      </View>

      {/* Car Image */}
      <View style={styles.imageContainer}>
        <Image source={card.image} style={styles.image} resizeMode="cover" />
      </View>

      {/* Stats Table */}
      <View style={[
        styles.statsContainer,
        battle && styles.statsBattle
      ]}>
        {renderStat('Power', card.power, 'power')}
        {renderStat('Weight', card.weight, 'grip')}
        {renderStat('Speed', card.speed, 'speed')}
      </View>
    </View>
  );
};

export default Card;
