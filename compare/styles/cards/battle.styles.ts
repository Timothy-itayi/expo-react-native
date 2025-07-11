import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const BATTLE_CARD_RATIO = 1.5;

export const BattleCardStyles = StyleSheet.create({
  card: {
    width: screenWidth * 0.45,
    aspectRatio: 1/BATTLE_CARD_RATIO,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000000',
    overflow: 'hidden',
    elevation: 3,
  },

  cardLarge: {
    width: screenWidth * 0.85,
  },

  cardHeader: {
    backgroundColor: '#ffffff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    height: '15%',
    justifyContent: 'center',
  },

  cardNumberContainer: {
    position: 'absolute',
    top: 6,
    left: 8,
    backgroundColor: '#ff0066',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },

  cardNumber: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  cardNumberLarge: {
    fontSize: 18,
  },

  name: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 4,
  },

  nameLarge: {
    fontSize: 24,
  },

  imageContainer: {
    width: '100%',
    height: '55%',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    flex: 1,
  },

  statsContainer: {
    height: '30%',
    padding: 4,
    backgroundColor: '#ffffff',
    justifyContent: 'space-evenly',
  },

  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    borderRadius: 6,
  },

  statLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333333',
    textTransform: 'lowercase',
    flex: 1,
  },

  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'right',
    minWidth: 60,
  },

  statLabelInteractive: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
  },

  statValueInteractive: {
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