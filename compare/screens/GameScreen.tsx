import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import { cards as allCards, CardType } from '../data/cards';

type Attribute = 'speed' | 'power' | 'grip';

interface RoundResult {
  playerCard: CardType;
  cpuCard: CardType;
  result: 'Player' | 'CPU' | 'Draw';
}

const GameScreen = () => {
  const [deck, setDeck] = useState<CardType[]>([]);
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [cpuHand, setCpuHand] = useState<CardType[]>([]);
  const [playerWins, setPlayerWins] = useState<CardType[]>([]);
  const [cpuWins, setCpuWins] = useState<CardType[]>([]);
  const [currentRound, setCurrentRound] = useState<RoundResult | null>(null);

  useEffect(() => {
    const shuffled = [...allCards].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setPlayerHand(shuffled.slice(0, 3));
    setCpuHand(shuffled.slice(3, 6));
  }, []);

  const handleAttributeSelect = (attr: Attribute) => {
    const playerCard = playerHand[0];
    const cpuCard = cpuHand[0];

    const playerValue = playerCard[attr];
    const cpuValue = cpuCard[attr];

    let result: RoundResult['result'] = 'Draw';

    if (playerValue > cpuValue) result = 'Player';
    else if (cpuValue > playerValue) result = 'CPU';

    if (result === 'Player') {
      setPlayerWins([...playerWins, playerCard, cpuCard]);
    } else if (result === 'CPU') {
      setCpuWins([...cpuWins, playerCard, cpuCard]);
    }

    setPlayerHand(playerHand.slice(1));
    setCpuHand(cpuHand.slice(1));
    setCurrentRound({ playerCard, cpuCard, result });
  };

  const resetGame = () => {
    const reshuffled = [...allCards].sort(() => Math.random() - 0.5);
    setDeck(reshuffled);
    setPlayerHand(reshuffled.slice(0, 3));
    setCpuHand(reshuffled.slice(3, 6));
    setPlayerWins([]);
    setCpuWins([]);
    setCurrentRound(null);
  };

  const renderHand = () => (
    <FlatList
      horizontal
      data={playerHand}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Card card={item} />}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compare 🚗</Text>

      {currentRound && (
        <View style={styles.roundInfo}>
          <Text>🔹 You Played: {currentRound.playerCard.name}</Text>
          <Text>🔸 CPU Played: {currentRound.cpuCard.name}</Text>
          <Text>🏁 Winner: {currentRound.result}</Text>
        </View>
      )}

      <Text style={styles.label}>Your Hand:</Text>
      {renderHand()}

      <View style={styles.buttonContainer}>
        <Text>Select Attribute to Compare:</Text>
        <Button title="Speed" onPress={() => handleAttributeSelect('speed')} />
        <Button title="Power" onPress={() => handleAttributeSelect('power')} />
        <Button title="Grip" onPress={() => handleAttributeSelect('grip')} />
      </View>

      <Text>Player Wins: {playerWins.length}</Text>
      <Text>CPU Wins: {cpuWins.length}</Text>

      {playerHand.length === 0 && (
        <View style={styles.resultSection}>
          <Text style={styles.winner}>
            🎉 {playerWins.length > cpuWins.length ? 'You Win!' : 'CPU Wins!'}
          </Text>
          <Button title="Play Again" onPress={resetGame} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
  label: { marginTop: 10 },
  roundInfo: { marginVertical: 10 },
  buttonContainer: { marginVertical: 10 },
  resultSection: { marginTop: 20 },
  winner: { fontSize: 18 },
});

export default GameScreen;
