import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const MODAL_CARD_RATIO = 1.6;

export const ModalCardStyles = StyleSheet.create({
  card: {
    width: screenWidth * 0.8,
    aspectRatio: 1/MODAL_CARD_RATIO,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000000',
    overflow: 'hidden',
    elevation: 3,
  },

  cardHeader: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    height: '15%',
    justifyContent: 'center', // Center content vertically
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
    fontSize: 16,
  },

  name: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 4, // Reduced from 24
    paddingHorizontal: 4,
  },

  imageContainer: {
    width: '100%',
    height: '55%', // Adjusted for better proportions
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
    height: '30%', // Fixed proportion
    padding: 8,
    backgroundColor: '#ffffff',
    justifyContent: 'space-evenly',
  },

  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },

  statLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333333',
    textTransform: 'lowercase',
    flex: 1,
  },

  statValue: {
    fontSize: 16,
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