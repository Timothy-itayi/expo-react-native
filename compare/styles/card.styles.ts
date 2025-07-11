import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const CARD_RATIO = 1.0; // Standard playing card ratio

export const Cardstyles = StyleSheet.create({
  card: {
    width: screenWidth * 0.32,
    aspectRatio: 1/CARD_RATIO,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000000',
    overflow: 'hidden',
    marginHorizontal: 4,
    elevation: 3,
  },

  cardLarge: {
    width: screenWidth * 0.8,
  },

  cardBattle: {
    width: screenWidth * 0.25, // Reduced from 0.35 to 0.25
    transform: [{ rotate: '0deg' }],
  },

  cardHeader: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },

  cardHeaderBattle: {
    paddingVertical: 4,
    paddingHorizontal: 6,
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

  cardNumberContainerBattle: {
    top: 4,
    left: 6,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },

  cardNumber: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  cardNumberBattle: {
    fontSize: 12,
  },

  name: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 8,
  },

  nameBattle: {
    fontSize: 12,
    marginTop: 4,
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

  statsBattle: {
    padding: 4,
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

  statRowBattle: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
  },

  statLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    flex: 1,
  },

  statLabelBattle: {
    fontSize: 10,
  },

  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginLeft: 8,
  },

  statValueBattle: {
    fontSize: 10,
    marginLeft: 4,
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
