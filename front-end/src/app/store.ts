import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import projectSlice, { IProjectSlice } from "../slices/project/project.slice";
import aboutMeReducer from "../slices/aboutMe/aboutMe.slice";
import educationReducer from "../slices/education/education.slice";
import experienceReducer from "../slices/experience/experience.slice";
import portfolioProjectReducer from "../slices/portfolioProject/portfolioProject.slice";
import contactReducer from "../slices/contact/contact.slice";
import statisticReducer from "../slices/statistic/statistic.slice";

export type IStore = {
    project: IProjectSlice
}

const rootReducer = combineReducers({
    project: projectSlice,
    aboutMe: aboutMeReducer,
    education: educationReducer,
    experience: experienceReducer,
    portfolioProject: portfolioProjectReducer,
    contact: contactReducer,
    statistic: statisticReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
