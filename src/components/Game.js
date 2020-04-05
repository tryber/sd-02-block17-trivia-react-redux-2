import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from './Loading';
import Header from './Header';
import EachQuestion from './EachQuestion';
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

  renderNextQuestion() {
    this.setState((state) => ({
      indexPergunta: state.indexPergunta + 1,
      shouldRenderNextButton: false,
    }));
  }

  render() {
    const { data, isLoading, response } = this.props;
    const { indexPergunta, shouldRenderNextButton, shouldRedirect } = this.state;
    if (response === 4) {
      alert('A combinação escolhida nas configurações não retorna nenhuma pergunta da API, você será redirecionado para a tela de configurações');
      return <Redirect to="/settings" />;
    }
    if (isLoading) return (<div><Loading /></div>);
    if (shouldRedirect) return <Redirect to="/feedback" />;

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
}

const mapStateToProps = ({ loadReducer: { data, isLoading, response, token } }) => ({
  data, isLoading, response, token,
});

Game.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool.isRequired,
  response: PropTypes.number,
  token: PropTypes.string.isRequired,
};

Game.defaultProps = {
  data: [],
  response: 0,
};

export default connect(mapStateToProps)(Game);
