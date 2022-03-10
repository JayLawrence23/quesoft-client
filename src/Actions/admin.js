import * as api from '../Api';
import { AUTH_ADMIN, CREATE, GET_ADMIN_DATA, UPDATE_ADMIN, FETCH_ADVERTISE, GET_ADMIN } from '../Constants/actionTypes'

// Action Creators
export const signin = (values, history, setIsValid) => async (dispatch) => {
    try {
        // log in the user ...
        const { data } = await api.signInAdmin(values);
        
        dispatch({ type: AUTH_ADMIN, data});
        history.push('/admin/dashboard');
    } catch (error) {
        console.log(error.message);
        setIsValid(true);
        
    }
}

export const signup = (values, setIsError, setIsSuccess) => async (dispatch) => {
    try {
        // sign up the user ...
        const { data } = await api.createAdmin(values);
        
        dispatch({ type: CREATE, data});
        setIsSuccess(true);

    } catch (error) {
        console.log(error.message);
        setIsError(true);
    }
}


export const getAdminData = (id) => async (dispatch) => {
    try {
        const { data } = await api.getAdminData(id);

        dispatch({ type: GET_ADMIN_DATA, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const getAdmin = () => async (dispatch) => {
    try {
        const { data } = await api.getAdmin();
     
        dispatch({ type: GET_ADMIN, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}


export const updateAdminUser = (values, setIsError, setIsSuccess) => async (dispatch) => {
    try {
        const { data } = await api.updateAdminUser(values);

        dispatch({ type: UPDATE_ADMIN, payload: data });
        setIsSuccess(true);
    } catch (error) {
        console.log(error.message);
        setIsError(true);
    }
}

export const getAdvertisement = () => async (dispatch) => {
    try {
        const { data } = await api.getAdvertisement();

        dispatch({type: FETCH_ADVERTISE, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const createAdvertisement = (values) => async () => {

    try {
        await api.createAdvertisement(values);

    } catch (error) {
        console.log(error.message);
    }
}

export const updateAdvertisement = (id, values, setIsSuccess, setIsError) => async () => {
    try {
        await api.updateAdvertisement(id, values);

        setIsSuccess(true);
    } catch (error) {
        console.log(error.message);
        setIsError(true);
    }
}

export const updateBusiness = (id, values, setIsSuccess, setIsError) => async () => {
    try {
        await api.updateBusiness(id, values);

        setIsSuccess(true);
    } catch (error) {
        console.log(error.message);
        setIsError(true);
    }
}