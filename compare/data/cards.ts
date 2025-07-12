// data/cards.ts

import { CardType } from './cardFactory';
import { CardManager } from './cardManager';

// Export the interface and manager
export { CardFactory } from './cardFactory';
export type { CardType } from './cardFactory';
export { CardManager } from './cardManager';

// For backward compatibility, export a cards array that will be populated
export let cards: CardType[] = [];

// Initialize and populate the cards array
CardManager.initialize().then(() => {
  CardManager.getAllCards().then(allCards => {
    cards = allCards;
  });
});

// Function to get cards (use this instead of the cards array for reliability)
export const getCards = async (): Promise<CardType[]> => {
  return await CardManager.getAllCards();
};

