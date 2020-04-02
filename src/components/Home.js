import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import propTypes from 'prop-types';
import changeUser from '../actions/updateSettings';
import loadQuestions from '../actions/loadAction';
import './style/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldRedirect: false };
  }

  // componentDidMount() {
  //   const { returnTriviaAPI, player } = this.props;
  //   const questions = 'api.php?amount=5';
  //   returnTriviaAPI(questions);
  //   localStorage.setItem('player', JSON.stringify(player));
  // }

  // componentDidUpdate(prevProps) {
  //   const { player } = this.props;
  //   if (prevProps.player !== player) {
  //     localStorage.setItem('player', JSON.stringify(player));
  //   }
  // }

  render() {
    const { name, gravatarEmail, handleChange} = this.props;
    console.log(this.props)
    const { shouldRedirect } = this.state;

    if (shouldRedirect) return <Redirect to="/game" />;

    return (
      <div className="home">
        <Link to="/Settings">
          <div className="config-button">
            <button data-testid="config-button" />
          </div>
        </Link>
        <div>
          <p>Email do Gravatar:</p>
          <input name="gravatarEmail" onChange={handleChange} data-testid="input-gravatar-email" />
        </div>
        <div>
          <p>Nome do Jogador:</p>
          <input name="name" onChange={handleChange} data-testid="input-player-name" />
        </div>
        <div>
          <button
            disabled={(name && gravatarEmail) ? '' : 'disabled'}
            data-testid="btn-play"
            className="btn-play"
            onClick={() => this.setState({ shouldRedirect: true })}
          >
            JOGAR!
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  player: { name, gravatarEmail },
  loadReducer: { isLoading, error, settings } }) => ({
    name, gravatarEmail, isLoading, error, settings,
  });

const mapDispatchToProps = (dispatch) => ({
  handleChange: (event) => dispatch(changeUser(event.target)),
  returnTriviaAPI: (questions) => dispatch(loadQuestions(questions)),
});

Home.propTypes = {
  name: propTypes.string.isRequired,
  gravatarEmail: propTypes.string.isRequired,
  handleChange: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
