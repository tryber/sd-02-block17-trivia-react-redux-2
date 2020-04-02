import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Header from './Header';
// import imageLink from '../service/hashConverter';
import './style/Game.css';

class EachQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foiRespondido: false,
      arrayAlternativas: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

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

  // renderHeader() {
  //   const { gravatarEmail, name, score } = this.props;

  //   return (
  //     <header>
  //       <div className="header-left">
  //         <div className="gravatar-image">
  //           <img alt="gravatar" src={imageLink(gravatarEmail)} />
  //         </div>
  //         <p data-testid="header-player-name">{`Jogador: ${name}`}</p>
  //       </div>
  //       <div className="header-right">
  //         <p data-testid="header-score">{`Pontos: ${score}`}</p>
  //         {/* <div className="config-button">
  //           <button data-testid="config-button" />
  //         </div> */}
  //       </div>
  //     </header>
  //   );
  // }

  componentDidMount() {
  //   const { pergunta } = this.props;
  //   // const primeiraPergunta = dataMock[0];
  //   const { correct_answer: correctAnswer, incorrect_answers: incorrectAnswers } = pergunta;

  //   const arrayAlternativas = [correctAnswer];
  //   let indexNovaAlternativa;

  //   incorrectAnswers.forEach((item, index) => {
  //     indexNovaAlternativa = Math.round(Math.random() * (index + 1));
  //     arrayAlternativas.splice(indexNovaAlternativa, 0, incorrectAnswers[index]);
  //   });
  //   this.setState({ arrayAlternativas });

    this.geraAlternativasMisturadas();
  }

  setaClasse(alternativa) {
    const { foiRespondido } = this.state;
    // const { dataMock } = this.props;
    // const primeiraPergunta = dataMock[0];
    const { pergunta: { correct_answer: correctAnswer } } = this.props;
    if (foiRespondido) {
      return (alternativa === correctAnswer) ? 'correct-answer' : 'incorrect-answer';
    }
    return 'alternative-button';
  }

  geraAlternativasMisturadas() {
    const { pergunta } = this.props;
    // const primeiraPergunta = dataMock[0];
    const { correct_answer: correctAnswer, incorrect_answers: incorrectAnswers } = pergunta;

    const arrayAlternativas = [correctAnswer];
    let indexNovaAlternativa;

    incorrectAnswers.forEach((item, index) => {
      indexNovaAlternativa = Math.round(Math.random() * (index + 1));
      arrayAlternativas.splice(indexNovaAlternativa, 0, incorrectAnswers[index]);
    });
    this.setState({ arrayAlternativas });
  }

  handleClick(event) {
    this.setState({ foiRespondido: true });

    // const { dataMock, alteraPlacar } = this.props;
    // const primeiraPergunta = dataMock[0];
    const {
      pergunta: { correct_answer: correctAnswer },
      alteraPlacar,
      indexPergunta,
      callbackProximaPergunta,
      callbackFeedback,
    } = this.props;
    const { value } = event.target;
    if (value === correctAnswer) {
      alteraPlacar();
    }

    if (indexPergunta > 0) {
      callbackProximaPergunta();
    } else {
      setTimeout(callbackFeedback, 2000);
    }
  }

  renderizaAPergunta() {
    // const { dataMock } = this.props;
    // const primeiraPergunta = dataMock[0];
    // const { category, question, correct_answer, incorrect_answers } = primeiraPergunta;
    // // const indexRespostaCorreta = Math.round(Math.random() * incorrect_answers.length);
    // // const arrayAlternativas = [...incorrect_answers];
    // // arrayAlternativas.splice(indexRespostaCorreta, 0, correct_answer);

    // const arrayAlternativas = [correct_answer];
    // let indexNovaAlternativa;

    // incorrect_answers.forEach((item, index) => {
    //   indexNovaAlternativa = Math.round(Math.random() * (index + 1));
    //   arrayAlternativas.splice(indexNovaAlternativa, 0, incorrect_answers[index]);
    // });
    // let indexNovaAlternativa = Math.round(Math.random() * 1);
    // arrayAlternativas.splice(indexNovaAlternativa, 0, incorrect_answers[0]);
    // indexNovaAlternativa = Math.round(Math.random() * 2);
    // arrayAlternativas.splice(indexNovaAlternativa, 0, incorrect_answers[1]);
    // indexNovaAlternativa = Math.round(Math.random() * 3);
    // arrayAlternativas.splice(indexNovaAlternativa, 0, incorrect_answers[2]);

    const { arrayAlternativas, foiRespondido } = this.state;
    // const { pergunta } = this.props;
    // const primeiraPergunta = dataMock[0];
    const { pergunta: { category, question } } = this.props;

    return (
      <div>
        <div className="question-box">
          <h3>{category}</h3>
          <p>{question}</p>
        </div>
        <div className="alternatives">
          {arrayAlternativas.map((item) => (
            <button
              className={this.setaClasse(item)}
              value={item}
              onClick={this.handleClick}
              disabled={foiRespondido}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {/* <Header /> */}
        {this.renderizaAPergunta()}
      </div>
    );
  }
}

const mapStateToProps = ({
  loadReducer: { dataMock },
  player: { gravatarEmail, name, score },
}) => ({
  gravatarEmail,
  name,
  score,
  dataMock,
});

const mapDispatchToProps = (dispatch) => ({
  alteraPlacar: () => dispatch({ type: 'CHANGE_PLACAR' }),
});

EachQuestion.propTypes = {
  pergunta: PropTypes.objectOf(PropTypes.string).isRequired,
  alteraPlacar: PropTypes.func.isRequired,
  callbackProximaPergunta: PropTypes.func.isRequired,
  callbackFeedback: PropTypes.func.isRequired,
  indexPergunta: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EachQuestion);
