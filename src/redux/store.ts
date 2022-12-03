import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import uiReducer from "./slices/uiSlice";
import relationReducer from "./slices/relationSlice";
import chatReducer from "./slices/chatSlice";
import conversationReducer from "./slices/conversationSlice";
import searchMessageReducer from "./slices/searchMessageSlice";

const rootReducer = combineReducers({
  chat: chatReducer,
  user: userReducer,
  ui: uiReducer,
  conversation: conversationReducer,
  searchMessage: searchMessageReducer,
  relation: relationReducer,
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
}

const store = makeStore();

export default store;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
