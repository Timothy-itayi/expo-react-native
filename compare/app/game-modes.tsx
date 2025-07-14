import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import GameModeSelector from '../components/GameModeSelector';

export default function GameModesScreen() {
  const router = useRouter();

  const handleModeSelection = (mode: 'classic' | 'gamble-mode') => {
    if (mode === 'classic') {
      router.push('/game');
    } else if (mode === 'gamble-mode') {
      router.push('/gamble-mode');
    }
  };

  return (
    <View style={{ flex: 1}}>
      <GameModeSelector onSelectMode={handleModeSelection} />
    </View>
  );
} 