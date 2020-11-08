import {initialState} from './initial-state';
import * as actionJs from './action';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionJs.type.apiToken:
            return Object.assign({}, state, {
                apiToken: action.value,
            });
        default:
            return {
                ...state,
            };
    }
};

export default reducer;
