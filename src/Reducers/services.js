import { FETCH_ALL, FETCH_SERVICE, CREATE, UPDATE, DELETE } from '../Constants/actionTypes'

export default (state = { services: [], service: [], isLoading: true }, action) => {
    switch (action.type) {
        case DELETE:
            return state.filter((service) => service._id !== action.payload);
        case UPDATE:
            return {...state, services: state.services.map((service) => service._id === action.payload._id ? action.payload : service)};
        case FETCH_ALL:
            return {...state, services: action.payload, isLoading: false};
        case FETCH_SERVICE: 
            return {...state, service: action.payload};
        case CREATE:
            return { services: [...state.services, action.payload] };
        default:
            return state;
    }
}