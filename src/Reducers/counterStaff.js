import { AUTH_COUNTERSTAFF, 
    FETCH_ALL_COUNTERSTAFFS, 
    LOGOUT_COUNTERSTAFF, 
    CREATE_COUNTERSTAFF, 
    DELETE_COUNTERSTAFF, 
    UPDATE_COUNTERSTAFF,
    GET_ONE_COUNTERSTAFF,
    UPDATE_COUNTERSTAFF_USER,
    FETCH_TICKET_COUNTERSTAFFS,
    FETCH_SHOW_MISSED,
 } from '../Constants/actionTypes'

const counterStaffAuth = (state = { ticket: [], counterStaffs: [], singleCounterStaff: [], counterstaffAuthData: null, showmissed: [], loading: true }, action) => {
    switch(action.type){
        case AUTH_COUNTERSTAFF:
            localStorage.setItem('counterstaff', JSON.stringify({...action?.data}));

            return {...state, counterstaffAuthData: action?.data };
        case UPDATE_COUNTERSTAFF_USER:
            localStorage.setItem('counterstaff', JSON.stringify({...action.payload}));
            return {...state, counterstaffAuthData: action.payload };
        case LOGOUT_COUNTERSTAFF:
            localStorage.removeItem('counterstaff');
            return {...state, counterstaffAuthData: null};
        case FETCH_ALL_COUNTERSTAFFS: 
            return {...state, counterStaffs:action.payload, loading: false }
        case FETCH_TICKET_COUNTERSTAFFS: 
            return {...state, ticket:action.payload }
        case DELETE_COUNTERSTAFF:
            return {...state, counterStaffs: state.counterStaffs.filter((counterStaff) => counterStaff._id !== action.payload)};
        case UPDATE_COUNTERSTAFF:
            return {...state, counterStaffs: state.counterStaffs.map((counterStaff) => counterStaff._id === action.payload._id ? action.payload : counterStaff) };
        case GET_ONE_COUNTERSTAFF:
            return { ...state, singleCounterStaff: action.payload };
        case CREATE_COUNTERSTAFF:
            return { counterStaffs: [...state.counterStaffs, action.payload], loading: false };
        case FETCH_SHOW_MISSED: 
            return {...state, showmissed: action.payload }
        default:
            return state;
    }
}

export default counterStaffAuth;