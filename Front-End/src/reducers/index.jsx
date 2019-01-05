
import { combineReducers } from 'redux';
import PopupReducer from './PopupReducer';
import UserAccReducer from './UserAccReducer';
import UserTransHistoryReducer from './UserTransHistoryReducer';
import PageTitleReducer from './PageTitleReducer';

const rootReducer =  combineReducers({
    popup: PopupReducer,
    userAcc: UserAccReducer,
    userHistory: UserTransHistoryReducer,
    pageTitle: PageTitleReducer
});
export default rootReducer;