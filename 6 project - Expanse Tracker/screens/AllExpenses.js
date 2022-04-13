import {useContext} from "react";

import {ExpensesContext} from "../store/expenses-context"

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

function AllExpenses() {
  const expCtx = useContext(ExpensesContext);

  return <ExpensesOutput expenses={expCtx.expenses} period="Total" />;
}

export default AllExpenses;