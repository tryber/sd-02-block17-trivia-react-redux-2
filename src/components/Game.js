import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from './Loading';
import Header from './Header';
import EachQuestion from './EachQuestion';
import playerCleanupAction from '../actions/playerCleanupAction';
import './style/Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
      indexPergunta: 0,
      shouldRenderNextButton: false,
    };
    this.callbackProximaPergunta = this.callbackProximaPergunta.bind(this);
    this.callbackFeedback = this.callbackFeedback.bind(this);
    this.renderNextQuestion = this.renderNextQuestion.bind(this);
  }

  componentDidUpdate() {
    const { token } = this.props;
    localStorage.setItem('token', token);
  }

  callbackProximaPergunta() {
    this.setState({ shouldRenderNextButton: true });
  }

  callbackFeedback() {
    setTimeout(
    () => this.setState({ shouldRedirect: true }),
    5000,
    );
  }

  redirect() {
    const { response, playerClear } = this.props;
    const { shouldRedirect } = this.state;
    if (response === 4) {
      alert('A combinação escolhida nas configurações não retorna nenhuma pergunta da API, você será redirecionado para a tela de configurações');
      return <Redirect to="/settings" />;
    }

    if (shouldRedirect) {
      return <Redirect to="/feedback" />;
    }

    playerClear();
    return <Redirect to="/" />;
  }

  renderGame() {
    const { data } = this.props;
    const { indexPergunta, shouldRenderNextButton } = this.state;
    return (
      <div>
        <Header />
        <EachQuestion
          callbackProximaPergunta={this.callbackProximaPergunta}
          callbackFeedback={this.callbackFeedback}
          pergunta={data[indexPergunta]}
          callbackRenderNextQuestion={this.renderNextQuestion}
          indexPergunta={indexPergunta}
        />
        {shouldRenderNextButton &&
          <div className="div-proxima-pergunta">
            <button
              onClick={this.renderNextQuestion}
              className="button-proxima-pergunta"
            >
              PRÓXIMA
            </button>
          </div>
        }
      </div>
    );
  }

  renderNextQuestion() {
    this.setState((state) => ({
      indexPergunta: state.indexPergunta + 1,
      shouldRenderNextButton: false,
    }));
  }

  render() {
    const { isLoading, response, data } = this.props;
    const { shouldRedirect } = this.state;

    if ((!isLoading && data.length === 0) || response === 3 || response === 4 || shouldRedirect) {
      return this.redirect();
    }

    if (isLoading) return (<div><Loading /></div>);

    return this.renderGame();
  }
}

const mapStateToProps = ({ loadReducer: { data, isLoading, response, token } }) => ({
  data, isLoading, response, token,
});

const mapDispatchToProps = (dispatch) => ({
  playerClear: () => dispatch(playerCleanupAction()),
});

Game.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool.isRequired,
  response: PropTypes.number,
  token: PropTypes.string.isRequired,
  playerClear: PropTypes.func.isRequired,
};

Game.defaultProps = {
  data: [],
  response: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
