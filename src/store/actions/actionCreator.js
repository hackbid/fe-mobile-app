import axios from 'axios';
import { FETCH_CATEGORIES, FETCH_ITEMS, FETCH_ITEMS_TODAY, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './ActionType';

const SERVER_URL = 'https://api.hackbid.com';

//FOR STATE
export const changeLogin = (data) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data,
    };
};

export const setItems = (data) => {
    return {
        type: FETCH_ITEMS,
        payload: data,
    };
};

export const setItemToday = (data) => {
    return {
        type: FETCH_ITEMS_TODAY,
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

export const fetchItems = () => {
    return async (dispatch, getState) => {
        try {
            const { data: itemData } = await axios.get(SERVER_URL + '/items');
            dispatch(setItems(itemData));
        } catch (err) {
            throw err.response.data;
        }
    };
};

export const fetchItemById = (id) => {
    return async (dispatch, getState) => {
        try {
            const { data: itemData } = await axios.get(SERVER_URL + `/items/${id}`);
            return itemData;
        } catch (err) {
            throw err.response.data;
        }
    };
};

export const fetchItemsToday = () => {
    return async (dispatch, getState) => {
        try {
            const { data: itemData } = await axios.get(SERVER_URL + '/items/today');
            dispatch(setItemToday(itemData));
        } catch (err) {
            throw err.response.data;
        }
    };
};

export const postReport = (data) => {
    return async (dispatch, getState) => {
        try {
            const { data: reportData } = await axios.post(SERVER_URL + '/items/report', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return reportData;
        } catch (err) {
            throw err.response.data;
        }
    };
};

export const getMyAuction = (id) => {
    return async (dispatch, getState) => {
        try {
            const { data: auctionData } = await axios.get(SERVER_URL + `/items/myauction/${id}`);
            return auctionData;
        } catch (err) {
            throw err.response.data;
        }
    };
};

export const getWinner = (id) => {
    return async (dispatch, getState) => {
        try {
            const { data: winnerData } = await axios.get(SERVER_URL + `/items/mywinner/${id}`);
            return winnerData;
        } catch (err) {
            throw err.response.data;
        }
    };
};

export const postWithDraw = (data) => {
    return async (dispatch, getState) => {
        try {
            const { UserId, balance } = data;
            await axios.post(`${SERVER_URL}/users/withdraw/request/${UserId}`, { balance });
            return;
        } catch (error) {
            throw error.response.data;
        }
    };
};

export const postCheckout = (data) => {
    return async (dispatch, getState) => {
        try {
            const { SellerId, ItemId, BuyerId, summary } = data;
            const { data: checkoutData } = await axios.post(`${SERVER_URL}/items/checkout`, { SellerId, ItemId, BuyerId, summary });
            return checkoutData;
        } catch (error) {
            throw error.response.data;
        }
    };
};
