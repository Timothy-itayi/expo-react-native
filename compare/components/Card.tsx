import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CardType } from '../data/cards';

type Props = {
  card: CardType;
};

const Card = ({ card }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{card.name}</Text>
      <Text>Speed: {card.speed}</Text>
      <Text>Power: {card.power}</Text>
      <Text>Grip: {card.grip}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    margin: 8,
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
});

export default Card;
