import { supabase } from '../lib/supabase';
import { GameStats } from '../types/rewards';
import { DeviceService } from './deviceService';

export class LeaderboardService {
  private static logDebug(message: string, data?: any) {
    console.log(`📊 [LeaderboardService] ${message}`, data ? data : '');
  }

  // Debug method to test connection
  static async testConnection() {
    try {
      this.logDebug('Testing Supabase connection...');
      
      const { data, error } = await supabase
        .from('anonymous_users')
        .select('count')
        .limit(1)
        .single();
      
      if (error) {
        console.error('Connection test error:', error);
        console.error('Code:', error.code);
        console.error('Message:', error.message);
        console.error('Details:', error.details);
        return false;
      }
      
      this.logDebug('Connection successful!');
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      return false;
    }
  }

  static async getGlobalLeaderboard(limit = 100) {
    try {
      // Test connection first
      const isConnected = await this.testConnection();
      if (!isConnected) {
        console.error('Skipping leaderboard fetch due to connection error');
        return [];
      }

      this.logDebug('Fetching leaderboard data...');
      
      const { data, error } = await supabase
        .from('global_leaderboard')
        .select('*')
        .order('total_points', { ascending: false })
        .limit(limit);
      
      if (error) {
        console.error('Supabase error:', error);
        console.error('Code:', error.code);
        console.error('Message:', error.message);
        console.error('Details:', error.details);
        return [];
      }
      
      this.logDebug(`Fetched ${data?.length || 0} leaderboard entries`);
      return data || [];
    } catch (error) {
      console.error('Leaderboard fetch error:', error);
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      return [];
    }
  }
  
  static async updateUserStats(stats: GameStats) {
    try {
      const deviceId = await DeviceService.getDeviceId();
      this.logDebug('Updating stats for device:', deviceId);
      
      const username = await this.getOrCreateUsername(deviceId);
      
      const { data, error } = await supabase
        .from('anonymous_users')
        .upsert({
          device_id: deviceId,
          username: username,
          total_points: stats.totalPoints,
          best_streak: stats.bestStreak,
          games_played: stats.totalGames,
          total_wins: stats.totalWins,
          perfect_wins: stats.perfectWins,
          comeback_wins: stats.comebackWins,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'device_id'
        });
      
      if (error) {
        console.error('Failed to update user stats:', error);
        console.error('Code:', error.code);
        console.error('Message:', error.message);
        console.error('Details:', error.details);
      } else {
        this.logDebug('User stats updated successfully');
      }
    } catch (error) {
      console.error('Stats update error:', error);
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
    }
  }
  
  static async getUserRank(): Promise<number | null> {
    try {
      const deviceId = await DeviceService.getDeviceId();
      this.logDebug('Getting rank for device:', deviceId);
      
      const { data, error } = await supabase
        .from('global_leaderboard')
        .select('user_id')
        .order('total_points', { ascending: false });
      
      if (error) {
        console.error('Failed to get user rank:', error);
        console.error('Code:', error.code);
        console.error('Message:', error.message);
        console.error('Details:', error.details);
        return null;
      }
      
      if (!data) return null;
      
      const userIndex = data.findIndex(entry => entry.user_id === deviceId);
      this.logDebug(`User rank found: ${userIndex + 1}`);
      return userIndex >= 0 ? userIndex + 1 : null;
    } catch (error) {
      console.error('Rank fetch error:', error);
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      return null;
    }
  }
  
  private static async getOrCreateUsername(deviceId: string): Promise<string> {
    try {
      this.logDebug('Getting/creating username for device:', deviceId);
      
      // Check if user already exists
      const { data, error } = await supabase
        .from('anonymous_users')
        .select('username')
        .eq('device_id', deviceId)
        .single();
      
      if (error && error.code !== 'PGRST116') { // Ignore "no rows returned" error
        console.error('Username lookup error:', error);
        console.error('Code:', error.code);
        console.error('Message:', error.message);
        console.error('Details:', error.details);
      }
      
      if (data?.username) {
        this.logDebug('Found existing username:', data.username);
        return data.username;
      }
      
      // Generate new username
      const newUsername = DeviceService.generateAnonymousUsername();
      this.logDebug('Generated new username:', newUsername);
      return newUsername;
    } catch (error) {
      console.error('Username generation error:', error);
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      return DeviceService.generateAnonymousUsername();
    }
  }

  // Reset user stats in Supabase
  static async resetUserStats(): Promise<void> {
    try {
      const deviceId = await DeviceService.getDeviceId();
      this.logDebug('Resetting stats for device:', deviceId);
      
      const username = await this.getOrCreateUsername(deviceId);
      
      const { error } = await supabase
        .from('anonymous_users')
        .upsert({
          device_id: deviceId,
          username: username,
          total_points: 0,
          best_streak: 0,
          games_played: 0,
          total_wins: 0,
          perfect_wins: 0,
          comeback_wins: 0,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'device_id'
        });
      
      if (error) {
        console.error('Failed to reset user stats:', error);
        console.error('Code:', error.code);
        console.error('Message:', error.message);
        console.error('Details:', error.details);
      } else {
        this.logDebug('User stats reset successfully');
      }
    } catch (error) {
      console.error('Stats reset error:', error);
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
    }
  }
} 