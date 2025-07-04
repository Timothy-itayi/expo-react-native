export interface CardType {
  id: number;
  name: string;
  speed: number;
  power: number;
  grip: number;
}

export const cards: CardType[] = [
  { id: 1, name: 'Speedster', speed: 90, power: 60, grip: 70 },
  { id: 2, name: 'Tank', speed: 40, power: 95, grip: 80 },
  { id: 3, name: 'Drifter', speed: 70, power: 65, grip: 90 },
  { id: 4, name: 'Blazer', speed: 85, power: 70, grip: 60 },
  { id: 5, name: 'Rocket', speed: 95, power: 80, grip: 50 },
  { id: 6, name: 'Bulldozer', speed: 45, power: 85, grip: 75 },
  { id: 7, name: 'Falcon', speed: 80, power: 75, grip: 55 },
  { id: 8, name: 'Panther', speed: 78, power: 60, grip: 82 },
  { id: 9, name: 'Ghost', speed: 88, power: 62, grip: 65 },
  { id: 10, name: 'Crusher', speed: 50, power: 90, grip: 60 },
  { id: 11, name: 'Nitro', speed: 92, power: 72, grip: 58 },
  { id: 12, name: 'Goliath', speed: 55, power: 88, grip: 77 },
  { id: 13, name: 'Venom', speed: 87, power: 64, grip: 69 },
  { id: 14, name: 'Lightning', speed: 93, power: 68, grip: 61 },
  { id: 15, name: 'Shadow', speed: 79, power: 76, grip: 63 },
];
