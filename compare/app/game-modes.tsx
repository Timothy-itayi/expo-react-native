import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import GameModeSelector from '../components/GameModeSelector';

export default function GameModesScreen() {
  const router = useRouter();

  const handleModeSelection = (mode: 'classic' | 'bluff') => {
    if (mode === 'classic') {
      router.push('/game');
    } else if (mode === 'bluff') {
      router.push('/pit-game');
    }
  };

  return (
    <View style={{ flex: 1}}>
      <GameModeSelector onSelectMode={handleModeSelection} />
    </View>
  );
} 