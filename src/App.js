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
    const { returnTriviaAPI } = this.props;
    const questions = 'api.php?amount=5';
    returnTriviaAPI(questions);
  }


  render() {
    const { load } = this.props;
    if (load) return (<Loading />);
    return (
      <div className="App">
        <QuestionsPage />
        {/* <Home /> */}
      </div>
    );
  }
}

const mapStateToProps = ({ loadReducer: { load } }) => ({
  load,
});

const mapDispatchToProps = (dispatch) => ({
  returnTriviaAPI: (questions) => dispatch(loadQuestions(questions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  load: propTypes.bool.isRequired,
  returnTriviaAPI: propTypes.func.isRequired,
};
