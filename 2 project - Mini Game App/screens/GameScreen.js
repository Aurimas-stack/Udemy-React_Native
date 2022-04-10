import { useState, useEffect } from "react";

import { View, StyleSheet, Alert, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/Card";
import InstructionText from "../components/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

const generateRandomBetween = (min, max, exclude) => {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

let min = 1;
let max = 100;

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userNumber);
  const [currGuess, setCurrGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currGuess === props.userNumber) {
      props.onGameOver(guessRounds.length);
      min = 1;
      max = 100;
    }
  }, [currGuess, props.userNumber, props.onGameOver]);

  const nextGuessHandler = (guess) => {
    if (
      (guess === "lower" && currGuess < props.userNumber) ||
      (guess === "higher" && currGuess > props.userNumber)
    ) {
      Alert.alert("Dont lie", "You know this is wrong!", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if (guess === "lower") {
      max = currGuess;
    }

    if (guess === "higher") {
      min = currGuess + 1;
    }

    const newRandomNumb = generateRandomBetween(min, max, currGuess);
    setCurrGuess(newRandomNumb);
    setGuessRounds((prevRounds) => {
      return [newRandomNumb, ...prevRounds];
    });
  };

  return (
    <View style={styles.screen}>
      <Title>Opponenet's Guess</Title>
      <NumberContainer>{currGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(null, "higher")}>
              <Ionicons name="md-add" size={24} color="#fff" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(null, "lower")}>
              <Ionicons name="md-remove" size={24} color="#fff" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem roundNumber={guessRounds.length - itemData.index} guess={itemData.item} />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16
  }
});
