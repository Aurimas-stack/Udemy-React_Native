import { useContext, useEffect, useState } from "react";

import { ExpensesContext } from "../store/expenses-context";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import Loader from "../components/ui/Loader";
import Error from "../components/ui/Error";

import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/http";

function RecentExpenses() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const expCtx = useContext(ExpensesContext);

  useEffect(() => {
    const fetchExp = async () => {
      setIsLoading(true);
      try {
        const expenses = await getExpenses();
        expCtx.setExpenses(expenses)
      } catch (error) {
        setError("Could not fetch expenses!")
      }
      setIsLoading(false);
    };

    fetchExp();
  }, []);

  const recentExp = expCtx.expenses.filter((exp) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return exp.date >= date7DaysAgo && exp.date <= today;
  });

  const errorHandler = () => {
    setError(null);
  }

  if(error && !isLoading) {
    return <Error message={error} onConfirm={errorHandler}/>
  }

  if(isLoading) {
    return <Loader />
  }

  return (
    <ExpensesOutput
      expenses={recentExp}
      period="Last 7 Days"
      fallback="No expenses found"
    />
  );
}

export default RecentExpenses;
