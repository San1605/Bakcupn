import {combineReducers,applyMiddleware } from "redux";
import { legacy_createStore as createStore } from 'redux';
import thunk from "redux-thunk"

import taskReducer from "./Reducer";

const rootReducer=combineReducers({
    taskReducer:taskReducer
})

export const store =createStore(rootReducer,applyMiddleware(thunk));

