import { AUTH, LOGOUT, MONITOR, UPDATE_CUSTOMER, TRANSHISTORY } from '../Constants/actionTypes'

const customerAuth = (state = { customerAuthData: null, monitor: null, transhistory: null }, action) => {
    switch(action.type){
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}));

            return {...state, customerAuthData: action?.data };
        case LOGOUT:
            localStorage.removeItem('profile');
            return {...state, customerAuthData: null};
        case MONITOR:
            return {...state, monitor: action.payload };
        case UPDATE_CUSTOMER: 
            localStorage.setItem('profile', JSON.stringify({...action.payload}));
            return {...state, customerAuthData: action.payload };
        case TRANSHISTORY: 
            return {...state, transhistory: action.payload };
        default:
            return state;
    }
}

export default customerAuth;