
import { Link } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleMain}>Showdown</Text>
        <Text style={styles.titleSub}>Card Game</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Link href="/game-modes" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Play Game</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/leaderboard" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Leaderboard</Text>
          </TouchableOpacity>
        </Link>
      
        <Link href="/contact" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Contact</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  titleMain: {
    fontSize: 48,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -1,
  },
  titleSub: {
    fontSize: 18,
    color: '#666666',
    marginTop: 4,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  buttonContainer: {
    width: width * 0.85,
    gap: 16,
  },
  button: {
    backgroundColor: 'transparent',
    padding: 16,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 0,
  },
  buttonText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 1,
  },
  secondaryButton: {
    borderColor: '#666666',
    borderWidth: 1,
  },
  secondaryButtonText: {
    color: '#666666',
    fontWeight: '500',
  },
});
