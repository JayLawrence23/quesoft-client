import {
    FETCH_TOTAL_NUMBER_SERVED,
    FETCH_AVERAGE_SERVICETIME,
    FETCH_AVEREPORTS,
    FETCH_RATE,
    FETCH_TOTALVOL,
    FETCH_TOTALVISITOR
} from '../Constants/actionTypes';

export default (state = { served: {}, avgServTime: {}, isLoading: true, rate: null, ave: {}, numberVisitor: {}, totalVolume: null } , action) => {
    switch (action.type) {
   
        case FETCH_TOTAL_NUMBER_SERVED:
            return {...state, served: action.payload};
        case FETCH_AVERAGE_SERVICETIME:
            return {...state, avgServTime: action.payload};
        case FETCH_AVEREPORTS:
            return {...state, ave: action.payload};
        case FETCH_RATE:
                return {...state, rate: action.payload};
        case FETCH_TOTALVOL:
            return {...state, totalVolume: action.payload};
        case FETCH_TOTALVISITOR:
            return {...state, numberVisitor: action.payload};
        default:
            return state;
    }
}