import React, { useState } from 'react';
import logo from './logo.png';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleLogin = (data) => {
    console.log("Zalogowano", data);
  };

  const handleSignup = (data) => {
    console.log("Zarejestrowano", data);
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
  <div className="front">
    {!isFlipped ? (
      <Login onLogin={handleLogin} handleFlip={handleFlip} />
    ) : null}
  </div>
  <div className="back">
    {isFlipped ? (
      <Signup onSignup={handleSignup} handleFlip={handleFlip} />
    ) : null}
  </div>
</div>
        </div>
      </header>
    </div>
  );
}

export default App;