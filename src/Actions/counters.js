import * as api from '../Api'
import {
    FETCH_ALL_COUNTERS, 
    CREATE_COUNTER, 
    DELETE_COUNTER, 
    UPDATE_COUNTER,
    GET_ONE_COUNTER,
    FETCH_COUNTERS_ON_SERVICE,
    FETCH_NUMBER_COUNTERS
 } from '../Constants/actionTypes'
// Action Creators
export const getCounters = () => async (dispatch) => {
    try {
        const { data } = await api.fetchCounters();

        dispatch({type: FETCH_ALL_COUNTERS, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const getCounter = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchCounter(id);

        dispatch({type: GET_ONE_COUNTER, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const createCounter = (counter, setIsSuccess) => async (dispatch) => {
    try {
        const { data } = await api.createCounter(counter);

        dispatch({type: CREATE_COUNTER, payload: data});
        setIsSuccess(true);
    } catch (error) {
        console.log(error.message);
    }
}

export const updateCounter = (id, service, setIsSuccess, setIsError) => async (dispatch) => {
    try {
        const { data } = await api.updateCounter(id, service);

        dispatch({ type: UPDATE_COUNTER, payload: data });
        setIsSuccess(true);
    } catch (error) {
        console.log(error.message);
        setIsError(true);
    }
}

export const deleteCounter = (id) => async (dispatch) => {
    try {
        await api.deleteCounter(id);

        dispatch({ type: DELETE_COUNTER, payload: id });
    } catch (error) {
        console.log(error.message);
    }
}

export const countersService = (values) => async (dispatch) => {
    try {
        const { data } = await api.counterByService(values);

        dispatch({ type: FETCH_COUNTERS_ON_SERVICE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const countCounterByService = (values) => async (dispatch) => {
    try {
        const { data } = await api.countCounterByService(values);

        dispatch({ type: FETCH_NUMBER_COUNTERS, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}
