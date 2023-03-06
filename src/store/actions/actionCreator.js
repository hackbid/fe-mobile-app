
import axios from 'axios';
import { FETCH_CATEGORIES, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './ActionType';

const SERVER_URL = 'http://192.168.1.20:4000';


//FOR STATE
export const changeLogin = (data) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data,
    };
};

export const changeLogout = () => {
    return {
        type: LOGOUT_SUCCESS,
    };
};

export const setCategories = (data) => {
    return {
        type: FETCH_CATEGORIES,
        payload: data,
    };
};

//FOR API
export const postLogin = (data) => {
    return async (dispatch, getState) => {
        try {
            const { data: userData } = await axios.post(SERVER_URL + '/users/login', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            dispatch(changeLogin(userData));
            return userData;
        } catch (err) {
            throw err.response.data;
        }
    };
};

export const postLogout = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(changeLogout());
            return;
        } catch (err) {
            throw err;
        }
    };
};

export const fetchProvince = () => {
    return async (dispatch, getState) => {
        try {
            const { data: provinceData } = await axios.get(SERVER_URL + '/cities/province');
            return provinceData;
        } catch (err) {
            throw err.response.data;
        }
    };
};

export const fetchProvinceId = (id) => {
    return async (dispatch, getState) => {
        try {
            const { data: cityData } = await axios.get(SERVER_URL + `/cities/city/${id}`);
            return cityData;
        } catch (err) {
            throw err.response.data;
        }
    };
};

export const fetchCategory = () => {
    return async (dispatch, getState) => {
        try {
            const { data: categoryData } = await axios.get(SERVER_URL + '/categories');
            dispatch(setCategories(categoryData));
        } catch (err) {
            throw err.response.data;
        }
    };
};

export const fetchSubCategory = (id) => {
    return async (dispatch, getState) => {
        try {
            const { data: subCategoryData } = await axios.get(SERVER_URL + `/categories/${id}`);
            return subCategoryData;
        } catch (err) {
            throw err.response.data;
        }
    };
};

export const fetchUserLogin = (id) => {
    return async (dispatch, getState) => {
        try {
            const { data: userData } = await axios.get(SERVER_URL + `/users/findById/${id}`);
            dispatch(changeLogin(userData));
        } catch (err) {
            throw err.response.data;
        }
    };
};
export const fetchMutation = (id) => {
    return async (dispatch, getState) => {
        try {
            const { data: mutationData } = await axios.get(SERVER_URL + `/users/histories/${id}`);
            return mutationData;
        } catch (err) {
            throw err.response.data;
        }
    };
};

export const postTopup = (data) => {
    return async (dispatch, getState) => {
        try {
            const { UserId, balance } = data;
            const { data: topupData } = await axios.post(
                SERVER_URL + `/users/payment/${UserId}`,
                { balance },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return topupData;
        } catch (err) {
            throw err.response.data;
        }
    };
};

export const patchPayment = (data) => {
    return async (dispatch, getState) => {
        try {
            const { UserId, balance } = data;
            const { data: topupData } = await axios.patch(
                SERVER_URL + `/users/addBalance/${UserId}`,
                { balance },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return topupData;
        } catch (err) {
            throw err.response.data;
        }
    };
};
