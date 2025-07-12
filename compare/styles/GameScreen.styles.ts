import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const GameScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  // === Opponent Section ===
  opponentSection: {
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    height: 140,

  },

  sectionLabel: {
    color: '#333333',
    fontWeight: '500',
    fontSize: 10,
    marginBottom: 5,
    textAlign: 'center',
  },

  cpuHand: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  hiddenCard: {
    width: (screenWidth - 100) / 3,
    height: 80,
    backgroundColor: '#f0f0f0',
   
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#000000',
  },

  // === Scoreboard ===
  scoreBoard: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },

  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },

  scoreItem: {
    alignItems: 'center',
  },

  playerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
    marginBottom: 4,
  },

  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },

  scoreDivider: {
    fontSize: 18,
    fontWeight: '500',
    color: '#999999',
  },

  // === Battle Section ===
  battleSection: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    position: 'relative', // Add this to create stacking context
  },

  battleTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 4,
  },

  battleContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    gap: 20, // Space between cards
    zIndex: 1, // Add this to ensure proper stacking
  },

  cardLabel: {
    fontSize: 10,
    fontWeight: '400',
    color: '#666666',
    marginTop: 4,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  resultText: {
    marginTop: 8,
    fontWeight: '500',
    fontSize: 12,
    color: '#333333',
    textAlign: 'center',
  },

  instructions: {
    color: '#666666',
    fontSize: 11,
    fontWeight: '400',
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: 4,
  },

  // === Trait Section ===
  traitSection: {
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#000000',
  },

  traitButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    gap: 1,
  },

  traitButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },

  traitButtonText: {
    color: '#333333',
    fontWeight: '500',
    fontSize: 14,
  },

  // === Player Section ===
  playerSection: {
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#000000',
  },

  // === Result ===
  resultSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },

  winnerText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },

  // Battle Overlay Styles
  battleOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    elevation: 9999, // High elevation for Android
  },

  battleOverlayContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    width: '80%',
    maxWidth: 300,
    elevation: 10000, // Even higher elevation for Android
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 10000, // Ensure content is above overlay
  },

  playAgainButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    
  },

  playAgainText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },

  // New styles for points and rewards
  pointsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginTop: 8
  },
  rewardsContainer: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center'
  },
  rewardText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 4
  }
});
