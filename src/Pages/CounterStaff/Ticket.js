import { Paper, Typography, Box, Button, ButtonGroup } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import CallMissedOutgoingOutlinedIcon from '@material-ui/icons/CallMissedOutgoingOutlined';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import logo from '../../Assets/Images/logo-que.png'
import qaudio from '../../Assets/Audio/queuing-sound.wav'
import { arrivedCustomer, missedCustomer } from '../../Actions/transaction';
import { completeMissedTicket } from '../../Actions/counterStaff';

const useStyles = makeStyles((theme) => ({
    logo: {
        height: theme.spacing(7),
        margin: '2em auto'
    },
    ticketStyle: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        position: 'relative',
        borderRadius: '16px'
       
    },
    paperStyle: { 
        padding: 30, 
        borderRadius: 16,
        background: theme.palette.primary[400],
        margin: '30px auto',  
        maxWidth: 460,
    },
    bite: {
        content: '',
        width: 25,
        height: 25, 
        background: theme.palette.primary[400],
        borderRadius: '50%',
        position: 'absolute',
    }, 
    icon: {
        padding: 10,
        '&:hover': { 
            color: 'white'
        } 
    },
    divider: {
        content: '',
        width: '100%',
        height: .7, 
        opacity: .4,
        background: 'gray',
        position: 'absolute',
        bottom: '22%'
    },
    buttongroup: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    buttonticket: {
        [theme.breakpoints.down('xs')]: {
            marginBlock: theme.spacing(1),
        },
    },
    buttongrouproot: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          margin: theme.spacing(1),
        },
    },
}));

const Ticket = ( { handleClickOpenDone, ticket, calling, handleClickOpenMissed }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [isServing, setIsServing] = useState(false);
    const [audio] = useState(new Audio(qaudio));
    const [playing, setPlaying] = useState(false);

    let values = {};

    if(ticket){
        values = {
            id: ticket._id,
            counterName:  ticket.counterName,
            service: ticket.service,
            ticketNo: ticket.ticketNo
        }
    }

    useEffect(() => {
        if(ticket.status === "Serving"){
            setIsServing(true);
        } else if (ticket.status === "Calling") {
            setIsServing(false);
            console.log(ticket.status)
        }
         // eslint-disable-next-line
    }, [])

    const handleArrived = () => {
        setIsServing(true);
        arrivedCustomer(values);
    }

    const handleDone = () => {
        if(ticket){
            dispatch(completeMissedTicket(ticket));
        }
    }

    return ( 
        <Paper className={classes.paperStyle}>
            <Paper elevation={0} className={classes.ticketStyle}>
                <img src={logo} alt="logo" className={classes.logo} />
                { ticket ?
                <Typography component="span">
                    <Box fontSize={20}>Ticket Number:</Box>
                    
                    <Box fontWeight="fontWeightBold" fontSize={40}>{ticket.ticketNo}</Box>
                   
                    <Box fontSize={18}></Box>
                    <Box fontSize={12} style={{ marginBlock: '1rem'}}>Virtual Queuing</Box>
                </Typography>
                 : null }
                <div>
                    
                </div>
                <div>
                    <div className={classes.buttongroup}>
                        { isServing ?

                        <>  
                            <Button 
                                    variant="contained"
                                    color="secondary" 
                                    className={classes.buttonticket}
                                    startIcon={<CheckCircleOutlineOutlinedIcon />}
                                    onClick={handleClickOpenDone}>
                                    Done
                            </Button>
                            <Button 
                                    variant="contained"
                                    color="default" 
                                    className={classes.buttonticket}
                                    startIcon={<CallMissedOutgoingOutlinedIcon />}
                                    onClick={() => setIsServing(false)}>
                                    Back
                            </Button>
                        </>

                        :
                        
                        ticket.status === "Serving Missed" ? 
                        
                        <Button 
                            variant="contained"
                            color="secondary" 
                            className={classes.buttonticket}
                            startIcon={<CheckCircleOutlineOutlinedIcon />}
                            onClick={handleDone}>
                            Done
                        </Button>
                      
                        :   
                        <>
                            <Button
                                    variant="contained"
                                    color="primary" 
                                    className={classes.buttonticket}
                                    startIcon={<CheckCircleOutlineOutlinedIcon />}
                                    onClick={handleArrived}>
                                    Arrived
                            </Button>
                            <Button 
                                    variant="contained"
                                    color="secondary" 
                                    className={classes.buttonticket}
                                    startIcon={<NotificationsActiveOutlinedIcon />}
                                    onClick={() => {
                                        audio.play();
                                    }}>
                                    Call Again
                            </Button>
                       
                            <Button 
                                    variant="contained"
                                    color="default" 
                                    className={classes.buttonticket}
                                    startIcon={<CallMissedOutgoingOutlinedIcon />}
                                    onClick={handleClickOpenMissed}>
                                    Missed
                            </Button>
                        </>
                        

                        }
                    </div>
                </div>
                <div className={classes.bite} style={{ right: -12, bottom: '52%' }}></div>
                <div className={classes.bite} style={{ left: -12, bottom: '52%'}}></div>
                <Typography variant="caption" display="block" style={{ margin: '2rem 0'}} gutterBottom>
                   
                </Typography>

            </Paper>
        </Paper>
     );
}
 
export default Ticket;