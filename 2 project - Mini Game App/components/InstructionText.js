import { Text, StyleSheet } from "react-native";

import Colors from "../util/colors";

const InstructionText = (props) => {
  return <Text style={[styles.text, props.style]}>{props.children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
  text: {
    color: Colors.accent500,
    fontFamily: "open-sans",
    fontSize: 24,
  },
});
