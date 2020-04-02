import * as types from './actionTypes';

// reducer do Player

const changeUser = ({ name, value }) => ({
  type: types.CHANGE_USER_DATA,
  name,
  value,
});

export default changeUser;
