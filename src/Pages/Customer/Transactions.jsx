import { Button, Divider, Grid, Paper, Typography, } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import moment from 'moment'; 

import CustomerLayout from '../../Components/CustomerLayout';
import useStyles from './styles/main';
import { transHistory } from '../../Actions/customerAuth';

const Transactions = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const id ={
        id: user?._id,
    };

    useEffect(() => {
        dispatch(transHistory(id));
    },[dispatch]);

    const  { transhistory } = useSelector((state) => state.customerAuth);

    const formatDate = (date) => {
        const currentMonth = date.getMonth();
        const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
        const currentDate = date.getDate();
        const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
        return `${date.getFullYear()}-${monthString}-${currentDate}`;
    }
    
    return (
        <CustomerLayout>
             <Paper className={classes.bodycontainer}>
                <Grid container className={classes.root} spacing={3}>
                    <Grid item xs={12}>
                        <Typography
                            variant="h4"
                            color="main"
                            component="overline"
                            className={classes.displayname}
                            gutterBottom
                            noWrap
                        >
                        History
                        </Typography>
                        
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={1} >
                            {/* Start of loop */}
                            {transhistory?.map((history) => (
                                
                        
                            <Grid item key={history._id} xs={12}> 
                                <Grid container spacing={1} className={classes.cell}>
                                    <Grid item xs={7}>
                                        <Typography
                                            variant="body2"
                                            color="main"
                                            component="overline"
                                            // className={classes.welcometitle}
                                            gutterBottom
                                            noWrap
                                            >
                                            Ticket No: {history.ticketNo}
                                        </Typography>
                                    </Grid>
                                
                                    <Grid item xs={5}>
                                        <Typography
                                            variant="body2"
                                            color="main"
                                            component="overline"
                                            // className={classes.welcometitle}
                                            gutterBottom
                                            noWrap
                                            >
                                            Status:&nbsp;
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="main"
                                            component="overline"
                                            className={history.status === "Complete" ? classes.statuscomplete : classes.statuscancel }
                                            gutterBottom
                                            noWrap
                                            >
                                            {history.status}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={7}>
                                        <Typography
                                            variant="body2"
                                            color="main"
                                            component="overline"
                                            // className={classes.welcometitle}
                                            gutterBottom
                                            noWrap
                                            >
                                            Service: {history.service}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={5}>
                                        <Typography
                                            variant="body2"
                                            color="main"
                                            component="overline"
                                            // className={classes.welcometitle}
                                            gutterBottom
                                            noWrap
                                            >
                                            Time: {moment(history.createdAt).format('LT')}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography
                                            variant="body2"
                                            color="main"
                                            component="overline"
                                            // className={classes.welcometitle}
                                            gutterBottom
                                            noWrap
                                            >
                                            Date: {moment(history.createdAt).format('LL')}
                                        </Typography>
                                    </Grid>
                                </Grid> 
                            </Grid>
                            ))}
                        </Grid>
                    </Grid>
                   
                    <Grid item xs={12}>
                    <Divider />
                       
                     
                    </Grid>
                </Grid>
            </Paper>
        </CustomerLayout>
    );
}

export default Transactions;