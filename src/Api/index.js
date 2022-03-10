import axios from 'axios';

const API = axios.create({ baseURL: 'https://quesoft.herokuapp.com'});
// const API = axios.create({ baseURL: 'http://localhost:5000'});

// To help our auth middleware
// 
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});



export const fetchService = (id) => API.get(`/services/${id}`);
export const getServiceByName = (value) => API.post(`/services/servicename`, value);
export const fetchServices = () => API.get('/services');
export const createServices = (newService) => API.post('/services', newService);
export const updateServices = (id, updatedService) => API.patch(`/services/${id}`, updatedService);
export const deleteServices = (id) => API.delete(`/services/${id}`);
export const countersService = (service) => API.get('/services/counters', service);

// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (values) => API.post('/customers/signin', values);
export const signUp = (values) => API.post('/customers/signup', values);
export const monitorTicket = (value) => API.post(`/customers/monitor/${value}`);
export const monitorTicketByCode = (value) => API.post(`/customers/monitorbycode`, value);

export const createCounterStaff = (values) => API.post('/counterstaff/signup', values);
export const signInCounterStaff = (values) => API.post('/counterstaff/signin', values);
export const signOutCounterStaff = (values) => API.post('/counterstaff/signout', values);
export const fetchCounterStaff = () => API.get('/counterstaff');
export const fetchOneCounterStaff = (id) => API.get(`/counterstaff/${id}`);
export const deleteCounterStaff = (id) => API.delete(`/counterstaff/${id}`);
export const updateCounterStaff = (id, updatedCounterStaff) => API.patch(`/counterstaff/${id}`, updatedCounterStaff);
export const activateCounterStaff = (id) => API.patch(`/counterstaff/${id}/activation`);
export const updateCounterStaffUser = (values) => API.post(`/counterstaff/update/`, values);

export const createAdmin = (values) => API.post('/admin/signup', values);
export const signInAdmin = (values) => API.post('/admin/signin', values);
export const getAdminData = (values) => API.post('/admin/admindata', values);
export const getAdmin = () => API.post('/admin/admin');
export const updateAdminUser = (values) => API.post('/admin/update', values);
export const getAdvertisement = () => API.get('/admin/advertise');
export const createAdvertisement = (values) => API.post('/admin/createads', values);
export const updateAdvertisement = (id, values) => API.patch(`/admin/updateads/${id}`, values);
export const updateBusiness = (id, values) => API.patch(`/admin/updatebusiness/${id}`, values);

export const fetchCounter = (id) => API.get(`/counter/${id}`);
export const fetchCounters = () => API.get('/counter');
export const createCounter = (newCounter) => API.post(`/counter/`, newCounter);
export const updateCounter = (id, updatedCounter) => API.patch(`/counter/${id}`, updatedCounter);
export const deleteCounter = (id) => API.delete(`/counter/${id}`);
export const counterByService = (counterByServ) => API.post(`/counter/list`, counterByServ);
export const countCounterByService = (service) => API.post(`/counter/count`, service);


export const fetchTransaction = (id) => API.get(`/transaction/${id}`);
export const fetchTransactions = () => API.get('/transaction');
export const createTransaction = (newTrans) => API.post(`/transaction/`, newTrans);
export const deleteTransaction = (id) => API.delete(`/transaction/${id}`);
export const getTicketData = (service) => API.get(`/transaction/ticket/`, service);
export const leaveQueuing = (id) => API.patch(`/transaction/leave/${id}`);
export const callCustomer = (values) => API.patch(`/transaction/call`, values);
export const getCallingCustomers = () => API.patch(`/transaction/nowserve`);
export const ticketOnCounterStaff = (values) => API.patch('/transaction/counterticket/', values);
export const arrivedCustomer = (values) => API.patch('/transaction/arrived/', values);
export const missedCustomer = (values) => API.patch('/transaction/missed/', values);
export const queuingComplete = (values) => API.patch('/transaction/queuingdone/', values);
export const emailNotif = (values) => API.patch('/transaction/emailnotif/', values);
export const smsNotif = (values) => API.patch('/transaction/smsnotif/', values);

export const countWaitingByService = (values) => API.post('/transaction/countwait/', values);
export const countServedByService = (values) => API.post('/transaction/countserved/', values);
export const countMissedByService = (values) => API.post('/transaction/countmissed/', values);

export const countWaiting = () => API.post('/transaction/countwaitall/');
export const countServed = () => API.post('/transaction/countservedall/');
export const countMissed = () => API.post('/transaction/countmissedall/');
export const showMissed = (values) => API.post('/transaction/showmissed/', values);
export const searchMissedByService = (values) => API.post('/transaction/searchmissed/', values);
export const serveMissedTicket = (values) => API.post('/transaction/servemissed/', values);
export const completeMissedTicket = (values) => API.post('/transaction/completemissed/', values);