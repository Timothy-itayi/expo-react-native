import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const Cardstyles = StyleSheet.create({
  card: {
    width: screenWidth * 0.32,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000000',
    overflow: 'hidden',
    marginHorizontal: 4,
    elevation: 3,
  },

  cardLarge: {
    width: screenWidth * 0.4, // for battle zone
  },

  cardHeader: {
    backgroundColor: '#333',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },

  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },

  imageContainer: {
    width: '100%',
    aspectRatio: 1.4,
    backgroundColor: '#eee',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  statsContainer: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#f9f9f9',
  },

  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statItem: {
    alignItems: 'center',
    flex: 1,
  },

  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666',
  },

  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },

  cardFooter: {
    paddingVertical: 0,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },

  
  traitWin: {
  backgroundColor: '#d4edda', // Light green
  borderRadius: 4,
},
traitLose: {
  backgroundColor: '#f8d7da', // Light red
  borderRadius: 4,
},
traitDraw: {
  backgroundColor: '#e2e3e5', // Light gray
  borderRadius: 4,
},

});
