import {combineReducers,applyMiddleware } from "redux";
import { legacy_createStore as createStore } from 'redux';
import thunk from "redux-thunk"
import userReducer from "./Reducer";

const rootReducer=combineReducers({
    userReducer
})

export const store =createStore(rootReducer,applyMiddleware(thunk));

