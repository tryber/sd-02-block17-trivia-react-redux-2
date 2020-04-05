import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from './Loading';
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
  }

  callbackProximaPergunta() {
    // this.setState((state) => ({ indexPergunta: state.indexPergunta + 1 }));
    this.setState({ shouldRenderNextButton: true });
  }

  callbackFeedback() {
    // this.setState((state) => ({ indexPergunta: state.indexPergunta + 1 }));
    this.setState({ shouldRedirect: true });
  }

  render() {
    const { data, isLoading, response } = this.props;
    const { indexPergunta, shouldRenderNextButton, shouldRedirect } = this.state;
    if (response === 4) {
      alert('A categoria escolhida não possui perguntas type boolean, você será redirecionado para a tela de configurações');
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
          indexPergunta={indexPergunta}
        />
        {shouldRenderNextButton &&
          <button
            onClick={() => this.setState((state) => ({ indexPergunta: state.indexPergunta + 1 }))}
          >
            PRÓXIMA
          </button>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ loadReducer: { data, isLoading, response } }) => ({
  data, isLoading, response,
});

Game.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

Game.defaultProps = {
  data: [],
};

export default connect(mapStateToProps)(Game);
