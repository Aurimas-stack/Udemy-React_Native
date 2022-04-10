import { View, StyleSheet } from "react-native";

import Colors from "../util/colors";

const Card = (props) => {
  return <View style={styles.card}>{props.children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    borderRadius: 8,
    elevation: 4,
    marginTop: 36,
    padding: 16,
    backgroundColor: Colors.primary800,
  },
});
