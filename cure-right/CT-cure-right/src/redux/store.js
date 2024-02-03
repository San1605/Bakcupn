import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./reducers/index";

const store = configureStore({
  reducer: RootReducer,
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["CHAT_THREAD"],
        ignoredActionPaths: ["AppReducer.chatThread.tokenCredential"],
        ignoredPaths: ["items.dates"],
      },
    }),
});

export default store;
