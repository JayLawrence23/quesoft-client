import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Slide, Typography, AccordionDetails, AccordionSummary, Accordion, Chip } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { monitorTicket } from '../../Actions/customerAuth';
import { leaveQueuing } from '../../Actions/services';
import { getTransactions, leaveQueuesWaiting, emailNotif, smsNotif } from '../../Actions/transaction';
import Controls from '../../Components/Controls/Controls';
import Layout from '../../Components/Layout';
import Ticket from '../../Components/Ticket';
import { Form, useForm } from '../../Components/useForm'
// import { socket } from '../../Socket';
import useStyles from './styles/virtualmonitoring';
import { SocketContext } from '../../Socket';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const VirtualMonitoring = () => {
    const {socket} = useContext(SocketContext)
console.log('socket', socket)
    const classes = useStyles();

    const dispatch = useDispatch();
    const { value } = useParams();
    const initialFValues = {
        code: value,
        sms: '',
        email: '',
    }

    //For Now Serving
    const  {ticket, waiting} = useSelector((state) => state.ticket)
    const  { monitor } = useSelector((state) => state.customerAuth)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [openDialog, setOpenDialog] = useState(false);
    const [alignment, setAlignment] = useState('left');
    const id = monitor && monitor._id;
    const { values, setValues, errors, setErrors, resetForm, handleInputChange } = useForm(initialFValues);
    // const servicename = "" || monitor.service;

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
          setAlignment(newAlignment);
        }
    };

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        dispatch(getTransactions());
         // eslint-disable-next-line
    }, []) 
    
    useEffect(() => {
        dispatch(monitorTicket(value));
         // eslint-disable-next-line
    }, [value])

    const handleLeave = () => {
        dispatch(leaveQueuing(id));
        dispatch(leaveQueuesWaiting(id));
        handleClose();
    }

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

    const handleSubmit = (e) => {
        e.preventDefault(); //To not refresh the form after clickng submit
       
        if(alignment === "sms"){
            if(validateSms()){
                // dispatch(monitorTicketByCode(values, history, setIsValid));
                smsNotif(values);
            }
        } else {
            if(validateEmail()){
                // dispatch(monitorTicket(value));
                emailNotif(values);
            }
        }
       
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

      socket.on('call', (message) => {
        console.log('call');
        dispatch(getTransactions());
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

      // useEffect(()=> {
      //     socket.on("queuing",() => {
      //         dispatch(getTransactions());
      //     dispatch(monitorTicket(value));
      //     });

      //     return () => socket.off("queuing");
      // },[]);
    }, [socket]);
   
    return (
        <Layout>
            <Paper className={classes.bodycontainer}>
                { monitor && (monitor.status === "Waiting" || monitor.status === "Calling")? 
                <Grid container className={classes.root} spacing={3}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h4"
                                    color="secondary"
                                    component="h4"
                                    className={classes.servingtitle}
                                    gutterBottom
                                    noWrap
                                >
                                Your place in line:
                                </Typography>
                            </Grid>

                            { waiting.map((call) => 
                                (call.status === "Waiting" || call.status === "Calling") && (monitor && call.service === monitor.service)  ? 
                                (<Grid item key={call._id} xs={6} sm={4}>
                                    <Paper elevation={0} className={classes.servingcontainer}>
                                        <Typography
                                            variant="h5"
                                            color="textPrimary"
                                            component="h4"
                                            className={call.ticketNo === monitor.ticketNo ? `${classes.servingcontent} ${classes.monitornumber}` : `${classes.servingcontent}`}
                                        >
                                        {call.ticketNo}
                                        </Typography>
                                    
                                        {/* <div>
                                            <Typography variant="subtitle2" color="textSecondary" component="h4">
                                                {call.service}
                                            </Typography>

                                            <Typography variant="subtitle1" color="textPrimary" component="h4" style={{fontWeight: 600,}}>
                                                {call.counterName}
                                            </Typography>
                                        </div> */}
                                    </Paper>
                                </Grid>)
                                : null 
                            )}
                        
                        </Grid> 
                    </Grid>
                    { monitor ? (
                    <Grid item xs={12}>
                        <Typography
                            variant="h5"
                            color="textPrimary"
                            component="h4"
                            style={{ fontWeight: 'bold' }}
                            gutterBottom
                        >
                            Your Current Ticket
                        </Typography>
                        
                    
                        <Ticket ticketNo={monitor.ticketNo } 
                                serviceName={monitor.service} 
                                predictedWait={monitor.predWait}
                                isQRShow={false}
                                email={monitor.email && monitor.email}
                            />
                    

                        <div className={classes.button}>
                            <Controls.Button 
                                text="Leave Queuing"
                                onClick={handleClickOpen}
                            />
                        </div>
                    </Grid>

                
                    ) : null }
                    <Paper elevation={0} className={classes.papercontactbody}>
                        { monitor && (monitor.email === null && monitor.contact === null) ?
                        <div>
                            <Typography variant="h5">Want to receive real-time notifications via sms or email?</Typography>
                            <Typography variant="subtitle1">Notify your line progress.</Typography>
                            <ToggleButtonGroup
                                value={alignment}
                                exclusive
                                onChange={handleAlignment}
                                aria-label="notification"
                                style={{ marginBlock: '1rem' }}
                                >
                                <ToggleButton value="sms" aria-label="left aligned">
                                    SMS
                                </ToggleButton>
                                <ToggleButton value="email" aria-label="centered">
                                    Email
                                </ToggleButton>
                            </ToggleButtonGroup>

                            { alignment === "sms" ? 
                                <Paper className={classes.papercontact}>
                                    <Typography component="h6" variant="h6">Enter your mobile number:</Typography>

                                    <Form>
                                        <Grid container>
                                            <Controls.Input
                                                name="sms"
                                                value={ values.sms || ""}
                                                label="Mobile Num (eg. 0912)"
                                                onChange={ handleInputChange}
                                                error={errors.sms}
                                                fullWidth
                                            />

                                            <Controls.Button
                                                text="Notify Me" 
                                                type="submit"
                                                className={classes.btn}
                                                onClick={handleSubmit}
                                            />
                                        </Grid>
                                    </Form>
                                </Paper>
                            
                            : (
                                <Paper className={classes.papercontact}>
                                    <Typography component="h6" variant="h6">Enter your email:</Typography>

                                    <Form>
                                        <Grid container>
                                            <Controls.Input
                                                name="email"
                                                value={ values.email || ""}
                                                label="Email (eg. name@example.com)"
                                                onChange={ handleInputChange}
                                                error={errors.email}
                                                fullWidth
                                            />

                                            <Controls.Button
                                                text="Notify Me" 
                                                type="submit"
                                                className={classes.btn}
                                                onClick={handleSubmit}
                                            />
                                        </Grid>
                                    </Form>
                                </Paper>
                            )}
                        </div> : 
                        <Typography variant="h5">Notifications will sent to your { monitor && monitor.email !== null ? "email." : "phone."} </Typography>
                            }
                        
                    </Paper>
                    <Paper elevation={0} className={classes.papercontactbody}>
                        <Typography variant="h5" style={{ fontWeight: "bold", marginBottom: 15 }}>FAQs</Typography>
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            >
                            <Typography className={classes.heading}>Service covered:</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    {monitor && monitor.tags.map((tag) => (
                                        <Grid item xs={4} style={{ marginInline: 5}}>
                                            <Chip label={`${tag} `}/>
                                        </Grid>
                                    ))}

                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography className={classes.heading}>
                                    Can I complete all of my transactions even if my ticket is only for a particular service?
                                </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography>
                                    Generally, you are only allowed to use the specified ticket for a particular service. 
                                    It is important that you choose your start point and your service correctly before selecting a ticket. 
                                    However, you can still get a new ticket for another service and be entertained, ensuring a smooth and successful transaction.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        
                    </Paper>
                </Grid>
             

                :
                (
                    <Paper className={classes.feedbackpaper}>
                        <Typography
                            variant="h5"
                            component="h4"
                            style={{ fontWeight: 'bold', color: 'green' }}
                            gutterBottom
                        >Thank you for using virtual monitoring of queues.</Typography>
                    </Paper>
                )
                
                
                }
            </Paper>
            
            

            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Are you sure?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Once you click leave, you're ticket will mark as cancelled. Are you sure?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleLeave} color="primary">
                    Leave
                </Button>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
        </Layout>
    );
}

export default VirtualMonitoring;