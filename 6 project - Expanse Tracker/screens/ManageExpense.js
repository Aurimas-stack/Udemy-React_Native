import { useLayoutEffect, useContext } from "react";

import { View, StyleSheet } from "react-native";

import { ExpensesContext } from "../store/expenses-context";

import Button from "../components/ui/Button";
import IconButton from "../components/ui/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

import { GlobalStyles } from "../constants/styles";

const ManageExpense = ({ route, navigation }) => {
  const expCtx = useContext(ExpensesContext);

  const id = route.params?.expenseId;
  const exists = !!id;

  const selectExpense = expCtx.expenses.find(expense => expense.id === id);


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

  const confirmHandler = (expenseData) => {
    if (exists) {
      expCtx.updateExpense(id, expenseData);
    } else {
      expCtx.addExpense(expenseData);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        buttonLabel={exists ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectExpense}
      />

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
});
