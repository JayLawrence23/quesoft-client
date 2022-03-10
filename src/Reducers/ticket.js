import {
    FETCH_TRANSACTION, FETCH_WAITING, GET_TICKET,
    GET_TICKET_DATA,
    LEAVE_QUEUING, LEAVE_QUEUING_WAITING,
    FETCH_CALLING, FETCH_NUMBER_WAITING
} from '../Constants/actionTypes';

export default (state = { ticket: [], isLoading: true, waiting: [], nowserving: [], calling: [], countWaiting: [] } , action) => {
    switch (action.type) {
        // case DELETE:
        //     return state.filter((service) => service._id !== action.payload);
        case FETCH_WAITING:
        case FETCH_TRANSACTION:
            return {...state, waiting: action.payload};
        // case FETCH_SERVICE: 
        //     return {...state, service: action.payload};
        // case CREATE:
        //     return { services: [...state.services, action.payload] };
        case FETCH_CALLING:
            return { ...state, calling: action.payload };
        case GET_TICKET:
        case GET_TICKET_DATA:
            return  { ...state, ticket: action.payload, isLoading: false };
        case LEAVE_QUEUING:
            return {...state, ticket: state.ticket.filter((ticket) => ticket._id !== action.payload)};
        case LEAVE_QUEUING_WAITING:
            return {...state, waiting: state.waiting.filter((wait) => wait._id !== action.payload)};
        case FETCH_NUMBER_WAITING: 
            return { ...state, countWaiting: action.payload };
        // case GET_TICKET_DATA:
        //     return  { ...state, ticket: action.payload };
        default:
            return state;
    }
}