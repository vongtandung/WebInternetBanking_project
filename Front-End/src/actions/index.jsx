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

//Set title action
export const setTitle = (title) => ({
  type: actionTypes.SETTITLE,
  payload: {
    title: title,
  }
});

//Fetch API action
export const fetchBegin = () => ({
  type: actionTypes.FETCH_BEGIN
});

export const fetchSuccess = response => ({
  type: actionTypes.FETCH_SUCCESS,
  payload: { response }
});

export const fetchFailure = error => ({
  type: actionTypes.FETCH_FAILURE,
  payload: { error }
});

export const fetchAccPayBegin = () => ({
  type: actionTypes.FETCH_ACC_BEGIN
});

export const fetchAccPaySuccess = response => ({
  type: actionTypes.FETCH_ACC_SUCCESS,
  payload: { response }
});

export const fetchAccPayFailure = error => ({
  type: actionTypes.FETCH_ACC_FAILURE,
  payload: { error }
});


export const fetchUserAccData = () => {
  return dispatch => {
    dispatch(fetchBegin());
    apiFunc.handdleGetPayAcc().then(res => {
      if (res.error === false) {
        dispatch(fetchSuccess(res.response));
      } else if (res.error === true) {
        dispatch(fetchFailure(res.error));
      }
    });
  };
};

export const fetchUserTransData = (accNumId) => {
  return dispatch => {
    dispatch(fetchBegin());
    apiFunc.handdleGetTransHistory(accNumId).then(res => {
      if (res.error === false) {
        dispatch(fetchSuccess(res.response));
      } else if (res.error === true) {
        dispatch(fetchFailure(res.error));
      }
    });
  };
};

export const fetchInitUserTransData = () => ({
  type: actionTypes.FETCH_INIT
});


export const fetchUserByPhoneData = (phone) => {
  return dispatch => {
    dispatch(fetchBegin());
    apiFunc.handdleGetInfoByPhone(phone).then(res => {
      if (res.error === false) {
        dispatch(fetchSuccess(res.response));
      } else if (res.error === true) {
        dispatch(fetchFailure(res.error));
      }
    });
  };
};

export const fetchUserByAccPayData = (accountNumber) => {
  return dispatch => {
    dispatch(fetchAccPayBegin());
    apiFunc.handdleGetInfoByAccPay(accountNumber).then(res => {
      if (res.error === false) {
        dispatch(fetchAccPaySuccess(res.response));
      } else if (res.error === true) {
        dispatch(fetchAccPayFailure(res.error));
      }
    });
  };
};

