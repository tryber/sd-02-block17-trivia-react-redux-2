import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Loading from './components/Loading';
import Home from './components/Home';
import QuestionsPage from './components/QuestionsPage';
import loadQuestions from './actions/loadAction';
import './App.css';

class App extends Component {

  componentDidMount() {
    const { returnTriviaAPI, player } = this.props;
    const questions = 'api.php?amount=5';
    returnTriviaAPI(questions);

    localStorage.setItem('player', JSON.stringify(player));
  }


  render() {
    const { isLoading, error } = this.props;
    if (!isLoading) return (<Loading />);
    if (error) return (<div className="error">{error}</div>);
    return (
      <div className="App">
        <QuestionsPage />
        {/* <Home /> */}
      </div>
    );
  }
}

const mapStateToProps = ({ loadReducer: { isLoading, error }, player }) => ({
  isLoading,
  player,
  error,
});

const mapDispatchToProps = (dispatch) => ({
  returnTriviaAPI: (questions) => dispatch(loadQuestions(questions)),
});

App.propTypes = {
  isLoading: propTypes.bool.isRequired,
  returnTriviaAPI: propTypes.func.isRequired,
  player: propTypes.shape({
    name: propTypes.string.isRequired,
    assertions: propTypes.number.isRequired,
    score: propTypes.number.isRequired,
    gravatarEmail: propTypes.string.isRequired,
  }).isRequired,
  error: propTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
