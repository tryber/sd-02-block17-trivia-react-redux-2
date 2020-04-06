import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import imageLink from '../service/hashConverter';
import Header from './Header';
import playerCleanupAction from '../actions/playerCleanupAction';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldRedirectToRanking: false, shouldRedirectToHome: false };
    this.restartGame = this.restartGame.bind(this);
    this.redirectRank = this.redirectRank.bind(this);
  }

  componentDidMount() {
    const { score, name, gravatarEmail } = this.props;
    const rank = JSON.parse(localStorage.getItem('ranking')) || [];
    const playerData = { name, score, picture: imageLink(gravatarEmail) };
    rank.push(playerData);
    const playersScore = rank.map((player) => player.score);
    const scoreRank = playersScore.sort((a, b) => b - a);
    const playersRank = scoreRank.map((x) => rank.find((player) => player.score === x));
    localStorage.setItem('ranking', JSON.stringify(playersRank));
  }

  restartGame() {
    const { clearPlayer, limparDadosRequisicao } = this.props;
    clearPlayer();
    limparDadosRequisicao();
    this.setState({ shouldRedirectToHome: true });
  }

  redirectRank() {
    this.setState({ shouldRedirectToRanking: true });
  }

  renderSection() {
    const { score, assertions } = this.props;
    const message = assertions < 3 ? 'Podia ser melhor...' : 'Mandou bem!';

    return (
      <section>
        <h1 data-testid="feedback-text">{message}</h1>
        <p data-testid="feedback-total-question">{`Você acertou ${assertions} questões!`}</p>
        <p data-testid="feedback-total-score">{`Um total de ${score} pontos`}</p>
        <div className="buttons">
          <button
            onClick={this.redirectRank}
            className="btn-ranking"
          >
            VER RANKING
          </button>
          <button
            onClick={this.restartGame}
            className="btn-play"
          >
            JOGAR NOVAMENTE
          </button>
        </div>
      </section>
    );
  }

  render() {
    const { shouldRedirectToRanking, shouldRedirectToHome } = this.state;

    if (shouldRedirectToRanking) return <Redirect to="/ranking" />;
    if (shouldRedirectToHome) return <Redirect to="/" />;

    return (
      <div>
        <Header configButton />
        {this.renderSection()}
      </div>
    );
  }
}

const mapStateToProps = ({ player: { gravatarEmail, name, score, assertions } }) => ({
  gravatarEmail,
  name,
  score,
  assertions,
});

const mapDispatchToProps = (dispatch) => ({
  clearPlayer: () => dispatch(playerCleanupAction()),
  limparDadosRequisicao: () => dispatch({ type: 'CLEAR_REQUEST' }),
});

Feedback.propTypes = {
  score: propTypes.number.isRequired,
  assertions: propTypes.number.isRequired,
  clearPlayer: propTypes.func.isRequired,
  limparDadosRequisicao: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
  gravatarEmail: propTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
