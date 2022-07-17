import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [start, setStart] = useState(false);
  const [alphabet, setAlphabet] = useState("");
  const [value, setValue] = useState("");
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [best, setBest] = useState(Number.MAX_VALUE);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  var [count, setCount] = useState(0);
  const reset = () => {
    setStart(false);
    setCount(0);
    setAlphabet("");
    setRunning(false);
    setTime(0);
    setValue("")
  };
  const toggle = () => {
    AlphabetGenerator();
    setStart(true);
    setRunning(true);
  };
  const AlphabetGenerator = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomCharacter =
      alphabet[Math.floor(Math.random() * alphabet.length)];
    setAlphabet(randomCharacter);
  };
  const change = (event) => {
    if(start){
    setValue(event.target.value);
    if (count < 20) {
      if (alphabet != event.target.value) {
        setTime(parseInt(time) + parseInt(500));
      }
      count = setCount(count + 1);
      AlphabetGenerator();
    } else  if(count===20){
      console.log(count);
      count = setCount(count + 1);
      setRunning(false);
      if (time < best) {
        setAlphabet("Winner");
        localStorage.setItem('bestItem',time);
      } else {
        setAlphabet("Failure");
      }
      setBest(time);
    }
  }
  };
  return (
    <div className="App">
      <h1>Type the Alphabet</h1>
      <p>Typing game to see how fast you type. Timer Starts when yo do :)</p>
      <div className="center ">
        {!start ? (
          <button onClick={() => toggle()}>Start</button>
        ) : (
          <h3>{alphabet}</h3>
        )}
      </div>
      <input
        type="text"
        onChange={change}
        value={value}
        style={{ backgroudColor: "white" }}
      ></input>
      <button onClick={reset}>Reset</button>
      <div className="numbers">
        <p>Time: 
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
          {("0" + ((time / 10) % 100)).slice(-2)}
        </p>
      </div>
      <div className="bestScore">
        {best === Number.MAX_VALUE ? (
          <p> First Game</p>
        ) : (
          <p>
            My best time is :
            {("0" + Math.floor((best / 60000) % 60)).slice(-2)}:
            {("0" + Math.floor((best / 1000) % 60)).slice(-2)}:
            {("0" + ((best / 10) % 100)).slice(-2)}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
