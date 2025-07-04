import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const GameScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  // === Opponent Section ===
  opponentSection: {
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    height: 140,

  },

  sectionLabel: {
    color: '#333333',
    fontWeight: '500',
    fontSize: 10,
    marginBottom: 5,
    textAlign: 'center',
  },

  cpuHand: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  hiddenCard: {
    width: (screenWidth - 100) / 3,
    height: 80,
    backgroundColor: '#f0f0f0',
   
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#000000',
  },

  // === Battle Section ===
  battleSection: {
    paddingHorizontal: 12,
   
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 350,
  },

  battleTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },

  battleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 16,
  },

  cardLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
    marginTop: 8,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  resultText: {
    marginTop: 12,
    fontWeight: '500',
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },

  instructions: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '400',
    flexDirection: 'column',
    textAlign: 'center',
  },

  // === Trait Section ===
  traitSection: {
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#000000',
  },

  traitButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    gap: 1,
  },

  traitButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },

  traitButtonText: {
    color: '#333333',
    fontWeight: '500',
    fontSize: 14,
  },

  // === Player Section ===
  playerSection: {
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#000000',
  },

  // === Result ===
  resultSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },

  winnerText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },

  // === Scoreboard ===
  scoreBoard: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  scoreText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
});
