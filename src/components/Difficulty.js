import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeDifficulty } from '../actions/questionFilter';

function QuestionDifficulty({ changeSettings }) {
  return (
    <select
      name="difficulty"
      data-testid="question-difficulty-dropdown"
      onChange={(e) => changeSettings(changeDifficulty, e.target.value)}
    >
      <option value="any">Any Difficulty</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  );
}

QuestionDifficulty.propTypes = {
  changeSettings: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  changeSettings: (callActions, value) => dispatch(callActions(value)),
});

export default connect(null, mapDispatchToProps)(QuestionDifficulty);
