import React, { Component } from 'react';

class QuestionsPage extends Component {

  renderHeader() {
    return (
      <header>
        <div>
          Imagem Aqui
        </div>
        <div>
          Jogador: Aqui
        </div>
        <div>
          Pontos: Aqui
        </div>
    </header>
    )
  }

  render() {
    return (
      <div>
        <div>
          {renderHeader}
        </div>
        <div>
          Página
        </div>
      </div>
    )
  }
}

export default QuestionsPage;
