import { combineReducers } from "redux";

import services from "./services";
import customerAuth from "./customerAuth";
import counterStaffAuth from "./counterStaff";
import adminAuth from "./admin"
import counter from './counter'
import ticket from './ticket'
import count from './count'
import dashboard from './dashboard'

export default combineReducers({
    services,
    customerAuth,
    counterStaffAuth,
    adminAuth,
    counter,
    ticket,
    count,
    dashboard
});