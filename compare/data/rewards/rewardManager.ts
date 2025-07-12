import AsyncStorage from '@react-native-async-storage/async-storage';
import { BattleResult, BattleReward, GameStats } from '../../types/rewards';
import { RewardFactory } from './rewardFactory';

export class RewardManager {
  private static readonly STATS_KEY = 'game_stats';
  private static readonly REWARDS_KEY = 'battle_rewards';
  private static isInitialized = false;
  
  private static stats: GameStats = {
    totalGames: 0,
    totalWins: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalPoints: 0,
    perfectWins: 0,
    comebackWins: 0
  };

  // Debug logging helper
  private static logDebug(message: string, data?: any) {
    console.log(`💎 [RewardManager] ${message}`, data ? data : '');
  }

  static async initialize(): Promise<void> {
    if (this.isInitialized) {
      this.logDebug('Already initialized');
      return;
    }

    await this.loadStats();
    this.isInitialized = true;
    this.logDebug('Initialized with stats', this.stats);
  }

  static async processBattleResult(battleResult: BattleResult): Promise<BattleReward[]> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    this.logDebug('Processing battle result', battleResult);
    
    const rewards = RewardFactory.generateRewards(battleResult, this.stats.currentStreak);
    
    // Update stats
    this.stats.totalGames++;
    if (battleResult.playerWins > battleResult.cpuWins) {
      this.stats.totalWins++;
      this.stats.currentStreak++;
      this.stats.bestStreak = Math.max(this.stats.bestStreak, this.stats.currentStreak);
    } else {
      this.stats.currentStreak = 0;
    }

    if (battleResult.isPerfectWin) {
      this.stats.perfectWins++;
    }

    if (battleResult.isComebackWin) {
      this.stats.comebackWins++;
    }

    // Calculate total points
    const totalPoints = rewards.reduce((sum, reward) => sum + reward.amount, 0);
    this.stats.totalPoints += totalPoints;

    this.logDebug('Updated stats', {
      rewards,
      totalPoints,
      newStats: this.stats
    });

    // Save to storage
    await this.saveStats();
    
    return rewards;
  }

  static getStats(): GameStats {
    return { ...this.stats };
  }

  static async resetStats(): Promise<void> {
    this.logDebug('Resetting stats');
    
    this.stats = {
      totalGames: 0,
      totalWins: 0,
      currentStreak: 0,
      bestStreak: 0,
      totalPoints: 0,
      perfectWins: 0,
      comebackWins: 0
    };
    
    await this.saveStats();
  }

  private static async saveStats(): Promise<void> {
    try {
      await AsyncStorage.setItem(this.STATS_KEY, JSON.stringify(this.stats));
      this.logDebug('Stats saved successfully');
    } catch (error) {
      console.error('Failed to save stats:', error);
    }
  }

  private static async loadStats(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem(this.STATS_KEY);
      if (stored) {
        this.stats = JSON.parse(stored);
        this.logDebug('Stats loaded from storage', this.stats);
      } else {
        this.logDebug('No stored stats found, using defaults');
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  }

  // Debug helper methods
  static async debugClearStorage(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.STATS_KEY);
      this.logDebug('Debug: Storage cleared');
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }

  static debugGetCurrentState(): any {
    return {
      isInitialized: this.isInitialized,
      stats: this.stats
    };
  }
} 