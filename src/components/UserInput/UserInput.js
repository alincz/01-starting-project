import React, { useState } from "react";
import classes from './UserInput.module.css'

const initialUserInput = {
  "current-savings": 10000,
  " yearly-contribution": 1200,
  "expected-return": 7,
  duration: 10,
}; //am creat un nou obiect ca sa evitam copierea datelor din state direct
//in setUserInput din functia resetHandler

const UserInput = (props) => {
  const [userInput, setUserInput] = useState(initialUserInput);

  const submitHandler = (e) => {
    e.preventDefault();

    props.onCalculate(userInput); //onCalculate este un custome component care comunica cu App.js cand apelam in interiorul ei comp. <UserInput onCalculate={calculateHandler} />
    //si cu ajutorul props o apelam
  };

  const resetHandler = () => {
    setUserInput(initialUserInput);
  };

  const inputChangeHandler = (input, value) => {
    setUserInput((prevInput) => {
      return {
        ...prevInput, //
        //asa actualizam dinamic acest state object ori de cate ori este executat inputChangeHandler
        [input]: +value, //
      };
    });
  };

  return (
    <div>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes['input-group']}>
          <p>
            <label htmlFor="current-savings">Current Savings ($)</label>
            <input
              onChange={
                (e) => inputChangeHandler("current-savings", e.target.value)
                //e.target.value--este valoarea care va fi furnizata pentru parametrul(value)
                //current-saving--o sa fie folosit ca valoare de intrare pentru parametrul(input)
              }
              value={userInput["current-savings"]} //accesam proprietatea "current-savings" si folosim valoarea acesteia ca valoare pentru acest input
              type="number"
              id="current-savings"
            />
          </p>
          <p>
            <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
            <input
              onChange={(e) =>
                inputChangeHandler("yearly-contribution", e.target.value)
              }
              value={userInput["yearly-contribution"]}
              type="number"
              id="yearly-contribution"
            />
          </p>
        </div>
        <div className={classes['input-group']}>
          <p>
            <label htmlFor="expected-return">
              Expected Interest (%, per year)
            </label>
            <input
              onChange={(e) =>
                inputChangeHandler("expected-return", e.target.value)
              }
              value={userInput["expected-return"]}
              type="number"
              id="expected-return"
            />
          </p>
          <p>
            <label htmlFor="duration">Investment Duration (years)</label>
            <input
              onChange={(e) => inputChangeHandler("duration", e.target.value)}
              value={userInput["duration"]}
              type="number"
              id="duration"
            />
          </p>
        </div>
        <p className={classes.actions}>
          <button onClick={resetHandler} type="reset" className={classes.buttonAlt}>
            Reset
          </button>
          <button type="submit" className={classes.button}>
            Calculate
          </button>
        </p>
      </form>
    </div>
  );
};

export default UserInput;
