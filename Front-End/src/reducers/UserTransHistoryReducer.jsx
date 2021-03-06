import {
    FETCH_BEGIN,
    FETCH_SUCCESS,
    FETCH_FAILURE,
    FETCH_INIT
} from "../actions/types";

const initState = {
    accTransList: [],
    loading: false,
    return_code: null,
    return_mess: "",
    error: false
};

export default function (state = initState, action) {
    switch (action.type) {
        case FETCH_BEGIN:
            // Mark the state as "loading" so we can show a spinner or something
            // Also, reset any errors. We're starting fresh.
            return state = {
                loading: true,
                return_code: null,
                return_mess: ""
            };

        case FETCH_SUCCESS:
            // All done: set loading "false".re
            // Also, replace the items with the ones from the server
            return state = {
                loading: false,
                return_code: action.payload.response.return_code,
                return_mess: action.payload.response.return_mess,
                accTransList: action.payload.response.data,
            };

        case FETCH_FAILURE:

            // The request failed. It's done. So set loading to "false".
            // Save the error, so we can display it somewhere.
            // Since it failed, we don't have items to display anymore, so set `items` empty.
            //
            // This is all up to you and your app though:
            // maybe you want to keep the items around!
            // Do whatever seems right for your use case.
            return state = {
                loading: false,
                error: true,
                accTransList: []
            };
        case FETCH_INIT:
            return state = {
                accTransList: [],
                loading: false,
                return_code: null,
                return_mess: "",
                error: false
            };
        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}