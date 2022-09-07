import { Route, Switch } from 'react-router-dom'
//Pages
import Home from '../Pages/Customer/Home'
import Ticketing from '../Pages/Customer/Ticketing'
import VirtualMonitoring from '../Pages/Customer/VirtualMonitoring'
import Transactions from '../Pages/Customer/Transactions'
import Account from '../Pages/Customer/Account'
import Dashboard from '../Pages/Admin/Dashboard/Dashboard'
import CounterStaffAccount from '../Pages/Admin/CounterStaff/CounterStaffAccount'
import ServiceManagement from '../Pages/Admin/ServiceManagement/ServiceManagement'
import Settings from '../Pages/Admin/Settings/Settings'
import QueuingTransaction from '../Pages/Admin/QueuingTransactions/QueuingTransaction'
import CounterHome from '../Pages/CounterStaff/CounterHome'
import CounterTransactions from '../Pages/CounterStaff/CounterTransactions'
import CounterAccount from '../Pages/CounterStaff/CounterAccount'
import Counters from '../Pages/Admin/Counters/Counters'
import NotFound from '../Pages/NotFound'
import counterStaffAuth from '../Pages/Auth/CounterStaff'
import AdminAuth from '../Pages/Auth/AdminAuth'
import Code from '../Pages/Customer/Code'
import LiveMonitoring from '../Pages/Customer/LiveMonitoring'
import Welcome from '../Pages/Welcome'
import DataPrivacy from '../Pages/DataPrivacy'
import CustomerSignUp from '../Pages/Auth/CustomerSignUp'
import CustomerSignIn from '../Pages/Auth/CustomerSignIn'
import CustomerOTP from '../Pages/Auth/CustomerOTP'
import ForgotPass from '../Pages/Auth/ForgotPass'
import SignCode from '../Pages/Customer/SignCode'
import Main from '../Pages/Customer/Main'
import CustomerTrans from '../Pages/Customer/Transactions'
import CustomerAcc from '../Pages/Customer/Account'


const Routes = () => {

    return ( 
        <Switch>
            {/* <Route path="/home" exact component={Home}></Route> */}
            <Route exact path="/" component={Code}></Route>
            <Route path="/signup" component={CustomerSignUp}></Route>
            <Route path="/signin/" component={CustomerSignIn}></Route>
            <Route path="/otp/:mobile" component={CustomerOTP}></Route>
            <Route path="/signcode" component={SignCode}></Route>
            <Route path="/forgotpass" component={ForgotPass}></Route>
            <Route path="/main" component={Main}></Route>
            <Route path="/customertrans" component={CustomerTrans}></Route>
            <Route path="/customeracc" component={CustomerAcc}></Route>
            <Route path="/virtualmonitoring/:value" exact component={VirtualMonitoring}></Route>
            <Route path="/livemonitoring" exact component={LiveMonitoring}></Route>
            <Route path="/home" exact component={Home}></Route>
            <Route path="/ticketing/:id/:code" exact component={Ticketing}></Route>
            <Route path="/welcome" exact component={Welcome}></Route>
            <Route path="/transactions" exact component={Transactions}></Route>
            <Route path="/account" exact component={Account}></Route>
            <Route path="/dataprivacy" exact component={DataPrivacy}></Route>
            <Route path="/admin/auth" exact component={AdminAuth}></Route>
            <Route path="/admin/dashboard" exact component={Dashboard}></Route>
            <Route path="/admin/counterstaffaccount" exact component={CounterStaffAccount}></Route>
            <Route path="/admin/servicemanagement" exact component={ServiceManagement}></Route>
            <Route path="/admin/countermanagement" exact component={Counters}></Route>
            <Route path="/admin/queuingtransaction" exact component={QueuingTransaction}></Route>
            <Route path="/admin/settings" exact component={Settings}></Route>
            <Route path="/counterstaff/auth" exact component={counterStaffAuth}></Route>
            <Route path="/counterstaff/home" exact component={CounterHome}></Route>
            <Route path="/counterstaff/transactions" exact component={CounterTransactions}></Route>
            <Route path="/counterstaff/counteraccount" exact component={CounterAccount}></Route>
            <Route path="*" exact component={NotFound}></Route>
        </Switch>
     );
}
 
export default Routes;