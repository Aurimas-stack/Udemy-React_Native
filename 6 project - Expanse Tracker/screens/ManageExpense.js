import { useLayoutEffect, useContext } from "react";

import { ExpensesContext } from "../store/expenses-context";

import { View, StyleSheet } from "react-native";
import Button from "../components/ui/Button";

import IconButton from "../components/ui/IconButton";

import { GlobalStyles } from "../constants/styles";

const ManageExpense = ({ route, navigation }) => {
  const expCtx = useContext(ExpensesContext);

  const id = route.params?.expenseId;
  const exists = !!id;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: exists ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, exists]);

  const deleteExpenseHandler = () => {
    expCtx.deleteExpense(id);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    if(exists) {
        expCtx.updateExpense();
    } else {
        expCtx.addExpense()
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {exists ? "Update" : "Add"}
        </Button>
      </View>
      {exists && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
