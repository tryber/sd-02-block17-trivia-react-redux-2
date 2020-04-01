import React, { Component } from 'react';
import './style/Game.css';

class Game extends Component {

  renderHeader() {
    return (
      <header className="header-left">
        <div className="gravatar-image">
            Imagem Aqui
          <p data-testid="header-player-name">{`Jogador: Jogador`}</p>
        </div>
        <div className="header-right">
          <p data-testid="header-score">{`Pontos: Pontos`}</p>
        </div>
    </header>
    )
  }

  renderGame() {
    return (
      <div>
        <div>
          Titulo Pergunta
          <p>Pergunta</p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="container-questions">
        <div className="container-Header">
          {this.renderHeader()}
        </div>
        <div className="container-page">
          {this.renderGame()}
        </div>
      </div>
    )
  }
}

export default Game;
