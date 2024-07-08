import React from 'react';
import './App.css';
import { useState } from 'react';

function App() {
  const [counter, setCounter] = useState(0);
  function onClick() {
    setCounter(counter + 1);
  }
  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}

export default App;
