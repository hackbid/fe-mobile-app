//create user reducer

import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/ActionType';

const initialState = {
    isLogin: false,
    user: {},
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLogin: true,
                user: action.payload,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLogin: false,
                user: {},
            };
        default:
            return state;
    }
};

export default userReducer;
