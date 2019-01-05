import { SETTITLE } from '../actions/types';

let initState = {
    title: ""
};

export default function (state = initState, action) {
    switch (action.type) {
        case SETTITLE:
            return state = {
                title: action.payload.title
            };
        default:
            return state;
    }
}