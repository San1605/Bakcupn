import { combineReducers, legacy_createStore as createStore,applyMiddleware } from "redux";
import { taskReducer } from "./Reducer";
import thunk from "redux-thunk"

const rootReducer = combineReducers({
    taskReducer: taskReducer
})
export const store =createStore(rootReducer,applyMiddleware(thunk));