import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import imageLink from '../service/hashConverter';
import playerCleanupAction from '../actions/playerCleanupAction';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldRedirectToRanking: false, shouldRedirectToHome: false };
    this.restartGame = this.restartGame.bind(this);
  }

  restartGame() {
    const { clearPlayer } = this.props;
    clearPlayer();
    this.setState({ shouldRedirectToHome: true });
  }

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
          <div className="config-button">
            <button data-testid="config-button" />
          </div>
        </div>
      </header>
    );
  }

  renderSection() {
    const { score, assertions} = this.props;
    const message = assertions < 3 ? 'Podia ser melhor...' : 'Mandou bem!';

    return (
      <section>
        <h1 data-testid="feedback-text">{message}</h1>
        <p data-testid="feedback-total-question">{`Você acertou ${assertions} questões!`}</p>
        <p data-testid="feedback-total-score">{`Um total de ${score} pontos`}</p>
        <div className="buttons">
          <button
            onClick={() => this.setState({ shouldRedirectToRanking: true })}
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
        {this.renderHeader()}
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
});

Feedback.propTypes = {
  gravatarEmail: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
  assertions: propTypes.number.isRequired,
  clearPlayer: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
