
import { combineReducers } from 'redux';
import PopupReducer from './PopupReducer';
import FetchReducer from './FetchReducer';


const rootReducer =  combineReducers({
    popup: PopupReducer,
    resFetch: FetchReducer
});
export default rootReducer;