// styles/GameScreen.styles.ts
import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const GameScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6F4E37',
    padding: 16,
    justifyContent: 'space-between',
  },
  cpuSection: {
    padding: 8,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    height: 130, // Reduced height for opponent section
  },
  sectionLabel: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 6,
  },
  cpuHand: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hiddenCard: {
    width: (screenWidth - 104) / 3,
    height: 100,
    backgroundColor: '#333',
    marginHorizontal: 0,
    borderRadius: 10,
  },
  battleZone: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: '#4B342F', // darker background for emphasis
  },
  battleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  battleContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    gap: 20,
  },
  cardInfo: {
    backgroundColor: '#7E5E4E',
    borderRadius: 10,
    padding: 12,
    flex: 1,
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ddd',
    marginBottom: 6,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userCardHighlight: {
    borderWidth: 2,
    borderColor: '#76FF03', // bright green border for user card
  },
  cpuCardHighlight: {
    borderWidth: 2,
    borderColor: '#FF3D00', // bright red border for CPU card
  },
  resultText: {
    marginTop: 14,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  resultWin: {
    color: '#76FF03', // green for win
  },
  resultLoss: {
    color: '#FF3D00', // red for loss
  },
  instructions: {
    color: '#ccc',
    fontSize: 16,
  },
  traitButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  traitButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 24,
    minWidth: 90,
    alignItems: 'center',
  },
  traitButtonText: {
    color: '#6F4E37',
    fontWeight: '700',
    fontSize: 16,
  },
  resultSection: {
    paddingTop: 14,
    alignItems: 'center',
  },
  winnerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 14,
  },
  section: {
    padding: 12,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  scoreBoard: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  paddingVertical: 8,
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  borderRadius: 12,
  marginBottom: 12,
},
scoreText: {
  color: '#fff',
  fontWeight: '700',
  fontSize: 16,
},

});
