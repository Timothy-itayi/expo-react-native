import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const FAN_CARD_RATIO = 1.6;

export const FanCardStyles = StyleSheet.create({
  card: {
    width: screenWidth * 0.32,
    aspectRatio: 1/FAN_CARD_RATIO,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000000',
    overflow: 'hidden',
    marginHorizontal: 4,
    elevation: 3,
  },

  cardHeader: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },

  cardNumberContainer: {
    position: 'absolute',
    top: 8,
    left: 12,
    backgroundColor: '#ff0066',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },

  cardNumber: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  name: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 8,
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
    padding: 12,
    backgroundColor: '#ffffff',
  },

  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },

  statLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    flex: 1,
  },

  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginLeft: 8,
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