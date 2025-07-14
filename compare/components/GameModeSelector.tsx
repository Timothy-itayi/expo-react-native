import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

interface GameModeSelectorProps {
  onSelectMode: (mode: 'classic' | 'gamble-mode') => void;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onSelectMode }) => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#ffffff'
    }}>
      <Animated.View entering={FadeInDown.springify()}>
        <Text style={{
          fontSize: 32,
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: 50,
          color: '#000000',
          letterSpacing: -1
        }}>
          Choose Game Mode
        </Text>
        
      
      </Animated.View>

      {/* Classic Mode */}
      <Animated.View entering={FadeInUp.delay(200)}>
        <TouchableOpacity
          onPress={() => onSelectMode('classic')}
          style={{
            backgroundColor: 'transparent',
            paddingHorizontal: 40,
            paddingVertical: 25,
            borderRadius: 0,
            width: 300,
            alignItems: 'center',
            marginBottom: 20,
            borderWidth: 2,
            borderColor: '#000000'
          }}
          activeOpacity={0.8}
        >
          <Text style={{
            fontSize: 24,
            fontWeight: '600',
            color: '#000000',
            marginBottom: 10,
            letterSpacing: 1
          }}>
            Classic Mode
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#666666',
            textAlign: 'center',
            lineHeight: 20,
            fontWeight: '500'
          }}>
            Direct card battles with{'\n'}
            immediate trait comparison
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Bluff Mode */}
      <Animated.View entering={FadeInUp.delay(400)}>
        <TouchableOpacity
          onPress={() => onSelectMode('gamble-mode')}
          style={{
            backgroundColor: 'transparent',
            paddingHorizontal: 40,
            paddingVertical: 25,
            borderRadius: 0,
            width: 300,
            alignItems: 'center',
            marginBottom: 20,
            borderWidth: 2,
            borderColor: '#000000'
          }}
          activeOpacity={0.8}
        >
          <Text style={{
            fontSize: 24,
            fontWeight: '600',
            color: '#000000',
            marginBottom: 10,
            letterSpacing: 1
          }}>
            Gamble Mode
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#666666',
            textAlign: 'center',
            lineHeight: 20,
            fontWeight: '500'
          }}>
            Predict whether or not the value of a trait will be higher or lower than your opponent's
          </Text>
        </TouchableOpacity>
      </Animated.View>


   
   
        
      
    </View>
  );
};

export default GameModeSelector; 