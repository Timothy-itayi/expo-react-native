export interface CardType {
  id: number;
  name: string;
  speed: number;
  power: number;
  grip: number;
  weight: number;
  image: any;
  category?: string;
}

export interface CardTemplate {
  name: string;
  baseSpeed: number;
  basePower: number;
  baseGrip: number;
  baseWeight: number;
  imageKey: string;
  category: string;
}

// Static image mapping - all require statements must be static
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
  'car14': require('../assets/images/cars/car14.jpg'),
  'car15': require('../assets/images/cars/car15.jpg'),
  'car16': require('../assets/images/cars/car16.jpg'),
  'car17': require('../assets/images/cars/car17.jpg'),
  'car18': require('../assets/images/cars/car18.jpg'),
  'car19': require('../assets/images/cars/car19.jpg'),
  'car20': require('../assets/images/cars/car20.jpg'),
  'car21': require('../assets/images/cars/car21.jpg'),
  'car22': require('../assets/images/cars/car22.jpg'),
};

export class CardFactory {
  private static cardTemplates: CardTemplate[] = [
    // Speed-focused cars
    {
      name: 'Speedster',
      baseSpeed: 90,
      basePower: 60,
      baseGrip: 70,
      baseWeight: 1200,
      imageKey: 'car00',
      category: 'speed'
    },
    {
      name: 'Rocket',
      baseSpeed: 95,
      basePower: 80,
      baseGrip: 50,
      baseWeight: 1150,
      imageKey: 'car04',
      category: 'speed'
    },
    // Power-focused cars
    {
      name: 'Tank',
      baseSpeed: 40,
      basePower: 95,
      baseGrip: 80,
      baseWeight: 2100,
      imageKey: 'car01',
      category: 'power'
    },
    {
      name: 'Bulldozer',
      baseSpeed: 45,
      basePower: 85,
      baseGrip: 75,
      baseWeight: 2300,
      imageKey: 'car05',
      category: 'power'
    },
    // Balanced cars
    {
      name: 'Drifter',
      baseSpeed: 70,
      basePower: 65,
      baseGrip: 90,
      baseWeight: 1350,
      imageKey: 'car02',
      category: 'balanced'
    },
    {
      name: 'Panther',
      baseSpeed: 78,
      basePower: 60,
      baseGrip: 82,
      baseWeight: 1380,
      imageKey: 'car07',
      category: 'balanced'
    },
    {
      name: 'Blazer',
      baseSpeed: 85,
      basePower: 70,
      baseGrip: 60,
      baseWeight: 1400,
      imageKey: 'car03',
      category: 'speed'
    },
    {
      name: 'Falcon',
      baseSpeed: 80,
      basePower: 75,
      baseGrip: 55,
      baseWeight: 1250,
      imageKey: 'car06',
      category: 'balanced'
    },
    {
      name: 'Ghost',
      baseSpeed: 88,
      basePower: 62,
      baseGrip: 65,
      baseWeight: 1280,
      imageKey: 'car08',
      category: 'speed'
    },
    {
      name: 'Crusher',
      baseSpeed: 50,
      basePower: 90,
      baseGrip: 60,
      baseWeight: 2200,
      imageKey: 'car09',
      category: 'power'
    },
    {
      name: 'Nitro',
      baseSpeed: 92,
      basePower: 72,
      baseGrip: 58,
      baseWeight: 1180,
      imageKey: 'car10',
      category: 'speed'
    },
    {
      name: 'Goliath',
      baseSpeed: 55,
      basePower: 88,
      baseGrip: 77,
      baseWeight: 2400,
      imageKey: 'car11',
      category: 'power'
    },
    {
      name: 'Venom',
      baseSpeed: 87,
      basePower: 64,
      baseGrip: 69,
      baseWeight: 1320,
      imageKey: 'car12',
      category: 'speed'
    },
    {
      name: 'Opel',
      baseSpeed: 87,
      basePower: 64,
      baseGrip: 69,
      baseWeight: 1320,
      imageKey: 'car13',
      category: 'speed'
    },
    {
      name: 'Ferrari',
      baseSpeed: 87,
      basePower: 64,
      baseGrip: 69,
      baseWeight: 1320,
      imageKey: 'car14',
      category: 'speed'
    },
    {
      name: 'Mercedes',
      baseSpeed: 87,
      basePower: 64,
      baseGrip: 69,
      baseWeight: 1320,
      imageKey: 'car15',
      category: 'speed'
    },
    {
      name: 'Mercedes',
      baseSpeed: 87,
      basePower: 64,
      baseGrip: 69,
      baseWeight: 1320,
      imageKey: 'car16',
      category: 'speed'
    },
    {
      name: 'Subaru',
      baseSpeed: 87,
      basePower: 64,
      baseGrip: 69,
      baseWeight: 1320,
      imageKey: 'car17',
      category: 'speed'
    },
    {
      name: 'Quicksilver',
      baseSpeed: 87,
      basePower: 64,
      baseGrip: 69,
      baseWeight: 1320,
      imageKey: 'car18',
      category: 'speed'
    },
    {
      name: 'Supra',
      baseSpeed: 87,
      basePower: 64,
      baseGrip: 69,
      baseWeight: 1320,
      imageKey: 'car19',
      category: 'speed'
    },
    {
      name: 'Porsche',
      baseSpeed: 87,
      basePower: 64,
      baseGrip: 69,
      baseWeight: 1320,
      imageKey: 'car20',
      category: 'speed'
    },
    {
      name: 'Lamborghini',
      baseSpeed: 87,
      basePower: 64,
      baseGrip: 69,
      baseWeight: 1320,
      imageKey: 'car21',
      category: 'speed'
    },
    {
      name: 'Maserati',
      baseSpeed: 87,
      basePower: 64,
      baseGrip: 69,
      baseWeight: 1320,
      imageKey: 'car22',
      category: 'speed'
    },
  ];

