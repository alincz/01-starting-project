import React, { useState } from "react";
import ResultsTable from "./components/ResultsTable/ResultsTable";
import UserInput from "./components/UserInput/UserInput";
import Header from "./components/Header/Header";


function App() {
  const [userInput, setUserInput] = useState(null);
  
  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

  const yearlyData = []; // per-year results

  if (userInput) {
    //am pus totul intr-un if pentr a evita erori si pentru a accesa aceste proprietati ale userInput doar cand nu sunt nule si sunt true.
    let currentSavings = +userInput["current-savings"];
    const yearlyContribution = +userInput["yearly-contribution"];
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header />
      <UserInput onCalculate={calculateHandler} />
      {/* onCalculate comunica cu UserInput si se afla in functia submitHandler
      cand dam click pe submit se declanseaza functia calculateHandler */}
      {!userInput && <p style={{textAlign: 'center'}}>No investment calculated yet.</p>} {/**aici afiseaza in mod dinamic un text de rezerva in cazul in care nu este userInput este null */}
     {userInput  && <ResultsTable  data={yearlyData} initialInvestment={userInput['current-savings']}/> }  {/**si aici vrem sa afisam tabelul daca datele introduse
      * de utilizator sunt adevarate, deoarece avem un userInput ,daca nu este null ,vom efectua calculele aici si,prin urmare,vom avea un rezultat
      la asta ma refer {userInput  && <ResultsTable/>}
      */}
    </div>
  );
}

export default App;
