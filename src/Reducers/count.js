import {
    FETCH_NUMBER_WAITING, FETCH_NUMBER_MISSED,
    FETCH_NUMBER_SERVED, FETCH_NUMBER_WAITING_ALL, FETCH_NUMBER_MISSED_ALL,
    FETCH_NUMBER_SERVED_ALL
} from '../Constants/actionTypes';

export default (state = { countWaiting: [], countServed: [], countMissed: [], countWaitingAll: [], countServedAll: [], countMissedAll: [] } , action) => {
    switch (action.type) {
        case FETCH_NUMBER_WAITING: 
            return { ...state, countWaiting: action.payload };
        case FETCH_NUMBER_MISSED: 
            return { ...state, countMissed: action.payload };
        case FETCH_NUMBER_SERVED:
            return { ...state, countServed: action.payload };
        case FETCH_NUMBER_WAITING_ALL:
            return { ...state, countWaitingAll: action.payload };
        case FETCH_NUMBER_MISSED_ALL: 
            return { ...state, countMissedAll: action.payload };
        case FETCH_NUMBER_SERVED_ALL:
            return { ...state, countServedAll: action.payload };
        default:
            return state;
    }
}