import * as api from '../Api'
import { 
    FETCH_ALL, 
    CREATE,FETCH_SERVICE, 
    UPDATE, 
    DELETE, 
    GET_TICKET,
    GET_TICKET_DATA,
    LEAVE_QUEUING,
} from '../Constants/actionTypes'
// Action Creators
export const getServices = () => async (dispatch) => {
    try {
        const { data } = await api.fetchServices();

        dispatch({type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const getService = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchService(id);

        dispatch({type: FETCH_SERVICE, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const getServiceByName = (value) => async (dispatch) => {
    try {
        const { data } = await api.getServiceByName(value);

        dispatch({type: FETCH_SERVICE, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const createService = (service, setIsSuccess) => async (dispatch) => {
    try {
        const { data } = await api.createServices(service);

        dispatch({type: CREATE, payload: data});
        setIsSuccess(true);
    } catch (error) {
        console.log(error.message);
    }
}

export const updateService = (id, service, setIsSuccess, setIsError) => async (dispatch) => {
    try {
        const { data } = await api.updateServices(id, service);

        dispatch({ type: UPDATE, payload: data });
        setIsSuccess(true);
    } catch (error) {
        console.log(error.message);
        setIsError(true);
    }
}

export const deleteService = (id) => async (dispatch) => {
    try {
        await api.deleteServices(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error.message);
    }
}

// ========= ticket ================

export const getTicket = (ticket) => async (dispatch) => {
    try {
        const { data } = await api.createTransaction(ticket);

        // console.log(data);
        dispatch({ type: GET_TICKET, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const getTicketData = (service) => async (dispatch) => {
    try {
        const { data } = await api.getTicketData(service);

        dispatch({ type: GET_TICKET_DATA, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const leaveQueuing = (id) => async (dispatch) => {
    try {
        await api.leaveQueuing(id);

        dispatch({ type: LEAVE_QUEUING, payload: id });
    } catch (error) {
        console.log(error.message);
    }
}

// export const likeService = (id) => async (dispatch) => {
//     try {
//         const { data } = await api.likePost(id);

//         dispatch({ type: UPDATE, payload: data });
//     } catch (error) {
//         console.log(error.message);
//     }
// }