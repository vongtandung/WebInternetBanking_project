
import { combineReducers } from 'redux';
import PopupReducer from './PopupReducer';
import UserAccReducer from './UserAccReducer';
import UserTransHistoryReducer from './UserTransHistoryReducer';

const rootReducer =  combineReducers({
    popup: PopupReducer,
    userAcc: UserAccReducer,
    userHistory: UserTransHistoryReducer
});
export default rootReducer;