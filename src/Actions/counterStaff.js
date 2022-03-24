import * as api from '../Api';
import { AUTH_COUNTERSTAFF,  
    FETCH_ALL_COUNTERSTAFFS, 
    CREATE_COUNTERSTAFF, 
    DELETE_COUNTERSTAFF, 
    UPDATE_COUNTERSTAFF,
    GET_ONE_COUNTERSTAFF,
    UPDATE_COUNTERSTAFF_USER,
    FETCH_SHOW_MISSED,
    FETCH_TICKET_COUNTERSTAFFS
 } from '../Constants/actionTypes'

// Action Creators
export const getCounterStaff = () => async (dispatch) => {
    try {
        // fetch the data of counter staff
        const { data } = await api.fetchCounterStaff();
        
        dispatch({ type: FETCH_ALL_COUNTERSTAFFS, payload: data});

    } catch (error) {
        console.log(error.message);
    }
}

export const signin = (values, history, setIsValid) => async (dispatch) => {
    try {
        // log in the user ...
        const { data } = await api.signInCounterStaff(values);
        
        dispatch({ type: AUTH_COUNTERSTAFF, data});
        history.push('/counterstaff/home');
    } catch (error) {
        console.log(error.message);
        setIsValid(true);
        
    }
}

export const signup = (values, setIsError, setIsSuccess) => async (dispatch) => {
    try {
        // sign up the user ...
        const { data } = await api.createCounterStaff(values);

        dispatch({ type: CREATE_COUNTERSTAFF, payload: data.result});
        setIsSuccess(true);
    } catch (error) {
        console.log(error.message);
        setIsError(true);
    }
}

export const updateCounterStaff = (id, counterstaff, setIsError, setIsSuccess) => async (dispatch) => {
    try {
        const { data } = await api.updateCounterStaff(id, counterstaff);

        dispatch({ type: UPDATE_COUNTERSTAFF, payload: data });
        setIsSuccess(true);
    } catch (error) {
        console.log(error.message);
        setIsError(true);
    }
}

export const updateCounterStaffUser = (values, setIsError, setIsSuccess) => async (dispatch) => {
    try {
        const { data } = await api.updateCounterStaffUser(values);

        dispatch({ type: UPDATE_COUNTERSTAFF_USER, payload: data });
        setIsSuccess(true);
    } catch (error) {
        console.log(error.message);
        setIsError(true);
    }
}

export const activateCounterStaff = (id, setIsError, setIsSuccess) => async (dispatch) => {
    try {
        const { data } = await api.activateCounterStaff(id);

        dispatch({ type: UPDATE_COUNTERSTAFF, payload: data });
        setIsSuccess(true);
    } catch (error) {
        console.log(error.message);
        setIsError(true);
    }
}

export const getSingleCounterStaff = (id) => async (dispatch) => {
    try {
        // fetch the single data of counter staff
        const { data } = await api.fetchOneCounterStaff(id);

        dispatch({ type: GET_ONE_COUNTERSTAFF, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const signOutCounterStaff = (user) => async () => {
   
    try {
        await api.signOutCounterStaff(user);

    } catch (error) {
        console.log(error.message);
    }
}

export const deleteCounterStaff = (id) => async (dispatch) => {
    try {
        await api.deleteCounterStaff(id);
        
        dispatch(getCounterStaff());
        dispatch({ type: DELETE_COUNTERSTAFF, payload: id });
    } catch (error) {
        console.log(error.message);
    }
}

export const showMissed = (values) => async (dispatch) => {
    try {
        const { data } = await api.showMissed(values);

        dispatch({ type: FETCH_SHOW_MISSED, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const searchMissedByService = (values, setOpenDialog, setIsMissedTicket, setIsValid) => async (dispatch) => {
    try {
        const { data } = await api.searchMissedByService(values);

        if(data.ticketNo === values.ticketNo){
            setIsValid(false);
            setOpenDialog(true);
            setIsMissedTicket(true);
        }
        
    } catch (error) {
        console.log(error.message);
        setIsValid(true);
    }
}

export const serveMissedTicket = (values) => async (dispatch) => {
    try {
        const { data } = await api.searchMissedByService(values);
        await api.serveMissedTicket(data);
        console.log(data)
        dispatch({type: FETCH_TICKET_COUNTERSTAFFS, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const completeMissedTicket = (values) => async (dispatch) => {
    
    try {
        const { data } = await api.completeMissedTicket(values);

        dispatch({type: FETCH_TICKET_COUNTERSTAFFS, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const createNewTicket = (values, setIsValid) => async (dispatch) => {
    try {
        await api.createticketbycounter(values);

        setIsValid(true);
        
    } catch (error) {
        console.log(error.message);
        
    }
}