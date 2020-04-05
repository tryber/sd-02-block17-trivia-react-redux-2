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
      tempo: 30,
    };
    this.handleClick = this.handleClick.bind(this);
    this.acaoACadaSegundo = this.acaoACadaSegundo.bind(this);
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
    // const { tempo } = this.state;
    // setInterval(
    //   () => this.setState((state) => ({ tempo: state.tempo - 1 })),
    //   1000,
    // );
    this.timer();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pergunta !== this.props.pergunta) {
      this.geraAlternativasMisturadas();
      // clearInterval();
      clearInterval(this.intervalo);
      this.timer();
    }
  }

  setaClasse(alternativa) {
    const { foiRespondido } = this.state;
    // const { dataMock } = this.props;
    // const primeiraPergunta = dataMock[0];
    const { pergunta: { correct_answer: correctAnswer } } = this.props;
    if (foiRespondido) {
      return (alternativa === correctAnswer) ? 'correct-answer' : 'incorrect-answer';
    }
    return '';
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
    this.setState({ arrayAlternativas, foiRespondido: false });
  }

  calculaPeso() {
    const { pergunta: { difficulty } } = this.props;
    switch (difficulty) {
      case 'easy': return 1;
      case 'medium': return 2;
      case 'hard': return 3;
      default: return 0;
    }
  }

  handleClick(event) {
    clearInterval(this.intervalo);
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
    const { tempo } = this.state;
    if (value === correctAnswer) {
      alteraPlacar(this.calculaPeso(), tempo);
    }

    if (indexPergunta !== 1) {
      callbackProximaPergunta();
    } else {
      callbackFeedback();
    }
  }

  acaoACadaSegundo() {
    const { tempo } = this.state;
    const { indexPergunta, callbackProximaPergunta, callbackFeedback } = this.props;
    if (tempo > 0) {
      this.setState((state) => ({ tempo: state.tempo - 1 }));
      if (tempo === 1 && indexPergunta < 1) {
        callbackProximaPergunta();
        this.setState({ foiRespondido: true });
      } else if (tempo === 1) {
        callbackFeedback();
        this.setState({ foiRespondido: true });
      }
    }
  }

  timer() {
    this.setState({ tempo: 30 });
    this.intervalo = setInterval(
      this.acaoACadaSegundo,
      1000,
    );
    // const { foiRespondido } = this.state;
    // if (!foiRespondido) {
    //   clearInterval(this.intervalo);
    // }
  }

  renderizaOTempo() {
    const { tempo } = this.state;
    // setInterval(
    //   () => this.setState((state) => ({ tempo: state.tempo - 1 })),
    //   1000,
    // );
    return (
      <div className="time">
        <p>{`Tempo: ${tempo}`}</p>
      </div>
    );
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
    const { pergunta: { category, question, correct_answer: correctAnswer } } = this.props;

    return (
      <div className="each-question">
        <div className="question-box">
          <h3>{category}</h3>
          <p data-testid="question-text">{question}</p>
        </div>
        <div className="alternatives">
          {arrayAlternativas.map((item, index) => (
            <button
              className={`answer ${this.setaClasse(item)}`}
              value={item}
              onClick={this.handleClick}
              disabled={foiRespondido}
              data-testid={(item === correctAnswer) ? 'correct-answer' : `wrong-answer-${index}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    );
  }

  render() {
    // const { tempo } = this.state;
    // const { callbackProximaPergunta, indexPergunta, callbackFeedback } = this.props;
    // if (tempo === 0 && indexPergunta !== 1) {
    //   clearInterval(this.intervalo);
    //   this.setState({ foiRespondido: true });
    //   callbackProximaPergunta();
    // } else if (tempo === 0) {
    //   setTimeout(callbackFeedback, 1000);
    // }
    // if (tempo === 0 && indexPergunta !== 1) {
    //   clearInterval(this.intervalo);
    //   setTimeout(
    //     () => this.setState({ tempo: 30 }),
    //     1000,
    //   );
    //   setTimeout(callbackRenderNextQuestion, 1000);
    // } else if (tempo === 0 && indexPergunta === 1) {
    //   clearInterval(this.intervalo);
    //   setTimeout(callbackFeedback, 1000);
    // }
    return (
      <div className="pergunta-e-tempo">
        {this.renderizaAPergunta()}
        {this.renderizaOTempo()}
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
  alteraPlacar: (difficulty, time) => dispatch({
    type: 'CHANGE_PLACAR',
    difficulty,
    time,
  }),
});

EachQuestion.propTypes = {
  pergunta: PropTypes.objectOf(PropTypes.string).isRequired,
  alteraPlacar: PropTypes.func.isRequired,
  callbackProximaPergunta: PropTypes.func.isRequired,
  callbackFeedback: PropTypes.func.isRequired,
  indexPergunta: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EachQuestion);
