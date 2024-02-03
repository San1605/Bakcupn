import { combineReducers } from "redux";
import loadingReducer from "./reducer/LoadingReducer";
import imagesReducer from "./reducer/reducer";
import errorReducer from "./reducer/ErrorReducer";
import pageReducer from "./reducer/pageReducer";
const rootReducer = combineReducers({
  isLoading: loadingReducer,
  images: imagesReducer,
  error: errorReducer,
  nextPage:pageReducer
})
export default rootReducer;