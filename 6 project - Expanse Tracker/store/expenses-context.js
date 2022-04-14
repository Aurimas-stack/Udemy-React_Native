import { createContext, useReducer } from "react";


export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const invertedArr = action.payload.reverse();
      return invertedArr;
    case "UPDATE":
      const itemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      const data = state[itemIndex];
      const newItem = { ...data, ...action.payload.data };
      const newItems = [...state];
      newItems[itemIndex] = newItem;
      return newItems;
    case "DELETE":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesContextProvider = (props) => {
  const [state, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const setExpenses = (expenses) => {
    dispatch({type: "SET", payload: expenses});
  }

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  };

  const value = {
    expenses: state,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {props.children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
