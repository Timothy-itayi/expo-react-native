
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="index"
        options={{ 
          title: 'Car Card Game',
        }}
      />
      <Stack.Screen 
        name="game"
        options={{ 
          title: 'Game',
        }}
      />
      <Stack.Screen 
        name="contact"
        options={{ 
          title: 'Contact Us',
        }}
      />
    </Stack>
  );
}
