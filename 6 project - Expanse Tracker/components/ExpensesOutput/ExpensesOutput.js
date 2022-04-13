import { View, StyleSheet, Text } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

import { GlobalStyles } from "../../constants/styles";

const ExpensesOutput = ({expenses, period, fallback}) => {
  let content = <Text style={styles.infoText}>{fallback}</Text>;

  if(expenses.length > 0) {
    content = <ExpensesList expenses={expenses}/>;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} period={period} fallback="No expenses found" />
      {content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700
  },
  infoText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32
  }
});
