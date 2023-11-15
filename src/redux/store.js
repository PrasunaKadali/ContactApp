import { createStore } from "redux";
import contactReducer from "./contactReducer";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, contactReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
