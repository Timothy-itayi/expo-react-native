import { ImageSourcePropType } from 'react-native';

export interface Card {
  id: number;
  name: string;
  speed: number;
  power: number;
  grip: number;
  weight: number;
  image: ImageSourcePropType;
} 