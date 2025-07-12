import { BattleResult, BattleReward } from '../../types/rewards';

export class RewardFactory {
  // Debug logging helper
  private static logDebug(message: string, data?: any) {
    console.log(`🎮 [RewardFactory] ${message}`, data ? data : '');
  }

  // Base points for winning
  static calculateBasePoints(battleResult: BattleResult): number {
    const points = battleResult.playerWins > battleResult.cpuWins ? 10 : 0;
    this.logDebug(`Base points calculated: ${points}`, {
      playerWins: battleResult.playerWins,
      cpuWins: battleResult.cpuWins
    });
    return points;
  }

  // Win streak bonus (2x, 3x, 5x multipliers)
  static calculateStreakBonus(currentStreak: number): number {
    let multiplier = 1;
    if (currentStreak >= 5) multiplier = 5;
    else if (currentStreak >= 3) multiplier = 3;
    else if (currentStreak >= 2) multiplier = 2;

    this.logDebug(`Streak multiplier calculated: ${multiplier}x`, {
      currentStreak
    });
    return multiplier;
  }

  // Perfect win bonus (winning without losing any cards)
  static calculatePerfectBonus(battleResult: BattleResult): number {
    const bonus = battleResult.isPerfectWin ? 25 : 0;
    this.logDebug(`Perfect win bonus calculated: ${bonus}`, {
      isPerfectWin: battleResult.isPerfectWin
    });
    return bonus;
  }

  // Comeback bonus (winning after being down)
  static calculateComebackBonus(battleResult: BattleResult): number {
    const bonus = battleResult.isComebackWin ? 18 : 0;
    this.logDebug(`Comeback bonus calculated: ${bonus}`, {
      isComebackWin: battleResult.isComebackWin
    });
    return bonus;
  }

  // Generate all rewards for a battle
  static generateRewards(battleResult: BattleResult, currentStreak: number): BattleReward[] {
    this.logDebug('Generating rewards for battle', { battleResult, currentStreak });
    
    const rewards: BattleReward[] = [];
    
    // Base points
    const basePoints = this.calculateBasePoints(battleResult);
    if (basePoints > 0) {
      rewards.push({
        type: 'points',
        amount: basePoints,
        description: 'Victory Points',
        timestamp: new Date()
      });
    }

    // Streak bonus
    const streakMultiplier = this.calculateStreakBonus(currentStreak);
    if (streakMultiplier > 1) {
      const streakBonus = basePoints * (streakMultiplier - 1);
      rewards.push({
        type: 'streak',
        amount: streakBonus,
        description: `${streakMultiplier}x Streak Bonus!`,
        timestamp: new Date()
      });
    }

    // Perfect win
    const perfectBonus = this.calculatePerfectBonus(battleResult);
    if (perfectBonus > 0) {
      rewards.push({
        type: 'perfect',
        amount: perfectBonus,
        description: 'Perfect Victory!',
        timestamp: new Date()
      });
    }

    // Comeback bonus
    const comebackBonus = this.calculateComebackBonus(battleResult);
    if (comebackBonus > 0) {
      rewards.push({
        type: 'comeback',
        amount: comebackBonus,
        description: 'Amazing Comeback!',
        timestamp: new Date()
      });
    }

    const totalPoints = rewards.reduce((sum, reward) => sum + reward.amount, 0);
    this.logDebug(`Total rewards generated: ${rewards.length}`, {
      rewards,
      totalPoints
    });

    return rewards;
  }
} 