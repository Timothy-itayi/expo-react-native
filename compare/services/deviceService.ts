import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export class DeviceService {
  private static readonly DEVICE_ID_KEY = 'device_id';
  
  static async getDeviceId(): Promise<string> {
    try {
      let deviceId = await AsyncStorage.getItem(this.DEVICE_ID_KEY);
      
      if (!deviceId) {
        // Generate a unique device ID
        deviceId = this.generateDeviceId();
        await AsyncStorage.setItem(this.DEVICE_ID_KEY, deviceId);
      }
      
      return deviceId;
    } catch (error) {
      console.error('Failed to get device ID:', error);
      return this.generateDeviceId();
    }
  }
  
  private static generateDeviceId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const platform = Platform.OS;
    return `${platform}_${timestamp}_${random}`;
  }
  
  static generateAnonymousUsername(): string {
    const adjectives = ['Swift', 'Mighty', 'Brave', 'Clever', 'Fierce', 'Noble', 'Wise', 'Bold'];
    const nouns = ['Champion', 'Warrior', 'Hero', 'Legend', 'Master', 'Victor', 'Ace', 'Star'];
    
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const number = Math.floor(Math.random() * 999) + 1;
    
    return `${adjective}${noun}${number}`;
  }
} 