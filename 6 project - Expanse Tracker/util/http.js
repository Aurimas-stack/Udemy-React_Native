import axios from "axios";

const URL =
  "https://expense-tracker-native-1dc45-default-rtdb.europe-west1.firebasedatabase.app";

export const storeExpense = async (data) => {
  const response = await axios.post(URL + "/expenses.json", data);
  const id = response.data.name;
  return id;
}

export const getExpenses = async () => {
  const response = await axios.get(URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    expenses.push({
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    });
  }
  return expenses;
};

export const updateExpense = (id, expenseData) => {
  return axios.put(URL + `/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id) => {
  return axios.delete(URL + `/expenses/${id}.json`);    
};
