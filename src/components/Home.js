import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import changeUser from '../actions/userChangeAction';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldRedirect: false };
  }

  render() {
    const { name, gravatarEmail, handleChange } = this.props;
    const { shouldRedirect } = this.state;

    if (shouldRedirect) return <Redirect to="/feedback" />;

    return (
      <div className="home">
        <div className="config-button">
          <button data-testid="config-button" />
        </div>
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

const mapStateToProps = ({ player: { name, gravatarEmail } }) => ({
  name,
  gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  handleChange: (event) => dispatch(changeUser(event.target)),
});

Home.propTypes = {
  name: propTypes.string.isRequired,
  gravatarEmail: propTypes.string.isRequired,
  handleChange: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
