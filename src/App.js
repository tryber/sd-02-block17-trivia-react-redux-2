import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loading from './components/Loading';
import Home from './components/Home';
import Feedback from './components/Feedback';
import Ranking from './components/Ranking';
import loadQuestions from './actions/loadAction';
import './App.css';

class App extends Component {

  componentDidMount() {
    const { returnTriviaAPI } = this.props;
    const questions = 'api.php?amount=5';
    returnTriviaAPI(questions);
  }

  componentDidUpdate(prevProps) {
    const { player } = this.props;
    if (prevProps.player !== player) {
      localStorage.setItem('player', JSON.stringify(player));
    }
  }

  render() {
    const { isLoading, error } = this.props;
    if (isLoading) return (<Loading />);
    if (error) return (<div className="error">{error}</div>);
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/feedback" component={Feedback} />
          <Route path="/ranking" component={Ranking} />
        </Switch>
      </BrowserRouter>
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
