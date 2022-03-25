import * as api from '../Api'
import { 
    FETCH_TRANSACTION,
    LEAVE_QUEUING_WAITING,
    FETCH_CALLING,
    FETCH_TICKET_COUNTERSTAFFS,
    FETCH_NUMBER_WAITING,
    FETCH_NUMBER_SERVED,
    FETCH_NUMBER_MISSED,
    FETCH_NUMBER_WAITING_ALL,
    FETCH_NUMBER_MISSED_ALL,
    FETCH_NUMBER_SERVED_ALL,
    FETCH_TOTAL_NUMBER_SERVED,
    FETCH_AVERAGE_SERVICETIME
} from '../Constants/actionTypes'
// Action Creators

export const getTransactions = () => async (dispatch) => {
    try {
        const { data } = await api.fetchTransactions();

        dispatch({type: FETCH_TRANSACTION, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const getTransactionsByCounter = (values) => async (dispatch) => {
    try {
        const { data } = await api.fetchTransactionsByCounter(values);

        dispatch({type: FETCH_TRANSACTION, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const leaveQueuesWaiting = (id) => async (dispatch) => {
    try {
        dispatch({ type: LEAVE_QUEUING_WAITING, payload: id });
    } catch (error) {
        console.log(error.message);
    }
}

export const callCustomer = (values) => async (dispatch) => {
    try {
        const { data } = await api.callCustomer(values);

        dispatch({type: FETCH_CALLING, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const getCallingCustomers = (values) => async (dispatch) => {
    try {
        const { data } = await api.getCallingCustomers(values);

        dispatch({type: FETCH_CALLING, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const ticketOnCounterStaff = (values) => async (dispatch) => {
   
    try {
        const { data } = await api.ticketOnCounterStaff(values);

        dispatch({type: FETCH_TICKET_COUNTERSTAFFS, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const arrivedCustomer = async (values) => {
    try {
        await api.arrivedCustomer(values);

    } catch (error) {
        console.log(error.message);
    }
}

export const missedCustomer = async (values) => {
    try {
        await api.missedCustomer(values);

    } catch (error) {
        console.log(error.message);
    }
}

export const queuingComplete = (values,valuescounter) => async (dispatch) => {
    
    try {
      const { data } = await api.queuingComplete(values);

      dispatch({ type: FETCH_TICKET_COUNTERSTAFFS, payload: data });
      if (valuescounter) {
        dispatch(callCustomer(valuescounter));
        dispatch(ticketOnCounterStaff(valuescounter));
      }
    } catch (error) {
      console.log(error.message);
    }
}

// NOTIFICATION
export const emailNotif = async (values) => {
    
    try {
        await api.emailNotif(values);
        
    } catch (error) {
        console.log(error.message);
    }
}

export const smsNotif = async (values) => {
    
    try {
        await api.smsNotif(values);
        
    } catch (error) {
        console.log(error.message);
    }
}

// COUNT

export const countWaitingByService = (values) => async (dispatch) => {
    try {
        const { data } = await api.countWaitingByService(values);

        dispatch({ type: FETCH_NUMBER_WAITING, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const countServedByService = (values) => async (dispatch) => {
    try {
        const { data } = await api.countServedByService(values);

        dispatch({ type: FETCH_NUMBER_SERVED, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const countMissedByService = (values) => async (dispatch) => {
    try {
        const { data } = await api.countMissedByService(values);

        dispatch({ type: FETCH_NUMBER_MISSED, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const countWaiting = () => async (dispatch) => {
    try {
        const { data } = await api.countWaiting();

        dispatch({ type: FETCH_NUMBER_WAITING_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const countServed = () => async (dispatch) => {
    try {
        const { data } = await api.countServed();

        dispatch({ type: FETCH_NUMBER_SERVED_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const countMissed = () => async (dispatch) => {
    
    try {
        const { data } = await api.countMissed();

        dispatch({ type: FETCH_NUMBER_MISSED_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

// Dashboard

export const countServedByAllService = () => async (dispatch) => {
    
    try {
        const { data } = await api.countServedByAllService();

        dispatch({ type: FETCH_TOTAL_NUMBER_SERVED, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const averageServiceTime = () => async (dispatch) => {
    
    try {
        const { data } = await api.averageServiceTime();

        dispatch({ type: FETCH_AVERAGE_SERVICETIME, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}