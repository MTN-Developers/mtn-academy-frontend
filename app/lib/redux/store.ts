// src/lib/redux/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
// import courseReducer from "./features/courseSlice";
// import semesterReducer from "./features/semesterSlice";
import { persistStore, persistReducer } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

interface StorageAPI {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

// Create custom storage for SSR
const createNoopStorage = (): StorageAPI => {
  return {
    getItem: () => Promise.resolve(null),
    setItem: (_key: string, value: string) => {
      console.log("Persisted state: ", value);

      return Promise.resolve();
    },
    removeItem: () => Promise.resolve(),
  };
};

// Use proper storage depending on environment
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// Define persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only auth will be persisted
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  // courses: courseReducer,
  // semesters: semesterReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["register.timestamp"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create hooks for TypeScript
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
