import { combineReducers } from 'redux'
import {thunkReduxReducer} from "./student.reducer"
import authReducer from './signup.reducer';
export const   rootReducer = combineReducers({
     admin: thunkReduxReducer,
     auth : authReducer,
});