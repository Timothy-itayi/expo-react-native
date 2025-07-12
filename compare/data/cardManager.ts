import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardFactory, CardType } from './cardFactory';

// Static image mapping - must be accessible for rehydration
const IMAGE_MAP: { [key: string]: any } = {
  'car00': require('../assets/images/cars/car00.jpg'),
  'car01': require('../assets/images/cars/car01.jpg'),
  'car02': require('../assets/images/cars/car02.jpg'),
  'car03': require('../assets/images/cars/car03.jpg'),
  'car04': require('../assets/images/cars/car04.jpg'),
  'car05': require('../assets/images/cars/car05.jpg'),
  'car06': require('../assets/images/cars/car06.jpg'),
  'car07': require('../assets/images/cars/car07.jpg'),
  'car08': require('../assets/images/cars/car08.jpg'),
  'car09': require('../assets/images/cars/car09.jpg'),
  'car10': require('../assets/images/cars/car10.jpg'),
  'car11': require('../assets/images/cars/car11.jpg'),
  'car12': require('../assets/images/cars/car12.jpg'),
  'car13': require('../assets/images/cars/car13.jpg'),
};

export class CardManager {
  private static readonly STORAGE_KEY = 'game_cards';
  private static cards: CardType[] = [];
  private static isInitialized = false;

  private static serializeCard(card: CardType): any {
    // Store the image key instead of the require reference
    const imageKey = Object.entries(IMAGE_MAP).find(
      ([_, value]) => value === card.image
    )?.[0] || 'car00';

    console.log(`Serializing card ${card.id} (${card.name}) with image: ${imageKey}`);

    return {
      ...card,
      image: imageKey
    };
  }

  private static deserializeCard(serializedCard: any): CardType {
    // Restore the image require reference
    const imageKey = serializedCard.image as string;
    const imageRef = IMAGE_MAP[imageKey] || IMAGE_MAP['car00'];
    
    console.log(`Deserializing card ${serializedCard.id} (${serializedCard.name}) with image key: ${imageKey}`);
    
    if (imageRef === IMAGE_MAP['car00'] && imageKey !== 'car00') {
      console.warn(`⚠️ Fallback to car00.jpg for card ${serializedCard.id} (${serializedCard.name}). Requested key: ${imageKey}`);
    }

    return {
      ...serializedCard,
      image: imageRef
    };
  }

  static async saveCards(): Promise<void> {
    try {
      const serializedCards = this.cards.map(card => this.serializeCard(card));
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(serializedCards));
      console.log(`✅ Saved ${serializedCards.length} cards to storage`);
      console.log('Image keys saved:', serializedCards.map(card => `${card.id}:${card.image}`).join(', '));
    } catch (error) {
      console.error('Failed to save cards:', error);
    }
  }

  static async loadCards(): Promise<CardType[]> {
    try {
      const stored = await AsyncStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const serializedCards = JSON.parse(stored);
      console.log(`📥 Loading ${serializedCards.length} cards from storage`);
      console.log('Stored image keys:', serializedCards.map((card: any) => `${card.id}:${card.image}`).join(', '));
      
      return serializedCards.map((card: any) => this.deserializeCard(card));
    } catch (error) {
      console.error('Failed to load cards:', error);
      return [];
    }
  }

  static async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      // Try to load existing cards from storage
      const storedCards = await this.loadCards();
      if (storedCards.length > 0) {
        this.cards = storedCards;
        console.log(`Loaded ${storedCards.length} cards from storage`);
      } else {
        // Generate initial card set if no stored cards exist
        this.cards = CardFactory.createCardSet(20);
        await this.saveCards();
        console.log('Generated new card set');
      }
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize cards:', error);
      // Fallback to generated cards
      this.cards = CardFactory.createCardSet(20);
      this.isInitialized = true;
    }
  }

  static async getAllCards(): Promise<CardType[]> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    return [...this.cards];
  }

  static async getRandomCards(count: number): Promise<CardType[]> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    const shuffled = [...this.cards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  static async addCard(card: CardType): Promise<void> {
    this.cards.push(card);
    await this.saveCards();
  }

  static async removeCard(cardId: number): Promise<void> {
    this.cards = this.cards.filter(card => card.id !== cardId);
    await this.saveCards();
  }

  static async updateCard(cardId: number, updates: Partial<CardType>): Promise<void> {
    const index = this.cards.findIndex(card => card.id === cardId);
    if (index !== -1) {
      this.cards[index] = { ...this.cards[index], ...updates };
      await this.saveCards();
    }
  }

  static getCardsByCategory(category: string): CardType[] {
    return this.cards.filter(card => card.category === category);
  }


  static async generateNewCards(count: number): Promise<void> {
    const newCards = CardFactory.createCardSet(count);
    this.cards.push(...newCards);
    await this.saveCards();
  }

  static async resetCards(): Promise<void> {
    this.cards = CardFactory.createCardSet(20);
    await this.saveCards();
  }

  static getCardCount(): number {
    return this.cards.length;
  }

  static getCardById(id: number): CardType | undefined {
    return this.cards.find(card => card.id === id);
  }

  // Additional utility methods
  static async clearStorage(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.STORAGE_KEY);
      this.cards = [];
      this.isInitialized = false;
      console.log('Cleared card storage');
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }

  static async exportCards(): Promise<string> {
    return JSON.stringify(this.cards, null, 2);
  }

  static async importCards(cardsJson: string): Promise<void> {
    try {
      const importedCards = JSON.parse(cardsJson);
      // Make sure to deserialize imported cards
      this.cards = importedCards.map((card: any) => this.deserializeCard(card));
      await this.saveCards();
      console.log(`Imported ${importedCards.length} cards`);
    } catch (error) {
      console.error('Failed to import cards:', error);
      throw new Error('Invalid card data format');
    }
  }

  static async forceReset(): Promise<void> {
    try {
      // Clear storage
      await AsyncStorage.removeItem(this.STORAGE_KEY);
      // Reset initialization flag
      this.isInitialized = false;
      // Reinitialize with new cards
      await this.initialize();
      console.log('Card storage has been reset and reinitialized');
    } catch (error) {
      console.error('Failed to force reset cards:', error);
    }
  }
} 