import {useContext} from "react";

import { ExpensesContext } from "../store/expenses-context";

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
  const expCtx = useContext(ExpensesContext);

  const recentExp = expCtx.expenses.filter((exp) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return (exp.date >= date7DaysAgo) && (exp.date <= today);
  });

  return <ExpensesOutput expenses={recentExp} period="Last 7 Days" fallback="No expenses found"/>;
}

export default RecentExpenses;