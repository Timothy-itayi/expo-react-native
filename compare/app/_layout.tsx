
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { audioManager } from '../services/audioManager';

export default function RootLayout() {
  useEffect(() => {
    const setupAudio = async () => {
      try {
        // Initialize audio manager
        await audioManager.initialize();
        
        // Start playing main menu theme
        await audioManager.playBackgroundMusic('mainMenu');
      } catch (error) {
        console.error('Failed to setup audio:', error);
      }
    };

    setupAudio();

    // Cleanup on unmount
    return () => {
      audioManager.cleanup();
    };
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        headerShadowVisible: false,
        headerBackTitle: ' ', // Empty space to remove back text but keep gesture
      }}
    >
      <Stack.Screen 
        name="index"
        options={{ 
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="game"
        options={{ 
          title: 'Game',
          headerBackTitle: 'Home',
        }}
      />
      <Stack.Screen 
        name="leaderboard"
        options={{ 
          title: 'Leaderboard',
          headerBackTitle: 'Home',
        }}
      />
      <Stack.Screen 
        name="contact"
        options={{ 
          title: 'Contact',
          headerBackTitle: 'Home',
        }}
      />
    </Stack>
  );
}
