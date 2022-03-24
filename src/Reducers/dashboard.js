import {
    FETCH_TOTAL_NUMBER_SERVED,
    FETCH_AVERAGE_SERVICETIME,
} from '../Constants/actionTypes';

export default (state = { served: {}, avgServTime: {}, isLoading: true, } , action) => {
    switch (action.type) {
   
        case FETCH_TOTAL_NUMBER_SERVED:
            return {...state, served: action.payload};
        case FETCH_AVERAGE_SERVICETIME:
            return {...state, avgServTime: action.payload};
        default:
            return state;
    }
}