import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { audioManager } from '../services/audioManager';

const VolumeControl: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Load initial state
    const state = audioManager.getState();
    setIsMuted(state.isMuted);
  }, []);

  const toggleMute = async () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    await audioManager.setMuted(newMutedState);
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={toggleMute}
    >
      <Ionicons 
        name={isMuted ? "volume-mute" : "volume-high"}
        size={24} 
        color="#000000" 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    zIndex: 100,
  },
});

export default VolumeControl; 