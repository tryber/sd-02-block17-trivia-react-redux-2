import React, { Component } from 'react';
import '../components/style/QuestionsPage.css';

class QuestionsPage extends Component {

  renderHeader() {
    return (
      <header className="container-renderHeader">
        <div className="container-imgPlayer">
          <div className="container-img">
            Imagem Aqui
          </div>
          <div className="container-player">
          Jogador: Aqui
          </div>
        </div>
        <div className="container-points">
          Pontos: Aqui
        </div>
    </header>
    )
  }

  render() {
    return (
      <div className="container-questions">
        <div className="container-Header">
          {this.renderHeader()}
        </div>
        <div className="container-page">
          Página
        </div>
      </div>
    )
  }
}

export default QuestionsPage;
