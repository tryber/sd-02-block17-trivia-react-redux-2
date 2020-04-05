import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

  componentDidMount() {
    this.geraAlternativasMisturadas();
    this.timer();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pergunta !== this.props.pergunta) {
      this.geraAlternativasMisturadas();
      clearInterval(this.intervalo);
      this.timer();
    }
  }

  setaClasse(alternativa) {
    const { foiRespondido } = this.state;
    const { pergunta: { correct_answer: correctAnswer } } = this.props;
    if (foiRespondido) {
      return (alternativa === correctAnswer) ? ' correct-answer' : ' incorrect-answer';
    }
    return '';
  }

  geraAlternativasMisturadas() {
    const { pergunta } = this.props;
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

    if (indexPergunta !== 4) {
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
      if (tempo === 1 && indexPergunta < 4) {
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
  }

  renderizaOTempo() {
    const { tempo } = this.state;
    return (
      <div className="time">
        <p>{`Tempo: ${tempo}`}</p>
      </div>
    );
  }

  renderizaAPergunta() {
    const { arrayAlternativas, foiRespondido } = this.state;
    const { pergunta: { category, question, correct_answer: correctAnswer } } = this.props;

    return (
      <div className="each-question">
        <div className="question-box">
          <h3 className="category">{category}</h3>
          <p data-testid="question-text">{question}</p>
        </div>
        <div className="alternatives">
          {arrayAlternativas.map((item, index) => (
            <button
              key={item}
              className={`answer${this.setaClasse(item)}`}
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
  pergunta: PropTypes.instanceOf(Object).isRequired,
  alteraPlacar: PropTypes.func.isRequired,
  callbackProximaPergunta: PropTypes.func.isRequired,
  callbackFeedback: PropTypes.func.isRequired,
  indexPergunta: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EachQuestion);
