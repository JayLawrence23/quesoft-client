import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Slide, Typography, Divider, AccordionSummary, Accordion, Chip } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import { monitorTicket } from '../../Actions/customerAuth';
import { getTransactions, leaveQueuesWaiting, emailNotif, smsNotif } from '../../Actions/transaction';
import Controls from '../../Components/Controls/Controls';
import CustomerLayout from '../../Components/CustomerLayout';
import Ticket from '../../Components/Ticket';
import { Form, useForm } from '../../Components/useForm'
import Faqs from '../../Components/Faqs';
// import { socket } from '../../Socket';
import useStyles from './styles/main';
import { SocketContext } from '../../Socket';

const Main = () => {
    const {socket} = useContext(SocketContext)
    console.log('socket', socket)
    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();
    const { value } = useParams();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const initialFValues = {
        code: value,
        sms: '',
        email: '',
    }

    //For Now Serving
    const  {ticket, waiting} = useSelector((state) => state.ticket)
    const  { monitor } = useSelector((state) => state.customerAuth)
    const [alignment, setAlignment] = useState('left');
    const id = monitor && monitor._id;
    const { values, setValues, errors, setErrors, resetForm, handleInputChange } = useForm(initialFValues);
    const textdata = "SEgr"
    // const servicename = "" || monitor.service;

    useEffect(() => {
        dispatch(getTransactions());
         // eslint-disable-next-line
    }, []) 
    
    useEffect(() => {
        dispatch(monitorTicket(value));
         // eslint-disable-next-line
    }, [value])

 

    const validateSms = () => {
        let temp = {}
        temp.sms = values.sms ? "" : "This field is required."

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "");
    }
    
    const validateEmail = () => {
        let temp = {}
        temp.email = (!(/$^|.+@.+..+/).test(values.email)) ? "Email is not valid." : (!(values.email) ? "This field is required." : "")

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "");
    }

    useEffect(() => {
        console.log('socket', socket)
      if(!socket) return
      console.log('registering events on socket')
      socket.on('complete', (message) => {
        console.log('complete');
        dispatch(getTransactions());
        dispatch(monitorTicket(value));
      });
      socket.on('missed', (message) => {
        dispatch(getTransactions());
        dispatch(monitorTicket(value));
      });
      socket.on('leave', (message) => {
        dispatch(getTransactions());
        dispatch(monitorTicket(value));
      });
      socket.on('call', (message) => {
        console.log('call');
        dispatch(getTransactions());
        dispatch(monitorTicket(value));
      });
      socket.on('notif', (message) => {
        console.log('notif');
        dispatch(monitorTicket(value));
      });
      socket.off('call', (message) => {
        dispatch(getTransactions());
        dispatch(monitorTicket(value));
      });

      socket.off('complete', (message) => {
        dispatch(getTransactions());
        dispatch(monitorTicket(value));
      });

    }, [socket]);
   
    return (
        <CustomerLayout>
            <Paper className={classes.bodycontainer}>
                <Grid container className={classes.root} spacing={3}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h4"
                                    color="main"
                                    component="overline"
                                    className={classes.welcometitle}
                                    gutterBottom
                                    noWrap
                                >
                                Welcome,&nbsp;
                                </Typography>
                                <Typography
                                    variant="h4"
                                    color="main"
                                    component="overline"
                                    className={classes.displayname}
                                    gutterBottom
                                    noWrap
                                >
                                { user.lname }!
                                </Typography>
                               
                            </Grid>
                         
                        </Grid> 
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                           
                            <Grid item xs={12}>
                                <Typography
                                    variant="h6"
                                    color="main"
                                    component="h6"
                                    className={classes.textvisit}
                                    gutterBottom
                                    noWrap
                                >
                                LAST VISIT: 
                                </Typography>
                                <Divider style={{ marginBlock: '1rem' }}/>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    endIcon={<ArrowForwardIcon/>}
                                    className={classes.buttonMonitor}
                                >
                                    Monitor my current ticket
                                </Button>

                                <Button
                                    variant="contained"
                                    color="main"
                                    endIcon={<ArrowForwardIcon/>}
                                    className={classes.buttonTrans}
                                    onClick={() => history.push("/customertrans")}
                                >
                                    View my transactions
                                </Button>
                            </Grid>
                            
                            
                        </Grid>
                        
                    </Grid>
                   
                    <Paper elevation={0} className={classes.papercontactbody}>
                        <Typography variant="h5" style={{ fontWeight: "bold", marginBottom: 15 }}>FAQs</Typography>
                        
                        <Faqs />
                    </Paper>
                </Grid>
        
            </Paper>
            
        </CustomerLayout>
    );
}

export default Main;