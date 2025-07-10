import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const MODAL_CARD_RATIO = 1.6;

export const ModalCardStyles = StyleSheet.create({
  card: {
    width: screenWidth * 0.8,
    aspectRatio: 1/MODAL_CARD_RATIO,
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