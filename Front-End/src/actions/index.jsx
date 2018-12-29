import * as actionTypes from "./types";
import * as apiFunc from "../utilities/FetchApiFunc";

//Alert Popup action
export const showPopup = (title, mess, type) => ({
  type: actionTypes.POPUPSHOW,
  payload: {
    title: title,
    mess: mess,
    type: type
  }
});
export const closePopup = () => ({ type: actionTypes.POPUPCLOSE });

//Fetch API action
export const fetchBegin = () => ({
  type: actionTypes.FETCH_PRODUCTS_BEGIN
});

export const fetchSuccess = response => ({
  type: actionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: { response }
});

export const fetchFailure = error => ({
  type: actionTypes.FETCH_PRODUCTS_FAILURE,
  payload: { error }
});

export const fetchUserRecData = (action, data) => {
  return dispatch => {
    dispatch(fetchBegin());
    switch (action) {
      case actionTypes.FETCH_INF_ACC:
        apiFunc.handdleGetInfAcc(data).then(res => {
          if (res.error === false) {
            dispatch(fetchSuccess(res.response));
          } else if (res.error === true) {
            dispatch(fetchFailure(res.error));
          }
        })
        break;
      default:
        return true;
    }
  };
};
