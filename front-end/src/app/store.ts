import { configureStore, combineReducers } from "@reduxjs/toolkit";
import projectSlice, { IProjectSlice } from "../slices/project/project.slice";

export type IStore = {
    project: IProjectSlice
}

const rootReducer = combineReducers({
    project: projectSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
