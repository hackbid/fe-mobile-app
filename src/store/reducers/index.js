import { combineReducers } from 'redux';
import appReducer from './appReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    user: userReducer,
    apps: appReducer,
});

export default rootReducer;
