import { IMAGES } from "../constants";

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case IMAGES.LOAD:
      return true;
    case IMAGES.LOAD_FAIL:
      return true;
    case IMAGES.LOAD_SUCCESS:
      return true;
    default:
      return state;
  }
};

export default loadingReducer;
