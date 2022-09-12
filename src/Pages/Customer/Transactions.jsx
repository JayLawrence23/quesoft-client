import { Button, Divider, Grid, Paper, Typography, } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';


import CustomerLayout from '../../Components/CustomerLayout';
import useStyles from './styles/main';

const Transactions = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const  { monitor } = useSelector((state) => state.customerAuth)

    return (
        <CustomerLayout>
             <Paper className={classes.bodycontainer}>
                <Grid container className={classes.root} spacing={3}>
                    <Grid item xs={12}>
                        <Typography
                            variant="h4"
                            color="main"
                            component="overline"
                            className={classes.welcometitle}
                            gutterBottom
                            noWrap
                        >
                        Transactions
                        </Typography>
                        
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={1} >
                            {/* Start of loop */}
                            <Grid item xs={12}> 
                                <Grid container spacing={1} className={classes.cell}>
                                    <Grid item xs={6}>
                                        <Typography
                                            variant="body2"
                                            color="main"
                                            component="overline"
                                            // className={classes.welcometitle}
                                            gutterBottom
                                            noWrap
                                            >
                                            Ticket No: 
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Typography
                                            variant="body2"
                                            color="main"
                                            component="overline"
                                            // className={classes.welcometitle}
                                            gutterBottom
                                            noWrap
                                            >
                                            Service
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Typography
                                            variant="body2"
                                            color="main"
                                            component="overline"
                                            // className={classes.welcometitle}
                                            gutterBottom
                                            noWrap
                                            >
                                            Status:
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Typography
                                            variant="body2"
                                            color="main"
                                            component="overline"
                                            // className={classes.welcometitle}
                                            gutterBottom
                                            noWrap
                                            >
                                            Date: 
                                        </Typography>
                                    </Grid>
                                </Grid> 
                            </Grid>
                            
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