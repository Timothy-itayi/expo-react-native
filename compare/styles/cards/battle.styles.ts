import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const BATTLE_CARD_RATIO = 1.5; // Keeping original ratio

export const BattleCardStyles = StyleSheet.create({
  card: {
    width: screenWidth * 0.45, // Adjusted to match the reference size
    aspectRatio: 1/BATTLE_CARD_RATIO,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
    overflow: 'hidden',
    elevation: 2,
  },

  cardHeader: {
    backgroundColor: '#333333',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },

  name: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },

  imageContainer: {
    width: '100%',
    height: '60%',
    backgroundColor: '#ffffff',
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#ffffff',
    height: '20%',
  },

  statColumn: {
    alignItems: 'center',
    flex: 1,
  },

  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666666',
    
  },

  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
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