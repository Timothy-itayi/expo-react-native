// data/cards.ts

export interface CardType {
  id: number;
  name: string;
  speed: number;
  power: number;
  grip: number;
  weight: number;
  image: any;
}

export const cards: CardType[] = [
  {
    id: 1,
    name: 'Speedster',
    speed: 90,
    power: 60,
    grip: 70,
    weight: 1200,
    image: require('../assets/images/cars/car00.jpg'),
  },
  {
    id: 2,
    name: 'Tank',
    speed: 40,
    power: 95,
    grip: 80,
    weight: 2100,
    image: require('../assets/images/cars/car01.jpg')
  },
  {
    id: 3,
    name: 'Drifter',
    speed: 70,
    power: 65,
    grip: 90,
    weight: 1350,
    image: require('../assets/images/cars/car02.jpg'),
  },
  {
    id: 4,
    name: 'Blazer',
    speed: 85,
    power: 70,
    grip: 60,
    weight: 1400,
    image: require('../assets/images/cars/car03.jpg'),
  },
  {
    id: 5,
    name: 'Rocket',
    speed: 95,
    power: 80,
    grip: 50,
    weight: 1150,
    image: require('../assets/images/cars/car04.jpg'),
  },
  {
    id: 6,
    name: 'Bulldozer',
    speed: 45,
    power: 85,
    grip: 75,
    weight: 2300,
    image: require('../assets/images/cars/car05.jpg'),
  },
  {
    id: 7,
    name: 'Falcon',
    speed: 80,
    power: 75,
    grip: 55,
    weight: 1250,
    image: require('../assets/images/cars/car06.jpg'),
  },
  {
    id: 8,
    name: 'Panther',
    speed: 78,
    power: 60,
    grip: 82,
    weight: 1380,
    image: require('../assets/images/cars/car07.jpg'),
  },
  {
    id: 9,
    name: 'Ghost',
    speed: 88,
    power: 62,
    grip: 65,
    weight: 1280,
    image: require('../assets/images/cars/car08.jpg')
  },
  {
    id: 10,
    name: 'Crusher',
    speed: 50,
    power: 90,
    grip: 60,
    weight: 2200,
    image: require('../assets/images/cars/car09.jpg'),
  },
  {
    id: 11,
    name: 'Nitro',
    speed: 92,
    power: 72,
    grip: 58,
    weight: 1180,
    image: require('../assets/images/cars/car10.jpg'),
  },
  {
    id: 12,
    name: 'Goliath',
    speed: 55,
    power: 88,
    grip: 77,
    weight: 2400,
    image: require('../assets/images/cars/car11.jpg'),
  },
  {
    id: 13,
    name: 'Venom',
    speed: 87,
    power: 64,
    grip: 69,
    weight: 1320,
    image: require('../assets/images/cars/car12.jpg'),
  },
  {
    id: 14,
    name: 'Lightning',
    speed: 93,
    power: 68,
    grip: 61,
    weight: 1220,
    image: require('../assets/images/cars/car13.jpg'),
  },
  {
    id: 15,
    name: 'Shadow',
    speed: 79,
    power: 76,
    grip: 63,
    weight: 1450,
    image: require('../assets/images/cars/car00.jpg'),
  },
];
