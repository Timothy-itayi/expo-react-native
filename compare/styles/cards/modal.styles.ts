import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const MODAL_CARD_RATIO = 1.5;

export const ModalCardStyles = StyleSheet.create({
  card: {
    width: screenWidth * 0.85,
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
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    height: '15%',
    justifyContent: 'center',
  },

  cardNumberContainer: {
    position: 'absolute',
    top: 18,
    left: 15,
    marginLeft: 10,
    backgroundColor: '#ff0066',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    zIndex: 1,
    minWidth: 48,          // ensure larger minimum width
    minHeight: 32,         // ensure larger minimum height
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardNumber: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },

  name: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 4,
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

  traitsContainer: {
    height: '30%',
    padding: 8,
    backgroundColor: '#ffffff',
    justifyContent: 'space-evenly',
  },

  traitButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    marginVertical: 4,
    borderWidth: 1,
    borderColor: 'black',
    // For border edge animation, the borderColor can be animated in the component
    // Remove shadow and elevation for minimalism
    overflow: 'hidden',
  },

  traitLabel: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    textTransform: 'lowercase',
    flex: 1,
  },

  traitValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'right',
    minWidth: 60,
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