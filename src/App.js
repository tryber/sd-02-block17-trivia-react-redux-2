import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Loading from './components/Loading';
import Home from './components/Home';
import loadQuestions from './actions/loadAction';
import loadToken from './actions/loadToken';
import './App.css';

class App extends Component {

  componentDidMount() {
    const { returnTravisAPI } = this.props;
    returnTravisAPI();
  }


  render() {
    const { load, data } = this.props;
    console.log(data)
    if (!load) return (<Loading />);
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

const mapStateToProps = ({ loadReducer: { load } }) => ({
  load
});

const mapDispatchToProps = (dispatch) => ({
  returnTravisAPI: () => dispatch(loadQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  load: propTypes.bool.isRequired,
  returnTravisAPI: propTypes.func.isRequired,
};
