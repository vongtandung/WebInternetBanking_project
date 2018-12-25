import { POPUPSHOW, POPUPCLOSE } from '../actions/types';

let initState = {
    show: false,
    title: "",
    mess: "",
    type: null
};

export default function (state = initState, action) {
    switch (action.type) {
        case POPUPSHOW:
            return state = {
                show: true,
                title: action.payload.title,
                mess: action.payload.mess,
                type: action.payload.type
            };
        case POPUPCLOSE:
            return state = {
                show: false,
                title: "",
                mess: "",
                type: null
            };
        default:
            return state;
    }
}