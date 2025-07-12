import { Audio } from 'expo-av';

export interface BackgroundTrack {
  name: string;
  sound: Audio.Sound;
  isLoaded: boolean;
}

export class AudioFactory {
  // Background music tracks mapping
  static readonly BACKGROUND_TRACKS = {
   
    gameplay: require('../assets/audio/VRDNYN-SHORE-DITCH.mp3'),
  };

  private static logDebug(message: string, data?: any) {
    console.log(`🎵 [AudioFactory] ${message}`, data ? data : '');
  }

  static async createBackgroundTrack(trackName: keyof typeof AudioFactory.BACKGROUND_TRACKS): Promise<BackgroundTrack> {
    try {
      this.logDebug(`Creating background track: ${trackName}`);
      
      const { sound } = await Audio.Sound.createAsync(
        AudioFactory.BACKGROUND_TRACKS[trackName],
        {
          shouldPlay: false,
          isLooping: true,
          volume: 1.0,
        },
        (status) => {
          this.logDebug(`Status update for ${trackName}:`, status);
        }
      );

      return {
        name: trackName,
        sound,
        isLoaded: true
      };
    } catch (error) {
      this.logDebug(`Failed to create background track ${trackName}:`, error);
      throw error;
    }
  }

  static async initializeAudio(): Promise<void> {
    try {
      this.logDebug('Initializing audio system...');
      
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      this.logDebug('Audio system initialized successfully');
    } catch (error) {
      this.logDebug('Failed to initialize audio:', error);
      throw error;
    }
  }
} 