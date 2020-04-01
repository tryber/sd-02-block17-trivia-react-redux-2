import React from 'react';
import logo from '../trivia.png';

function Loading() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Carregando...
      </p>
    </header>
  );
}

export default Loading;
