// import { Slice } from "./../../node_modules/@reduxjs/toolkit/src/createSlice";
// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./slices/projectsSlice";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
