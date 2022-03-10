import { AUTH_ADMIN, FETCH_ALL, LOGOUT_ADMIN, CREATE, GET_ADMIN_DATA, UPDATE_ADMIN, FETCH_ADVERTISE, GET_ADMIN } from '../Constants/actionTypes'

const adminAuth = (state = { adminAuthData: null, adminData: [], admin: [], advertise: null }, action) => {
    switch(action.type){
        case AUTH_ADMIN:
            localStorage.setItem('admin', JSON.stringify({...action?.data}));

            return {...state, adminAuthData: action?.data };
        case GET_ADMIN_DATA: 
            return {...state, adminData: action.payload };
        case UPDATE_ADMIN: 
            localStorage.setItem('admin', JSON.stringify({...action?.payload}));
            return {...state, adminAuthData: action?.payload };
        case LOGOUT_ADMIN:
            localStorage.removeItem('admin');
            return {...state, adminAuthData: null};
        case FETCH_ALL: 
            return action.payload;
        case GET_ADMIN: 
            return {...state, admin: action.payload };
        case FETCH_ADVERTISE: 
            return { advertise: action.payload };
        case CREATE:
            return [...state, action.payload];
        default:
            return state;
    }
}

export default adminAuth;