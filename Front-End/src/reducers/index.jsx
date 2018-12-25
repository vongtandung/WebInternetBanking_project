
import { combineReducers } from 'redux';
import PopupReducer from './PopupReducer';
import FetchReducer from './FetchReducer';


const rootReducer =  combineReducers({
    popup: PopupReducer,
    fetchData: FetchReducer
});
export default rootReducer;