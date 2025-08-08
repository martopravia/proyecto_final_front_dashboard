import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import orderReducer from "./orderSlice";
import productsReducer from "./productSlice";
import categoryReducer from "./categorySlice";
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
  order: orderReducer,
  products: productsReducer,

  category: categoryReducer,
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
