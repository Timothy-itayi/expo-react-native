import { BattleResult, RoundResult } from '../../types/rewards';

export class BattleTracker {
  private roundHistory: RoundResult[] = [];
  private playerCardLosses: number = 0;
  private cpuCardLosses: number = 0;

  // Debug logging helper
  private logDebug(message: string, data?: any) {
    console.log(`🎲 [BattleTracker] ${message}`, data ? data : '');
  }

  startNewBattle(): void {
    this.roundHistory = [];
    this.playerCardLosses = 0;
    this.cpuCardLosses = 0;
    this.logDebug('Started new battle');
  }

  recordRound(roundResult: RoundResult): void {
    this.roundHistory.push(roundResult);
    
    if (roundResult.result === 'CPU') {
      this.playerCardLosses++;
    } else if (roundResult.result === 'Player') {
      this.cpuCardLosses++;
    }

    this.logDebug('Round recorded', {
      result: roundResult.result,
      attribute: roundResult.attribute,
      playerCardLosses: this.playerCardLosses,
      cpuCardLosses: this.cpuCardLosses
    });
  }

  getBattleResult(): BattleResult {
    const playerWins = this.cpuCardLosses;
    const cpuWins = this.playerCardLosses;
    
    // Perfect win: player didn't lose any cards
    const isPerfectWin = this.playerCardLosses === 0 && playerWins > 0;
    
    // Comeback win: player was behind at some point but won
    const isComebackWin = this.wasPlayerBehind() && playerWins > cpuWins;

    const result = {
      playerWins,
      cpuWins,
      isPerfectWin,
      isComebackWin,
      roundResults: [...this.roundHistory]
    };

    this.logDebug('Battle result calculated', result);
    return result;
  }

  private wasPlayerBehind(): boolean {
    let playerCards = 3; // Starting cards
    let cpuCards = 3;
    let wasBehind = false;
    
    for (const round of this.roundHistory) {
      if (round.result === 'Player') {
        playerCards++;
        cpuCards--;
      } else if (round.result === 'CPU') {
        playerCards--;
        cpuCards++;
      }
      
      // Check if player was ever behind
      if (playerCards < cpuCards) {
        wasBehind = true;
        this.logDebug('Player was behind', {
          playerCards,
          cpuCards,
          roundNumber: this.roundHistory.indexOf(round) + 1
        });
        break;
      }
    }
    
    return wasBehind;
  }

  // Debug helper methods
  getCurrentState(): any {
    return {
      roundsPlayed: this.roundHistory.length,
      playerCardLosses: this.playerCardLosses,
      cpuCardLosses: this.cpuCardLosses,
      roundHistory: this.roundHistory.map(round => ({
        result: round.result,
        attribute: round.attribute
      }))
    };
  }
} 