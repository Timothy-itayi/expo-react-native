import { Link } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function ContactScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleMain}>Contact</Text>
        <Text style={styles.titleSub}>get in touch</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>
          For any questions or feedback about the game, please contact us at:
        </Text>
        <TouchableOpacity>
          <Text style={styles.email}>support@cardgame.com</Text>
        </TouchableOpacity>
      </View>
      <Link href="/" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </Link>
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
  contentContainer: {
    width: width * 0.85,
    alignItems: 'center',
    marginBottom: 40,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666666',
    lineHeight: 24,
  },
  email: {
    fontSize: 22,
    color: '#000000',
    marginBottom: 20,
    fontWeight: '500',
    letterSpacing: 0.5,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: 'transparent',
    padding: 16,
    width: width * 0.85,
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
}); 