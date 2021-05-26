import {
  SEARCHING_ACTIVE,
  SEARCHING_RESET,
} from '../constants/searchConstants';

export const searchReducer = (state = false, action) => {
  switch (action.type) {
    case SEARCHING_ACTIVE:
      return true;
    case SEARCHING_RESET:
      return false;
    default:
      return state;
  }
};
