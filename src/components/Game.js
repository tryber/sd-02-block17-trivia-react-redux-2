import React, { Component } from 'react';
import { connect } from 'react-redux';
import imageLink from '../service/hashConverter';
import './style/Game.css';

class Game extends Component {
  // static renderHeader() {
  //   return (
  //     <header className="header-left">
  //       <div className="gravatar-image">
  //           Imagem Aqui
  //         <p data-testid="header-player-name">{'Jogador'}</p>
  //       </div>
  //       <div className="header-right">
  //         <p data-testid="header-score">{'Pontos'}</p>
  //       </div>
  //     </header>
  //   );
  // }

  // static renderGame() {
  //   return (
  //     <div>
  //       <div>
  //         Titulo Pergunta
  //         <p>Pergunta</p>
  //       </div>
  //     </div>
  //   );
  // }

  // render() {
  //   return (
  //     <div className="container-questions">
  //       <div className="container-Header">
  //         {this.renderHeader()}
  //       </div>
  //       <div className="container-page">
  //         {this.renderGame()}
  //       </div>
  //     </div>
  //   );
  // }

  renderHeader() {
    const { gravatarEmail, name, score } = this.props;

    return (
      <header>
        <div className="header-left">
          <div className="gravatar-image">
            <img alt="gravatar" src={imageLink(gravatarEmail)} />
          </div>
          <p data-testid="header-player-name">{`Jogador: ${name}`}</p>
        </div>
        <div className="header-right">
          <p data-testid="header-score">{`Pontos: ${score}`}</p>
          {/* <div className="config-button">
            <button data-testid="config-button" />
          </div> */}
        </div>
      </header>
    );
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
      </div>
    );
  }
}

const mapStateToProps = ({ player: { gravatarEmail, name, score } }) => ({
  gravatarEmail,
  name,
  score,
});

export default connect(mapStateToProps)(Game);
