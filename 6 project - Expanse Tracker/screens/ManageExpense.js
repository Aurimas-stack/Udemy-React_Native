import { useLayoutEffect, useContext, useState } from "react";

import { View, StyleSheet } from "react-native";

import { ExpensesContext } from "../store/expenses-context";

import IconButton from "../components/ui/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import Loader from "../components/ui/Loader";
import Error from "../components/ui/Error";

import { GlobalStyles } from "../constants/styles";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";

const ManageExpense = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const expCtx = useContext(ExpensesContext);

  const id = route.params?.expenseId;
  const exists = !!id;

  const selectExpense = expCtx.expenses.find(expense => expense.id === id);


  useLayoutEffect(() => {
    navigation.setOptions({
      title: exists ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, exists]);

  const deleteExpenseHandler = async () => {
    setIsLoading(true);
    try {
      await deleteExpense(id);
      expCtx.deleteExpense(id);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense, try again later")
      setIsLoading(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    setIsLoading(true);
    try {
      if (exists) {
        expCtx.updateExpense(id, expenseData);
        await updateExpense(id, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expCtx.addExpense({...expenseData, id: id});
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - try again later");
      setIsLoading(false);
    }
  };

  const errorHandler = () => {
    setError(null);
  }

  if(error && !isLoading) {
    return <Error message={error} onConfirm={errorHandler}/>
  }


  if(isLoading) {
    return <Loader />;
  }

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
