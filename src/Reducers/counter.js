import { 
    FETCH_ALL_COUNTERS, 
    CREATE_COUNTER, 
    DELETE_COUNTER, 
    UPDATE_COUNTER,
    GET_ONE_COUNTER,
    FETCH_COUNTERS_ON_SERVICE,
    FETCH_NUMBER_COUNTERS
 } from '../Constants/actionTypes'

export default (state = { counters: [], counter: [], countersbyserv: [], countCounter: [],}, action) => {
    switch (action.type) {
        case DELETE_COUNTER:
            return state.filter((counter) => counter._id !== action.payload);
        case UPDATE_COUNTER:
            return {...state, counters: state.counters.map((counter) => counter._id === action.payload._id ? action.payload : counter)};
        case FETCH_ALL_COUNTERS:
            return {...state, counters: action.payload};
        case GET_ONE_COUNTER: 
            return {...state, counter: action.payload};
        case CREATE_COUNTER:
            return { counters: [...state.counters, action.payload] };
        case FETCH_NUMBER_COUNTERS: 
            return {...state, countCounter: action.payload};
        case FETCH_COUNTERS_ON_SERVICE: 
            return {...state, countersbyserv: action.payload }
        default:
            return state;
    }
}