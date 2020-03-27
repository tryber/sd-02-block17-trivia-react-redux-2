import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeCategory } from '../actions/questionFilter';

function QuestionCategory({ categories, changeSettings }) {
  return (
    <select
      name="category"
      data-testid="question-category-dropdown"
      onChange={(e) => changeSettings(changeCategory, e.target.value)}
    >
      <option key="key" value="any">Any Category</option>
      {categories && categories.trivia_categories
          .map((categoryObject) =>
            <option key={categoryObject.name} value={categoryObject.id}>
              {categoryObject.name}
            </option>,
        )}
    </select>
  );
}

QuestionCategory.propTypes = {
  categories: PropTypes.shape({
    trivia_categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }),
  changeSettings: PropTypes.func.isRequired,
};

QuestionCategory.defaultProps = {
  categories: null,
};

// const mapStateToProps = ({ Database: { categories } }) => ({ categories });

const mapDispatchToProps = (dispatch) => ({
  changeSettings: (callActions, value) => dispatch(callActions(value)),
});

export default connect(null, mapDispatchToProps)(QuestionCategory);
