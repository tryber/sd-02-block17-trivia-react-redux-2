import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header';
import EachQuestion from './EachQuestion';

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

  callbackProximaPergunta() {
    // this.setState((state) => ({ indexPergunta: state.indexPergunta + 1 }));
    this.setState({ shouldRenderNextButton: true });
  }

  callbackFeedback() {
    // this.setState((state) => ({ indexPergunta: state.indexPergunta + 1 }));
    setTimeout(
    () => this.setState({ shouldRedirect: true }),
    2000,
    );
  }

  renderNextQuestion() {
    this.setState((state) => ({
      indexPergunta: state.indexPergunta + 1,
      shouldRenderNextButton: false,
    }));
  }

  render() {
    const { dataMock } = this.props;
    const { indexPergunta, shouldRenderNextButton, shouldRedirect } = this.state;

    if (shouldRedirect) return <Redirect to="/feedback" />;

    return (
      <div>
        <Header />
        <EachQuestion
          callbackProximaPergunta={this.callbackProximaPergunta}
          callbackFeedback={this.callbackFeedback}
          callbackRenderNextQuestion={this.renderNextQuestion}
          pergunta={dataMock[indexPergunta]}
          indexPergunta={indexPergunta}
        />
        {shouldRenderNextButton &&
          <button
            onClick={this.renderNextQuestion}
          >
            PRÓXIMA
          </button>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ loadReducer: { dataMock } }) => ({
  dataMock,
});

Game.propTypes = {
  dataMock: PropTypes.arrayOf(PropTypes.object),
};

Game.defaultProps = {
  dataMock: [],
};

export default connect(mapStateToProps)(Game);
