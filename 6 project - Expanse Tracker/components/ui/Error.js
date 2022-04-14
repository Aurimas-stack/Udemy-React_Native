import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";

const Error = (props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occured</Text>
      <Text style={styles.text}>{props.message}</Text>
      <Button onPress={props.onConfirm}>Okay</Button>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
    color: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
