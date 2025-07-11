import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const FAN_CARD_RATIO = 1.6;

export const FanCardStyles = StyleSheet.create({
  card: {
    width: screenWidth * 0.38, // Increased from 0.32 for better readability
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
    height: 40, // Fixed height for consistent spacing
  },

  cardNumberContainer: {
    position: 'absolute',
    top: 8,
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

  name: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5, // Increased to avoid overlap with number
    paddingHorizontal: 4,
  },

  imageContainer: {
    width: '100%',
    height: '50%',
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
    padding: 8,
    backgroundColor: '#ffffff',
  },

  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
    minWidth: 80,
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