  static createCard(templateName: string, variations?: Partial<CardType>): CardType {
    const template = this.cardTemplates.find(t => t.name === templateName);
    if (!template) {
      throw new Error(`Template "${templateName}" not found`);
    }

    // Find the template's position in the array (1-based index)
    const templateIndex = this.cardTemplates.findIndex(t => t.name === templateName) + 1;

    const imageRef = IMAGE_MAP[template.imageKey] || IMAGE_MAP['car00'];
    console.log(`🎴 Creating card "${templateName}" with image key: ${template.imageKey}`);
    if (imageRef === IMAGE_MAP['car00'] && template.imageKey !== 'car00') {
      console.warn(`⚠️ Fallback to car00.jpg for template "${templateName}". Requested key: ${template.imageKey}`);
    }

    const card: CardType = {
      id: templateIndex,
      name: template.name,
      speed: template.baseSpeed + (variations?.speed || 0),
      power: template.basePower + (variations?.power || 0),
      grip: template.baseGrip + (variations?.grip || 0),
      weight: template.baseWeight + (variations?.weight || 0),
      image: imageRef,
      category: template.category
    };

    return this.validateCard(card);
  }

  static createCardSet(count: number): CardType[] {
    console.log(`🎴 [CardFactory] Creating card set of ${count} cards`);
    const cards: CardType[] = [];
    const usedImageKeys = new Set<string>();
    const usedTemplates = new Set<string>();

    while (cards.length < count) {
      // Get a random template that hasn't been used yet
      const availableTemplates = this.cardTemplates.filter(template => 
        !usedTemplates.has(template.name)
      );

      if (availableTemplates.length === 0) {
        console.warn('⚠️ No more unique templates available, resetting template tracking');
        usedTemplates.clear();
        continue;
      }

      const randomIndex = Math.floor(Math.random() * availableTemplates.length);
      const selectedTemplate = availableTemplates[randomIndex];
      
      console.log(`🎴 Creating card ${cards.length + 1}/${count} using template: ${selectedTemplate.name}`);
      
      // Create variations that will be consistent for this card
      const variations = {
        speed: Math.floor(Math.random() * 10) - 5,
        power: Math.floor(Math.random() * 10) - 5,
        grip: Math.floor(Math.random() * 10) - 5,
        weight: Math.floor(Math.random() * 200) - 100
      };

      console.log(`🎴 Card variations:`, variations);

      const card = this.createCard(selectedTemplate.name, variations);
      console.log(`🎴 Created card: ${card.name}(${card.id}) with stats:`, {
        speed: card.speed,
        power: card.power,
        grip: card.grip,
        weight: card.weight
      });

      cards.push(card);
      usedTemplates.add(selectedTemplate.name);
    }

    console.log('🎴 Final card set:', cards.map(card => ({
      name: card.name,
      id: card.id,
      stats: {
        speed: card.speed,
        power: card.power,
        grip: card.grip,
        weight: card.weight
      }
    })));

    return cards;
  }

  static createRandomCard(): CardType {
    const randomTemplate = this.cardTemplates[Math.floor(Math.random() * this.cardTemplates.length)];
    console.log(`🎲 Selected random template: "${randomTemplate.name}" with image key: ${randomTemplate.imageKey}`);
    
    const variations = {
      speed: Math.floor(Math.random() * 10) - 5,
      power: Math.floor(Math.random() * 10) - 5,
      grip: Math.floor(Math.random() * 10) - 5,
      weight: Math.floor(Math.random() * 200) - 100
    };

    return this.createCard(randomTemplate.name, variations);
  }

  static getCardsByCategory(category: string): CardType[] {
    return this.cardTemplates
      .filter(template => template.category === category)
      .map(template => this.createCard(template.name));
  }

  private static validateCard(card: CardType): CardType {
    // Ensure stats are within valid ranges
    card.speed = Math.max(30, Math.min(100, card.speed));
    card.power = Math.max(50, Math.min(100, card.power));
    card.grip = Math.max(40, Math.min(95, card.grip));
    card.weight = Math.max(1000, Math.min(3000, card.weight));

    return card;
  }

  static addTemplate(template: CardTemplate): void {
    this.cardTemplates.push(template);
  }

  static getTemplates(): CardTemplate[] {
    return [...this.cardTemplates];
  }

  // Utility method to get available image keys
  static getAvailableImageKeys(): string[] {
    return Object.keys(IMAGE_MAP);
  }
} 