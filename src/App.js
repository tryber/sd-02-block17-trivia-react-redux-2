import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Loading from './components/Loading';
import Home from './components/Home';
import loadQuestions from './actions/loadAction';
import './App.css';

class App extends Component {

  componentDidMount() {
    const { returnTravisAPI } = this.props;
    const questions = 'api.php?amount=5'
    returnTravisAPI(questions);
  }


  render() {
    const { load } = this.props;
    if (!load) return (<Loading />);
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

const mapStateToProps = ({ loadReducer: { load } }) => ({
  load,
});

const mapDispatchToProps = (dispatch) => ({
  returnTravisAPI: (questions) => dispatch(loadQuestions(questions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  load: propTypes.bool.isRequired,
  returnTravisAPI: propTypes.func.isRequired,
};
