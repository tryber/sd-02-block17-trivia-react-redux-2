import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import propTypes from 'prop-types';
import changeUser from '../actions/changeUser';
import loadQuestions from '../actions/loadQuestions';
import './style/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldRedirect: false };
  }

  returnInputs() {
    const { handleChange } = this.props;
    return (
      <div>
        <div>
          <p>Email do Gravatar:</p>
          <input name="gravatarEmail" onChange={handleChange} data-testid="input-gravatar-email" />
        </div>
        <div>
          <p>Nome do Jogador:</p>
          <input name="name" onChange={handleChange} data-testid="input-player-name" />
        </div>
      </div>
    );
  }

  render() {
    const { name, gravatarEmail } = this.props;
    const { shouldRedirect } = this.state;

    if (shouldRedirect) return <Redirect to="/game" />;

    return (
      <div className="home">
        <Link to="/Settings">
          <div className="config-button">
            <button data-testid="config-button" />
          </div>
        </Link>
        {this.returnInputs()}
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
