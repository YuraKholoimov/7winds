import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {useDispatch} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {newRowDataSlice} from "./newRowDataSlice";

const rootReducer = combineReducers({
    rootLevel: newRowDataSlice,

});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});
export type AppRootStateType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
