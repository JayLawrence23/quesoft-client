import { Grid, Paper, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdvertisement } from '../../Actions/admin';
import { leaveQueuing } from '../../Actions/services';
import { getTransactions, leaveQueuesWaiting } from '../../Actions/transaction';
import qaudio from '../../Assets/Audio/queuing-sound.wav';
import ads from '../../Assets/Images/ads.jpeg';
import Layout from '../../Components/Layout';
import { SocketContext } from '../../Socket';
// import { socket } from '../../Socket';
import useStyles from './styles/livemonitoring';

const LiveMonitoring = () => {
    const {socket} = useContext(SocketContext)
    const classes = useStyles();
    const dispatch = useDispatch();

    const  { waiting} = useSelector((state) => state.ticket)
    const { advertise } = useSelector((state) => state.adminAuth);
    const [audio] = useState(new Audio(qaudio));

    useEffect(() => {
        dispatch(getAdvertisement());
         // eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(getTransactions());
         // eslint-disable-next-line
    }, []) 

      //Socket IO starts

    // useEffect(() => {
    //     dispatch(getTicketData(user.result._id));
    // }, [location]) 

    useEffect(() => {
        if(!socket) return
      socket.on('generateticket', message => {
          dispatch(getTransactions());
      })
      socket.on('arrived', message => {
          dispatch(getTransactions());
      })
      socket.on('complete', message => {
          dispatch(getTransactions());
      })
      socket.on('leave', message => {
          dispatch(getTransactions());
      })
      socket.on("call",() => {
          dispatch(getTransactions());
      });
      socket.on("call",() => {
          dispatch(getTransactions());
      });
      socket.on('generateticket', message => {
          dispatch(getTransactions());
      })
      socket.on('arrived', message => {
          dispatch(getTransactions());
      })
      socket.on('complete', message => {
          dispatch(getTransactions());
      })
      socket.on('leave', message => {
          dispatch(getTransactions());
      })
    }, [socket])
    

    //End of socket
  
    // useEffect(()=> {
    //     socket.on("call",() => {
    //         dispatch(getTransactions());
    //     });
    
    //     return () => socket.off("call");
    // },[]);

   
    

    return (
        <Layout>
            <Grid container className={classes.root} spacing={3}>
                <Grid item md={6} xs={12}>

                    <Paper elevation={0} className={classes.paper}>
                        <img src={ads} alt="Advertisement" height="400px" width='100%' />
                    </Paper>

                    <Paper elevation={0} className={classes.announcementpaper}>
                        <Typography variant="h3" className={classes.announcetext}>Announcements</Typography>
                        <Typography variant="h4" style={{ fontWeight: 600, marginBottom: 26, }}>
                            { advertise ? advertise.adsTitle : 'TITLE '}
                        </Typography>
                        
                        <Typography variant="subtitle1" style={{ fontSize: 24 }}>
                            { advertise ? advertise.adsDesc : 'DESC' }
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item md={6} xs={12}>
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
                            NOW SERVING
                            </Typography>
                        </Grid>

                        { waiting.map((call) => 
                            call.status === "Calling" ? 
                            (<Grid item key={call._id} xs={12} sm={6}>
                                <Paper elevation={0} className={classes.servingcontainer}>
                                    <Typography
                                        variant="h5"
                                        color="textPrimary"
                                        component="h4"
                                        className={`${classes.servingcontent} ${classes.nowservingnumber}`}
                                    >
                                    {call.ticketNo}
                                    </Typography>
                                
                                    <div>
                                        <Typography variant="subtitle2" color="textSecondary" component="h4">
                                            {call.service}
                                            {() => {
                                                audio.play();
                                            }}
                                        </Typography>

                                        <Typography variant="subtitle1" color="textPrimary" component="h4" style={{fontWeight: 600,}}>
                                            {call.counterName}
                                        </Typography>
                                    </div>
                                </Paper>
                            </Grid>)
                            : null 
                        )}

                        { waiting.map((wait) => 
                            wait.status === "Serving" ? 
                            (<Grid item key={wait._id} xs={12} sm={6}>
                                <Paper elevation={0} className={classes.servingcontainer}>
                                    <Typography
                                        variant="h5"
                                        color="textPrimary"
                                        component="h4"
                                        className={classes.servingcontent}
                                    >
                                    {wait.ticketNo}
                                    </Typography>
                                
                                    <div>
                                        <Typography variant="subtitle2" color="textSecondary" component="h4">
                                            {wait.service}
                                        </Typography>

                                        <Typography variant="subtitle1" color="textPrimary" component="h4" style={{fontWeight: 600,}}>
                                            {wait.counterName}
                                        </Typography>
                                    </div>
                                </Paper>
                            </Grid>)
                            : null 
                        )}
                    </Grid> 

              
                    <Grid container spacing={2} className={classes.waitingcontainer}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h4"
                                color="secondary"
                                component="h4"
                                className={classes.servingtitle}
                                gutterBottom
                                noWrap
                            >
                                WAITING
                            </Typography>
                        </Grid> 

                        { waiting.map((wait) => 
                            wait.status === "Waiting" ? 
                            (<Grid item key={wait._id} xs={6} sm={4}>
                                <Paper elevation={0} className={classes.waitingcells}>
                                    <Typography
                                        variant="h5"
                                        color="textPrimary"
                                        component="h4"
                                        className={classes.servingcontent}
                                    >
                                    {wait.ticketNo}
                                    </Typography>
                                </Paper>
                            </Grid>)
                            : null 
                        )}
                    </Grid>
                
                    <Grid container spacing={2} className={classes.waitingcontainer}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h4"
                                color="secondary"
                                component="h4"
                                className={classes.servingtitle}
                                gutterBottom
                                noWrap
                            >
                                MISSED QUEUES
                            </Typography>
                        </Grid>

                        { waiting.map((wait) => 
                            wait.status === "Missed" ? 
                            (<Grid item key={wait._id} xs={6} sm={4}>
                                <Paper elevation={0} className={classes.waitingcells}>
                                    <Typography
                                        variant="h5"
                                        color="textPrimary"
                                        component="h4"
                                        className={classes.servingcontent}
                                    >
                                    {wait.ticketNo}
                                    </Typography>
                                </Paper>
                            </Grid>)
                            : null 
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default LiveMonitoring;