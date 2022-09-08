import * as api from '../Api';
import { AUTH, MONITOR, UPDATE_CUSTOMER } from '../Constants/actionTypes'

// Action Creators
export const signin = (values, history, setIsValid) => async (dispatch) => {
    try {
        // log in the user ...
        const { data } = await api.signIn(values);
        console.log(values)
        dispatch({ type: AUTH, data});
        history.push(`/otp/${data.mobile}`);
        // dispatch({type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error.message);
        setIsValid(true);
        
    }
}

export const otpauth = (values, history, setIsValid) => async (dispatch) => {
    try {
        // log in the user ...
        const { data } = await api.otpauth(values);
        
        dispatch({ type: AUTH, data});
        if(data.currTicket) {
            history.push(`/virtualmonitoring/${data.currTicket}`);
        } else {
            history.push('/signcode');
        }
        // dispatch({type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error.message);
        setIsValid(true);
        
    }
}

export const monitorTicket = (values) => async (dispatch) => {
    try {
        // log in the user ...
        const { data } = await api.monitorTicket(values);
        
        dispatch({ type: MONITOR, payload: data});
        // dispatch({type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error.message);
        // setIsValid(true);
    }
}

export const monitorTicketByCode = (values, history, setIsValid) => async (dispatch) => {
    try {
        // log in the user ...
        const { data } = await api.monitorTicketByCode(values);
        
        dispatch({ type: MONITOR, payload: data});
        history.push(`/virtualmonitoring/${data.code}`);
        // dispatch({type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error.message);
        setIsValid(true);
    }
}

export const signTicket = (values, history, setIsValid) => async (dispatch) => {
    try {
        // log in the user ...
        const { data } = await api.signTicket(values);
        
        dispatch({ type: MONITOR, payload: data});
        history.push(`/virtualmonitoring/${data.code}`);
        // dispatch({type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error.message);
        setIsValid(true);
    }
}

export const signup = (values, history, setIsValid) => async (dispatch) => {
    try {
        // sign up the user ...
        const { data } = await api.signUp(values);
        
        dispatch({ type: AUTH, data});

        history.push(`/otp/${data.mobile}`);
        // dispatch({type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error.message);
        setIsValid(true);
    }
}

export const emailNotif = (values, setIsError, setIsSuccess) => async (dispatch) => {
    try {
        // sign up the user ...
        await api.createCounterStaff(values);
        setIsSuccess(true);
    } catch (error) {
        console.log(error.message);
        setIsError(true);
    }
}

export const updateCustomer = (id, values, setIsError, setIsSuccess) => async (dispatch) => {
    try {
        
        const { data } = await api.updateCustomer(id, values);

        dispatch({ type: UPDATE_CUSTOMER, payload: data });
        setIsSuccess(true);
    } catch (error) {
        console.log(error.message);
        setIsError(true);
    }
}
