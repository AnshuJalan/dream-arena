import {combineReducers} from 'redux';
import getMatchReducer from './getMatchReducer';
export default combineReducers({
    matches:getMatchReducer
});