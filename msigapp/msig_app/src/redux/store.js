import { legacy_createStore } from "redux";
import rootReducer from "./reducer";

export const store = legacy_createStore(rootReducer, window.__REDUX_DEVTOOL_EXTENSION__ && window.__REDUX_DEVTOOL_EXTENSION__())