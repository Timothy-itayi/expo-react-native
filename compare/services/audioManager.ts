import AsyncStorage from '@react-native-async-storage/async-storage';
import { AudioFactory, BackgroundTrack } from './audioFactory';

interface AudioState {
  isMuted: boolean;
  volume: number;
  currentTrack: string | null;
}

export class AudioManager {
  private static instance: AudioManager;
  private currentTrack: BackgroundTrack | null = null;
  private isInitialized = false;
  private static readonly SETTINGS_KEY = 'audio_settings';

  private state: AudioState = {
    isMuted: false,
    volume: 1.0,
    currentTrack: null
  };

  private constructor() {}

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  private logDebug(message: string, data?: any) {
    console.log(`🎵 [AudioManager] ${message}`, data ? data : '');
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      this.logDebug('Initializing audio manager...');
      await AudioFactory.initializeAudio();
      await this.loadSettings();
      this.isInitialized = true;
      this.logDebug('Audio manager initialized successfully');
    } catch (error) {
      this.logDebug('Failed to initialize audio manager:', error);
      throw error;
    }
  }

  private async loadSettings(): Promise<void> {
    try {
      const savedSettings = await AsyncStorage.getItem(AudioManager.SETTINGS_KEY);
      if (savedSettings) {
        this.state = { ...this.state, ...JSON.parse(savedSettings) };
        this.logDebug('Loaded audio settings:', this.state);
      }
    } catch (error) {
      this.logDebug('Failed to load audio settings:', error);
    }
  }

  private async saveSettings(): Promise<void> {
    try {
      await AsyncStorage.setItem(AudioManager.SETTINGS_KEY, JSON.stringify(this.state));
      this.logDebug('Saved audio settings:', this.state);
    } catch (error) {
      this.logDebug('Failed to save audio settings:', error);
    }
  }

  async playBackgroundMusic(trackName: keyof typeof AudioFactory.BACKGROUND_TRACKS): Promise<void> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      // Don't switch if it's the same track
      if (this.state.currentTrack === trackName) {
        return;
      }

      // Stop current track if playing
      await this.stopBackgroundMusic();

      this.logDebug(`Playing background track: ${trackName}`);
      
      // Create and play new track
      this.currentTrack = await AudioFactory.createBackgroundTrack(trackName);
      
      if (!this.state.isMuted) {
        await this.currentTrack.sound.setVolumeAsync(this.state.volume);
        await this.currentTrack.sound.playAsync();
      }

      this.state.currentTrack = trackName;
      await this.saveSettings();
      
      this.logDebug(`Now playing: ${trackName}`);
    } catch (error) {
      this.logDebug(`Failed to play background track ${trackName}:`, error);
      throw error;
    }
  }

  async stopBackgroundMusic(): Promise<void> {
    try {
      if (this.currentTrack?.sound) {
        this.logDebug('Stopping current background track');
        await this.currentTrack.sound.stopAsync();
        await this.currentTrack.sound.unloadAsync();
        this.currentTrack = null;
        this.state.currentTrack = null;
        await this.saveSettings();
      }
    } catch (error) {
      this.logDebug('Failed to stop background music:', error);
      throw error;
    }
  }

  async setMuted(muted: boolean): Promise<void> {
    try {
      this.state.isMuted = muted;
      
      if (this.currentTrack?.sound) {
        await this.currentTrack.sound.setVolumeAsync(muted ? 0 : this.state.volume);
      }
      
      await this.saveSettings();
      this.logDebug(`Audio ${muted ? 'muted' : 'unmuted'}`);
    } catch (error) {
      this.logDebug('Failed to set muted state:', error);
      throw error;
    }
  }

  async cleanup(): Promise<void> {
    try {
      await this.stopBackgroundMusic();
      this.isInitialized = false;
      this.logDebug('Audio manager cleaned up');
    } catch (error) {
      this.logDebug('Failed to cleanup audio manager:', error);
      throw error;
    }
  }

  getState(): AudioState {
    return { ...this.state };
  }
}

// Export singleton instance
export const audioManager = AudioManager.getInstance(); 