import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Loading from './components/Loading';
import Home from './components/Home';
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
    const { isLoading } = this.props;
    if (isLoading) return (<Loading />);
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

const mapStateToProps = ({ loadReducer: { isLoading }, player }) => ({
  isLoading,
  player,
});

const mapDispatchToProps = (dispatch) => ({
  returnTriviaAPI: (questions) => dispatch(loadQuestions(questions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  load: propTypes.bool.isRequired,
  returnTriviaAPI: propTypes.func.isRequired,
};
