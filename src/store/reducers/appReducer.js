//create app reducer

import { FETCH_CATEGORIES, FETCH_ITEMS, FETCH_ITEMS_TODAY } from '../actions/ActionType';

const initialState = {
    categories: [],
    items: [],
    itemToday: [],
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };
        case FETCH_ITEMS:
            return {
                ...state,
                items: action.payload,
            };
        case FETCH_ITEMS_TODAY:
            return {
                ...state,
                itemToday: action.payload,
            };
        default:
            return state;
    }
};

export default appReducer;
