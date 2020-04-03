import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import propTypes from 'prop-types';
import changeUser from '../actions/changeUser';
import loadQuestions from '../actions/loadQuestions';
import getTokenTriviaAPI from '../service/tokenAPI';
import './style/Home.css';

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
    if (category.length > 0) {
      finalDoLink = `${finalDoLink}&category=${category}`;
    }
    if (type.length > 0) {
      finalDoLink = `${finalDoLink}&type=${type}`;
    }
    if (difficulty.length > 0) {
      finalDoLink = `${finalDoLink}&difficulty=${difficulty}`;
    }
    return finalDoLink;
  }

  async requisitionsToGame() {
    const { returnTriviaAPI } = this.props;
    const token = await getTokenTriviaAPI();
    const link = this.linkAPI();
    const questions = 'api.php?amount=5';
    const finalLink = `${questions}${link}&token=${token.token}`;
    returnTriviaAPI(finalLink, token.token);
    //this.setState({ shouldRedirect: true });
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
  loadReducer: { isLoading, error, settings } }) => ({
    name, gravatarEmail, isLoading, error, settings,
  });

const mapDispatchToProps = (dispatch) => ({
  handleChange: (event) => dispatch(changeUser(event.target)),
  returnTriviaAPI: (finalLink, token) => dispatch(loadQuestions(finalLink, token)),
});

Home.propTypes = {
  name: propTypes.string.isRequired,
  gravatarEmail: propTypes.string.isRequired,
  handleChange: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
