import React, { useEffect, useState } from 'react';
import {
    Button,
    FlatList,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Card from '../components/Card';
import { cards as allCards, CardType } from '../data/cards';
import { GameScreenStyles as styles } from "../styles/GameScreen.styles";

type Attribute = 'speed' | 'power' | 'grip';

interface RoundResult {
  playerCard: CardType;
  cpuCard: CardType;
  result: 'Player' | 'CPU' | 'Draw';
  attribute: Attribute;
}

const GameScreen = () => {
  const [deck, setDeck] = useState<CardType[]>([]);
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [cpuHand, setCpuHand] = useState<CardType[]>([]);
  const [playerWins, setPlayerWins] = useState<CardType[]>([]);
  const [cpuWins, setCpuWins] = useState<CardType[]>([]);
  const [currentRound, setCurrentRound] = useState<RoundResult | null>(null);

  const isGameOver = playerHand.length === 0;

  useEffect(() => {
    const shuffled = [...allCards].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setPlayerHand(shuffled.slice(0, 3));
    setCpuHand(shuffled.slice(3, 6));
    setPlayerWins([]);
    setCpuWins([]);
    setCurrentRound(null);
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
    setCurrentRound({ playerCard, cpuCard, result, attribute: attr });
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

  return (
    <View style={styles.container}>

      {/* Top: CPU Cards */}
      <View style={styles.opponentSection}>
        <Text style={styles.sectionLabel}>Opponent</Text>
        <View style={styles.cpuHand}>
          {cpuHand.map((_, index) => (
            <View key={index} style={styles.hiddenCard} />
          ))}
        </View>
      </View>

      {/* Middle: Battle Zone with score */}
      <View style={styles.battleSection}>
        <Text style={styles.battleTitle}>Battle Zone</Text>

        {/* Score display */}
        <View style={styles.scoreBoard}>
          <Text style={styles.scoreText}>Your Cards: {playerHand.length + playerWins.length}</Text>
          <Text style={styles.scoreText}>CPU Cards: {cpuHand.length + cpuWins.length}</Text>
        </View>

        {currentRound ? (
          <>
            <View style={styles.battleContent}>
              {/* Player Card */}
              <View style={{ alignItems: 'center' }}>
                <Card
                  card={currentRound.playerCard}
                  large
                  selectedAttribute={currentRound.attribute}
                  result={
                    currentRound.playerCard[currentRound.attribute] >
                    currentRound.cpuCard[currentRound.attribute]
                      ? 'win'
                      : currentRound.playerCard[currentRound.attribute] <
                        currentRound.cpuCard[currentRound.attribute]
                      ? 'lose'
                      : 'draw'
                  }
                />
                <Text style={styles.cardLabel}>Your Card</Text>
              </View>

              {/* CPU Card */}
              <View style={{ alignItems: 'center' }}>
                <Card
                  card={currentRound.cpuCard}
                  large
                  selectedAttribute={currentRound.attribute}
                  result={
                    currentRound.cpuCard[currentRound.attribute] >
                    currentRound.playerCard[currentRound.attribute]
                      ? 'win'
                      : currentRound.cpuCard[currentRound.attribute] <
                        currentRound.playerCard[currentRound.attribute]
                      ? 'lose'
                      : 'draw'
                  }
                />
                <Text style={styles.cardLabel}>Opponent's Card</Text>
              </View>
            </View>

            {/* Show draw text only if draw */}
            {currentRound.result === 'Draw' && (
              <Text style={[styles.resultText, { color: '#000' }]}>
                It&apos;s a Draw!
              </Text>
            )}
          </>
        ) : (
          <><Text style={styles.instructions}>Pick a trait to start!
                         </Text>
                          <Text style={styles.instructions}>
                               Who ever has the highest value wins the round.
                            </Text>
                              <Text style={styles.instructions}>
                            The person with the most cards wins the game.
                            </Text></>
        )}
      </View>

      {/* Trait Buttons or End Game Section (bottom) */}
      <View style={styles.traitSection}>
        {!isGameOver ? (
          <View style={styles.traitButtons}>
            <TouchableOpacity
              style={styles.traitButton}
              onPress={() => handleAttributeSelect('speed')}
            >
              <Text style={styles.traitButtonText}>Speed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.traitButton}
              onPress={() => handleAttributeSelect('power')}
            >
              <Text style={styles.traitButtonText}>Power</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.traitButton}
              onPress={() => handleAttributeSelect('grip')}
            >
              <Text style={styles.traitButtonText}>Grip</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.resultSection}>
            <Text style={styles.winnerText}>
              🎉 {playerWins.length > cpuWins.length
                ? 'You Win!'
                : playerWins.length < cpuWins.length
                ? 'CPU Wins!'
                : "It's a Draw!"}
            </Text>
            <Button title="Play Again" onPress={resetGame} />
          </View>
        )}
      </View>

      {/* Bottom: Player Cards */}
      <View style={styles.playerSection}>
        <Text style={styles.sectionLabel}>Your Hand</Text>
        <FlatList
          horizontal
          data={playerHand}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Card card={item} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default GameScreen;
