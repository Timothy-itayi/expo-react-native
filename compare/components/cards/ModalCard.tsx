import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { BaseCardProps } from './BaseCard';

const screenWidth = Dimensions.get('window').width;
const CARD_RATIO = 1.6;

const ModalCard = ({ card, selectedAttribute, result }: BaseCardProps) => {
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
        <Text style={styles.name} numberOfLines={2}>{card.name}</Text>
      </View>

      {/* Car Image */}
      <View style={styles.imageContainer}>
        <Image source={card.image} style={styles.image} resizeMode="cover" />
      </View>

      {/* Stats Table */}
      <View style={styles.statsContainer}>
        {renderStat('Power', card.power, 'power')}
        {renderStat('Weight', card.weight, 'grip')}
        {renderStat('Speed', card.speed, 'speed')}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.8,
    aspectRatio: 1/CARD_RATIO,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#000000',
    overflow: 'hidden',
    elevation: 3,
  },

  cardHeader: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },

  cardNumberContainer: {
    position: 'absolute',
    top: 12,
    left: 16,
    backgroundColor: '#ff0066',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    zIndex: 1,
  },

  cardNumber: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
  },

  name: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 12,
  },

  imageContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  statsContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
  },

  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },

  statLabel: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333333',
    flex: 1,
  },

  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginLeft: 12,
  },

  traitWin: {
    backgroundColor: '#d4edda',
  },

  traitLose: {
    backgroundColor: '#f8d7da',
  },

  traitDraw: {
    backgroundColor: '#e2e3e5',
  },
});

export default ModalCard; 