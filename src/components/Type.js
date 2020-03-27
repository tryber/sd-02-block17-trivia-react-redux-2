import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeType } from '../actions/questionFilter';

function QuestionType ({ changeSettings }) {
  return (
    <select
    name='type'
    data-testid='question-type-dropdown'
    onChange={(x) => changeSettings(changeType, x.target.value)}
  >
    <option value='any'> Any Type</option>
    <option value='multiple'>Multiple Choice</option>
    <option value='boolean'>True/False</option>
  </select>
  );
}

QuestionType.propTypes = {
  changeSettings: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  changeSettings: (callActions, value) => dispatch(callActions(value)),
});

export default connect(null, mapDispatchToProps)(QuestionType);
