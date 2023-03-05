//create app reducer

import { FETCH_CATEGORIES } from '../actions/ActionType';

const initialState = {
    categories: [],
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };
        default:
            return state;
    }
};

export default appReducer;
