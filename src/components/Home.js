import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import propTypes from 'prop-types';
import changeUser from '../actions/changeUser';
import loadQuestions from '../actions/loadQuestions';
import './style/Home.css';

export function buttonSettings() {
  return (
    <Link to="/Settings">
      <div className="config-button">
        <button data-testid="config-button" />
      </div>
    </Link>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldRedirect: false };
  }

  returnInputs() {
    const { handleChange, gravatarEmail, name } = this.props;
    return (
      <div>
        <div>
          <p>Email do Gravatar:</p>
          <input
            name="gravatarEmail"
            onChange={handleChange}
            data-testid="input-gravatar-email"
            value={gravatarEmail}
          />
        </div>
        <div>
          <p>Nome do Jogador:</p>
          <input name="name" onChange={handleChange} data-testid="input-player-name" value={name} />
        </div>
      </div>
    );
  }

  linkAPI() {
    const { settings: { category, difficulty, type } } = this.props;
    let finalDoLink = '';
    if (category.length > 0 && category !== 'any') {
      finalDoLink = `${finalDoLink}&category=${category}`;
    }
    if (type.length > 0 && type !== 'any') {
      finalDoLink = `${finalDoLink}&type=${type}`;
    }
    if (difficulty.length > 0 && difficulty !== 'any') {
      finalDoLink = `${finalDoLink}&difficulty=${difficulty}`;
    }
    return finalDoLink;
  }

  requisitionsToGame() {
    const { returnTriviaAPI } = this.props;
    const link = this.linkAPI();
    const questions = 'api.php?amount=5';
    const finalLink = `${questions}${link}`;
    returnTriviaAPI(finalLink);
    this.setState({ shouldRedirect: true });
  }

  render() {
    const { name, gravatarEmail } = this.props;
    const { shouldRedirect } = this.state;

    if (shouldRedirect) return <Redirect to="/game" />;

    return (
      <div className="home">
        {buttonSettings()}
        {this.returnInputs()}
        <div>
          <button
            disabled={(name && gravatarEmail) ? '' : 'disabled'}
            data-testid="btn-play"
            className="btn-play"
            onClick={() => this.requisitionsToGame()}
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
  loadReducer: { isLoading, error, settings, data } }) => ({
    name, gravatarEmail, isLoading, error, settings, data,
  });

const mapDispatchToProps = (dispatch) => ({
  handleChange: (event) => dispatch(changeUser(event.target)),
  returnTriviaAPI: (finalLink) => dispatch(loadQuestions(finalLink)),
});

Home.propTypes = {
  name: propTypes.string.isRequired,
  gravatarEmail: propTypes.string.isRequired,
  handleChange: propTypes.func.isRequired,
  settings: propTypes.instanceOf(Object).isRequired,
  returnTriviaAPI: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
