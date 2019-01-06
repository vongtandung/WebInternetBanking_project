
import { combineReducers } from 'redux';
import PopupReducer from './PopupReducer';
import UserAccReducer from './UserAccReducer';
import UserTransHistoryReducer from './UserTransHistoryReducer';
import PageTitleReducer from './PageTitleReducer';
import UserPhoneReducer from './UserPhoneReducer';
import UserAccPayReducer from './UserAccPayReducer';


const rootReducer =  combineReducers({
    popup: PopupReducer,
    userAcc: UserAccReducer,
    userHistory: UserTransHistoryReducer,
    pageTitle: PageTitleReducer,
    userPhone: UserPhoneReducer,
    userAccPay: UserAccPayReducer
});
export default rootReducer;