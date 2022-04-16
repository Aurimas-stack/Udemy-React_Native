import { Text, View, TextInput, StyleSheet } from "react-native";

import { Colors } from "../../constants/colors";

const TitlePicker = ({ onChangeTitle, title }) => {
  return (
    <View>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeTitle}
        value={title}
      />
    </View>
  );
};

export default TitlePicker;

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
