import { legacy_createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../redux/saga/RootSaga";

const sagaMiddleware = createSagaMiddleware();
const store = legacy_createStore(
  rootReducer,
  compose(
  applyMiddleware(sagaMiddleware)
  ,window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
))
sagaMiddleware.run(rootSaga);
export default store;


// store.dispatch({type:"Hello"})

// export const configureStore=()=>{
//     const sagaMiddleware=createSagaMiddleware();
//     const store=legacy_createStore(rootReducer,applyMiddleware(sagaMiddleware))
//     sagaMiddleware.run(rootSaga);
//     return store
// }
