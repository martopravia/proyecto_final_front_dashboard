import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import ordersReducer from "./ordersSlice";
import productsReducer from "./productsSlice";
import categoriesReducer from "./categoriesSlice";
import userListReducer from "./userListSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  orders: ordersReducer,
  products: productsReducer,
  categories: categoriesReducer,
  userList: userListReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
