import {
    FETCH_TOTAL_NUMBER_SERVED
} from '../Constants/actionTypes';

export default (state = { served: {}, isLoading: true, } , action) => {
    switch (action.type) {
   
        case FETCH_TOTAL_NUMBER_SERVED:
            return {...state, served: action.payload};

        default:
            return state;
    }
}