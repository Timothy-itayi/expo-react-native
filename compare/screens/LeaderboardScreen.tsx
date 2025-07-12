import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { DeviceService } from '../services/deviceService';
import { LeaderboardService } from '../services/leaderboardService';

interface LeaderboardEntry {
  user_id: string;
  username: string;
  total_points: number;
  best_streak: number;
  games_played: number;
  win_rate: number;
  rank?: number;
}

const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLeaderboard();
    getCurrentUser();
    testConnection();
  }, []);

  const testConnection = async () => {
    setIsConnected(null);
    setError(null);
    const connected = await LeaderboardService.testConnection();
    setIsConnected(connected);
    if (!connected) {
      setError('Unable to connect to leaderboard service');
    }
  };

  const getCurrentUser = async () => {
    const deviceId = await DeviceService.getDeviceId();
    setCurrentUserId(deviceId);
  };

  const loadLeaderboard = async () => {
    setRefreshing(true);
    try {
      const data = await LeaderboardService.getGlobalLeaderboard();
      const rank = await LeaderboardService.getUserRank();
      
      // Add rank numbers
      const leaderboardWithRanks = data.map((entry, index) => ({
        ...entry,
        rank: index + 1
      }));
      
      setLeaderboard(leaderboardWithRanks);
      setUserRank(rank);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
      setError('Failed to load leaderboard data');
    } finally {
      setRefreshing(false);
    }
  };

  const renderLeaderboardItem = ({ item, index }: { item: LeaderboardEntry; index: number }) => {
    const isCurrentUser = item.user_id === currentUserId;
    
    return (
      <View style={[styles.leaderboardItem, isCurrentUser && styles.currentUserItem]}>
        <View style={styles.rankContainer}>
          <Text style={[styles.rankText, isCurrentUser && styles.currentUserText]}>
            #{item.rank}
          </Text>
        </View>
        
        <View style={styles.userInfo}>
          <Text style={[styles.username, isCurrentUser && styles.currentUserText]}>
            {item.username}
          </Text>
          <Text style={[styles.statsText, isCurrentUser && styles.currentUserText]}>
            {item.games_played} games • {item.win_rate}% win rate
          </Text>
        </View>
        
        <View style={styles.scoreContainer}>
          <Text style={[styles.pointsText, isCurrentUser && styles.currentUserText]}>
            {item.total_points}
          </Text>
          <Text style={[styles.streakText, isCurrentUser && styles.currentUserText]}>
            Best: {item.best_streak}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Global Leaderboard</Text>
        {userRank && (
          <Text style={styles.userRank}>Your Rank: #{userRank}</Text>
        )}
        
        {/* Connection Status */}
        <View style={styles.connectionStatus}>
          {isConnected === null ? (
            <ActivityIndicator size="small" color="#666666" />
          ) : isConnected ? (
            <Text style={styles.connectedText}>Connected to Leaderboard</Text>
          ) : (
            <Text style={styles.errorText}>{error || 'Connection Error'}</Text>
          )}
        </View>
      </View>
      
      <FlatList
        data={leaderboard}
        renderItem={renderLeaderboardItem}
        keyExtractor={(item) => item.user_id}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={() => {
              loadLeaderboard();
              testConnection();
            }} 
          />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {error || (isConnected ? 'No leaderboard data yet' : 'Connecting to leaderboard...')}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
  },
  userRank: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  connectionStatus: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectedText: {
    fontSize: 12,
    color: '#4CAF50',
  },
  errorText: {
    fontSize: 12,
    color: '#f44336',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  leaderboardItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  currentUserItem: {
    backgroundColor: '#f8f8f8',
    borderLeftWidth: 4,
    borderLeftColor: '#000000',
  },
  rankContainer: {
    width: 50,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  statsText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  streakText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  currentUserText: {
    color: '#000000',
    fontWeight: '700',
  },
});

export default LeaderboardScreen; 