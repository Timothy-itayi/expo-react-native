
import { Stack } from 'expo-router';


export default function RootLayout() {



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
        name="game-modes"
        options={{ 
          title: 'Game Modes',
          headerBackTitle: 'Home',
        }}
      />
      <Stack.Screen 
        name="game"
        options={{ 
          title: 'Classic Mode',
          headerBackTitle: 'Modes',
        }}
      />
      <Stack.Screen 
        name="gamble-mode"
        options={{ 
          title: 'Gamble Mode',
          headerBackTitle: 'Modes',
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
