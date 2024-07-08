import React from 'react';
import './Home.css';
import { useState } from 'react';

function Home(): JSX.Element {
  const [counter, setCounter]: [number, React.Dispatch<React.SetStateAction<number>>] = useState(0);

  function onClick(): void {
    setCounter(counter + 1);
  }

  return (
    <div className="Home">
      <h1>{counter}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}

export default Home;