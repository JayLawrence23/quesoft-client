import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Badge,
  Slide,
  Tab,
  Tabs,
  Typography,
  InputLabel, 
  MenuItem, 
  Select as MuiSelect,
  FormControl
} from '@material-ui/core';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import PropTypes from 'prop-types';
import React, { useState, useEffect ,useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { socket } from '../../Socket';

// import qaudio from '../../Assets/Audio/queuing-sound.wav';
import CounterStaffLayout from '../../Components/CounterStaffLayout';
import TabPanel from '../../Components/TabPanel';
import Controls from '../../Components/Controls/Controls';
import { Form, useForm } from '../../Components/useForm';
import AlertMessage from '../../Components/AlertMessage';
import Ticket from './Ticket';
import {
  callCustomer,
  ticketOnCounterStaff,
  queuingComplete,
  missedCustomer,
  countWaitingByService,
  countMissedByService,
  countServedByService,
} from '../../Actions/transaction';
import {
  showMissed,
  searchMissedByService,
  serveMissedTicket,
  completeMissedTicket,
  createNewTicket,
} from '../../Actions/counterStaff';
import { getServices } from '../../Actions/services';
import useStyles from './homestyle';
import { SocketContext } from '../../Socket';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const CounterHome = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {socket} = useContext(SocketContext)

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('counterstaff'))
  );
  const [isServing, setIsServing] = useState(false);
  // const [audio] = useState(new Audio(qaudio));
  const [tabValue, setTabValue] = useState(0);
  const { ticket, showmissed } = useSelector((state) => state.counterStaffAuth);
  const [openDialog, setOpenDialog] = useState(false);
  const { waiting } = useSelector((state) => state.ticket);
  const { services } = useSelector((state) => state.services);
  const { countWaiting, countServed, countMissed } = useSelector(
    (state) => state.count
  );

  const [isMissedOpen, setIsMissedOpen] = useState(false);
  const [isMissedTicket, setIsMissedTicket] = useState(false);
  const [isCreateTicket, setIsCreateTicket] = useState(false);

  const [isValid, setIsValid] = useState(false);
  const initialFValues = {
    ticketNo: '',
    service: '',
  };
  const { values, setValues, errors, setErrors, resetForm, handleInputChange } =
    useForm(initialFValues);

  const valuescounter = {
    counterNo: user.updatedCounterStaff
      ? user.updatedCounterStaff.curCounter
      : user.curCounter,
    currentService: user.updatedCounterStaff
      ? user.updatedCounterStaff.curService
      : user.curService,
    service: user.updatedCounterStaff
      ? user.updatedCounterStaff.curService
      : user.curService,
  };

  let valuesNext = {};
  let valuesNewTicket = {};

  if (ticket) {
    valuesNext = {
      id: ticket._id,
      counterName: ticket.counterName,
      service: ticket.service,
      ticketNo: ticket.ticketNo,
    };

    valuesNewTicket= {
      business: ticket.business,
      id: ticket._id,
      code: ticket.code,
      service: values.service,
      email: ticket.email,
      contact: ticket.contact,
      monitor: true,
    };
  }

  useEffect(() => {
    dispatch(ticketOnCounterStaff(valuescounter));
    dispatch(countWaitingByService(valuescounter));
    dispatch(countMissedByService(valuescounter));
    dispatch(countServedByService(valuescounter));
    dispatch(showMissed(valuescounter));
    dispatch(getServices());
    if (ticket) {
      setIsServing(true);
    }
    // eslint-disable-next-line
  }, []);

  //Socket IO starts
  useEffect(() => {
      if (!socket) return;


    socket.on("call", (message) => {
      dispatch(ticketOnCounterStaff(valuescounter));
    });
    socket.on("arrived", (message) => {
      dispatch(countWaitingByService(valuescounter));
      dispatch(getServices());
    });
    socket.on('complete', (message) => {
      dispatch(ticketOnCounterStaff(valuescounter));
      dispatch(countWaitingByService(valuescounter));
      dispatch(countServedByService(valuescounter));
    });
    socket.on('missed', (message) => {
      dispatch(ticketOnCounterStaff(valuescounter));
      dispatch(countMissedByService(valuescounter));
    });
  }, [socket])
  

  const handleClickOpenDone = () => {
    setOpenDialog(true);
    setIsMissedOpen(false);
  };

  const handleClickOpenMissed = () => {
    setOpenDialog(true);
    setIsMissedOpen(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setIsMissedOpen(false);
    setIsMissedTicket(false);
    setIsCreateTicket(false);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDone = () => {
    dispatch(queuingComplete(valuesNext));
    dispatch(ticketOnCounterStaff(valuescounter));
    handleClose();
  };

  const handleNext = () => {
    console.log('valuescounter', valuescounter);
    dispatch(queuingComplete(valuesNext, valuescounter));

    // audio.play();
    handleClose();
  };

  const handleCallCustomer = (valuescounter) => {
    dispatch(callCustomer(valuescounter));
    dispatch(ticketOnCounterStaff(valuescounter));
  };

  const handleMissed = () => {
    missedCustomer(valuesNext);
    dispatch(callCustomer(valuescounter));
    // audio.play();
    handleClose();
  };

  const validate = () => {
    let temp = {};
    temp.ticketNo = values.ticketNo ? '' : 'This field is required.';

    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === '');
  };

  const handleSearchMissed = (e) => {
    e.preventDefault();

    if (validate()) {
      dispatch(
        searchMissedByService(
          values,
          setOpenDialog,
          setIsMissedTicket,
          setIsValid
        )
      );
    }
  };

  const validateNewTicket = () => {
    let temp = {};
    temp.service = values.service ? '' : 'This field is required.';

    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === '');
  };

  const handleClickOpenCreate = (e) => {
    e.preventDefault();
    
    if (validateNewTicket()) {
      setOpenDialog(true);
      setIsCreateTicket(true);
    }
    
  };

  const handleCreateTicket = () => {

    if (validateNewTicket()) {
      dispatch(
        createNewTicket(
          valuesNewTicket,
          setIsValid
        )
      );
      setOpenDialog(false);
      setIsCreateTicket(false);
    }
  };

  const handleServeMissed = () => {
    dispatch(serveMissedTicket(values));
    handleClose();
  };

 
  return (
    <CounterStaffLayout>
      <Paper className={classes.paperheader}>
        <Typography variant='h4'>{valuescounter.counterNo} </Typography>
        <Typography variant='h5' style={{ fontWeight: 'bold' }}>
          {valuescounter.currentService}{' '}
        </Typography>
      </Paper>
      <div className={classes.tab}>
        <AppBar position='static'>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label='simple tabs example'
          >
            <Tab label='In Progress' {...a11yProps(0)} />
            {/* <Tab label="Missed Queues" {...a11yProps(1)} /> */}
            {/* <Badge badgeContent={3} color="secondary" style={{ top: 13, right: 10}} /> */}
          </Tabs>
        </AppBar>
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={8}>
              {ticket ? (
                <Ticket
                  ticket={ticket}
                  handleClickOpenDone={handleClickOpenDone}
                  handleClickOpenMissed={handleClickOpenMissed}
                />
              ) : (
                <div>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => handleCallCustomer(valuescounter)}
                  >
                    Call {ticket && ticket.business === "School" ? "Student" : "Customer "}
                  </Button>
                </div>
              )}
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Paper elevation={0} className={classes.rightpaper}>
                {ticket ? (
                   <div>
                   <Typography variant='subtitle1' component={'span'}>
                     Create new ticket for  {ticket.ticketNo}
                   </Typography>

                   <Paper elevation={0} style={{ maxWidth: 400 }}>
                     {isValid && (
                       <AlertMessage
                         severity='success'
                         message='Ticket created successfully.'
                       />
                     )}

                     <Typography component={'span'} variant='h6'>
                       Select Service: {' '}
                     </Typography>

                     <Form>
                       <Grid container>
                          <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                <InputLabel htmlFor="outlined-age-native-simple" style={{ background: 'white', paddingInline: 5}}>Service</InputLabel>
                                <MuiSelect
                                    name="service"
                                    value={values.service}
                                    onChange={handleInputChange}
                                    error={!!errors.service}>
                                        <MenuItem value="">None</MenuItem>
                                        {
                                            services.map(
                                                item => (<MenuItem key={item._id} value={item.servName} > {item.servName} </MenuItem>)
                                            )
                                        }
                                    </MuiSelect>
                            </FormControl>
                          </Grid>

                         <Controls.Button
                           text='Create'
                           type='submit'
                           className={classes.btn}
                           onClick={handleClickOpenCreate}
                         />
                       </Grid>
                     </Form>
                   </Paper>
                 </div>
                ) : 
                (
                  <div>
                    <Typography variant='subtitle1' component={'span'}>
                      Missed Queue? Type here{' '}
                    </Typography>

                    <Paper elevation={0} style={{ maxWidth: 400 }}>
                      {isValid && (
                        <AlertMessage
                          severity='error'
                          message='Ticket Not Found.'
                        />
                      )}

                      <Typography component={'span'} variant='h6'>
                        Enter the missed ticket number:
                      </Typography>

                      <Form>
                        <Grid container>
                          <Controls.Input
                            name='ticketNo'
                            value={values.ticketNo && values.ticketNo.toUpperCase() || ''}
                            label='Ticket'
                            onChange={handleInputChange}
                            fullWidth
                            error={errors.ticketNo}
                          />

                          <Controls.Button
                            text='Search'
                            type='submit'
                            className={classes.btn}
                            onClick={handleSearchMissed}
                          />
                        </Grid>
                      </Form>
                    </Paper>
                  </div>
                )}
                
                <div className={classes.waiting}>
                  <Typography variant='subtitle1' component={'span'}>
                    Waiting:{' '}
                    <Box style={{ fontWeight: 'bold', color: '#EFB701' }}>
                      {countWaiting}
                    </Box>{' '}
                  </Typography>
                </div>
                <div className={classes.waiting}>
                  <Typography variant='subtitle1' component={'span'}>
                    Served:{' '}
                    <Box style={{ fontWeight: 'bold', color: 'orange' }}>
                      {countServed}
                    </Box>
                  </Typography>
                </div>
                <div className={classes.waiting}>
                  <Typography variant='subtitle1' component={'span'}>
                    Missed:{' '}
                    <Box style={{ fontWeight: 'bold', color: '#303443' }}>
                      {countMissed}
                    </Box>
                  </Typography>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={2}>
            {/* { showmissed.map((missed) =>
                            (<Grid item xs={12} sm={6}>
                                <Paper className={classes.servingcontainer} elevation={0}>
                                    <Typography variant="h5" color="textPrimary" component="h4" className={classes.servingcontent}>
                                        { missed.ticketNo }
                                    </Typography>
                                    <div>
                                        <Button variant="contained"
                                            color="secondary" 
                                            size="small"
                                            startIcon={<CheckCircleOutlineOutlinedIcon />}
                                            onClick={() => {
                                                audio.play();
                                            }}>
                                            Complete
                                        </Button>
                                    </div>
                                </Paper>
                            </Grid>) 
                        )} */}
          </Grid>
        </TabPanel>
        {/* <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel> */}
      </div>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>
          {'Are you sure?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {isMissedOpen
              ? `Once you click missed, the ${ticket && ticket.business === "School" ? "student" : "customer "} will miss the queue and will call next customer. Are you sure?`
              : isMissedTicket
              ? `Ticket found. Once you click serve, you'll be serving the ${ticket && ticket.business === "School" ? "student" : "customer "} who missed their queue.`
              : isCreateTicket
              ? "Sure ka na?"
              : `Once you click next, transaction is done and the next ${ticket && ticket.business === "School" ? "student" : "customer "} will call to serve. Once you click done, the transaction is done.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={
              isMissedOpen
                ? handleMissed
                : isMissedTicket
                ? handleServeMissed
                : isCreateTicket
                ? handleCreateTicket
                : handleNext
                
            }
            color='primary'
          >
            {isMissedOpen ? 'Missed' : isMissedTicket ? 'Serve' : isCreateTicket ? "Create" : 'Finish & Call Next'}
          </Button>
          { isMissedOpen ? null : isMissedTicket ? null : isCreateTicket ? null : (
            <Button onClick={handleDone} color='primary'>
              Finish
            </Button>
          )}
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </CounterStaffLayout>
  );
};

export default CounterHome;
