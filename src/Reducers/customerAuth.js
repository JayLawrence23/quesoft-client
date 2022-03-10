import { AUTH, LOGOUT, MONITOR } from '../Constants/actionTypes'

const customerAuth = (state = { customerAuthData: null, monitor: null }, action) => {
    switch(action.type){
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}));

            return {...state, customerAuthData: action?.data };
        case LOGOUT:
            localStorage.removeItem('profile');
            return {...state, customerAuthData: null};
        case MONITOR:
            return {...state, monitor: action.payload };
        default:
            return state;
    }
}

export default customerAuth;