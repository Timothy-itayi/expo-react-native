import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const GameScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 0,
    justifyContent: 'space-between',
  },

  // CPU/Opponent Section
  cpuSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#000000', // black separator
    backgroundColor: '#ffffff',
    height: 120,
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  hiddenCard: {
    width: (screenWidth - 100) / 3,
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#000000', // black card border
  },

  // Scoreboard
  scoreBoard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },

  scoreText: {
    color: '#333333',
    fontWeight: '400',
    fontSize: 15,
    textAlign: 'center',
  },

  // Battle Zone
  battleZone: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#000000',
    minHeight: 160,
  },

  battleTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 16,
  },

  battleContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    gap: 16,
  },

  cardInfo: {
    backgroundColor: '#f8f8f8',
    borderRadius: 6,
    padding: 16,
    flex: 1,
    alignItems: 'center',
    minHeight: 90,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },

  cardLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 4,
    textTransform: 'uppercase',
  },

  cardValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 6,
  },

  userCardHighlight: {
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#f8f8f8',
  },

  cpuCardHighlight: {
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#f0f0f0',
  },

  resultText: {
    marginTop: 16,
    fontWeight: '500',
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },

  resultWin: {
    color: '#333333',
  },

  resultLoss: {
    color: '#666666',
  },

  instructions: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },

  // Player Section
  section: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },

  // Trait Buttons
  traitButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    gap: 8,
  },

  traitButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
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

  // End Game Section
  resultSection: {
    paddingTop: 16,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#000000',
  },

  winnerText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
});
