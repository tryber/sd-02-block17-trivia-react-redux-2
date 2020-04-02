import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './components/Home';
import Game from './components/Game';
import propTypes from 'prop-types';
import Feedback from './components/Feedback';
import Ranking from './components/Ranking';
import Settings from './components/Settings';
import './App.css';

class App extends Component {

  componentDidMount() {
    const { name } = this.props;
    console.log(name)
    // const questions = 'api.php?amount=5';
    // returnTriviaAPI(questions);
    localStorage.setItem('player', JSON.stringify(name));
  }

  componentDidUpdate(prevProps) {
    const { name } = this.props;
    if (prevProps.name !== name) {
      localStorage.setItem('player', JSON.stringify(name));
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/game" component={Game} />
          <Route path="/settings" component={Settings} />
          <Route path="/feedback" component={Feedback} />
          <Route path="/ranking" component={Ranking} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({
  player: { name } }) => ({
    name,
  });

export default connect(mapStateToProps)(App);

App.propTypes = {
  name: propTypes.string,
};

App.defaultpropTypes ={
  name: undefined,
}
