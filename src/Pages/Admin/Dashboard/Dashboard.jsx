import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

import AdminLayout from "../../../Components/AdminLayout";
import { Button, ButtonGroup, Typography, Box, makeStyles, Paper, Grid} from '@material-ui/core';
import BarChart from "../../../Components/Charts/BarChart";
import PieChart from "../../../Components/Charts/PieChart";
import { countWaiting, countMissed, countServed } from '../../../Actions/transaction';
import AveServBarChart from '../../../Components/Charts/AveServBarChart';
import AveServPieChart from '../../../Components/Charts/AveServPieChart';
import GeneratePDF from './GeneratePDF';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    btn: {
        borderRadius: 50,
        margin: '15px 0',
    },
    title: {
        marginBottom: '1rem',
        fontWeight: 'bold',
        color: theme.palette.primary[400],
    },
    header: {
        boxShadow: '-1px 3px 12px 0px rgba(207,184,146,0.25)',
        padding: '1.5em',
        borderRadius: 16
    },
    headertitle: {
        marginBottom: '1rem',
        fontWeight: 400,
        color: theme.palette.primary[200],
    },
    monitorpaper: {
        padding: '1.5em',
        background: '#fafafd',
        borderRadius: 16,
        border: '1px solid #F8F8F4',

    },
    barchart:{
        padding: '1.5em',
        marginBlock: '1.5em',
        background: '#fafafd',
        width: 790,
        boxShadow: '-1px 3px 10px 0px rgba(207,184,146,0.25)',
    },
    piechart: {
        padding: '1.5em',
        marginBlock: '1.5em',
        background: '#fafafd',
        width: 400,
        boxShadow: '-1px 3px 10px 0px rgba(207,184,146,0.25)',
    
    }
}));

const Dashboard = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const  { countWaitingAll, countServedAll, countMissedAll } = useSelector((state) => state.count);

    useEffect(() => {
        dispatch(countWaiting());
        dispatch(countMissed());
        dispatch(countServed());
        // eslint-disable-next-line
    }, [])

    return ( 
        <AdminLayout>
            <div className={classes.root}>
                <Typography className={classes.title} variant="h5">Dashboard</Typography>
                
                <div className={classes.header}>
                    <Typography className={classes.headertitle} variant="h5">On this day</Typography>
                    <Grid container spacing={2}>
                        <Grid item md={3} xs={12}>
                            <Paper elevation={0} className={classes.monitorpaper}>
                                <Typography component="div">
                                    <Box fontSize={20}>Waiting</Box>
                                    <Box fontWeight="fontWeightBold" fontSize={30}>{countWaitingAll}</Box>
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* <Grid item md={3} xs={12}>
                            <Paper elevation={0} className={classes.monitorpaper}>
                                <Typography component="div">
                                    <Box fontSize={20}>On Serve</Box>
                                    <Box fontWeight="fontWeightBold" fontSize={30}>20</Box>
                                </Typography>
                            </Paper>
                        </Grid> */}

                        <Grid item md={3} xs={12}>
                            <Paper elevation={0} className={classes.monitorpaper}>
                                <Typography component="div">
                                    <Box fontSize={20}>Served</Box>
                                    <Box fontWeight="fontWeightBold" fontSize={30}>{countServedAll}</Box>
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item md={3} xs={12}>
                            <Paper elevation={0} className={classes.monitorpaper}>
                                <Typography component="div">
                                    <Box fontSize={20}>Missed</Box>
                                    <Box fontWeight="fontWeightBold" fontSize={30}>{countMissedAll}</Box>
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item md={3} xs={12}>
                            <Paper elevation={0} className={classes.monitorpaper}>
                                <GeneratePDF />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>

                <Grid container spacing={2}>
                    <Grid item md={7} xs={12}>
                        <Paper elevation={0} className={classes.barchart}>
                            <Typography> Number of Customer served by Service{' '}</Typography>
                            <BarChart/>
                        </Paper>
                    </Grid>
                    <Grid item md={5} xs={12}>
                        <Paper elevation={0} className={classes.piechart}>
                            <PieChart waiting={countWaitingAll} served={countServedAll} missed={countMissedAll} />
                        </Paper>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item md={7} xs={12}>
                        <Paper elevation={0} className={classes.barchart}>
                            <Typography> Average Serving Time in Minutes by Service {' '}</Typography>
                            <AveServBarChart />
                        </Paper>
                    </Grid>
                    <Grid item md={5} xs={12}>
                        <Paper elevation={0} className={classes.piechart}>
                            <AveServPieChart />
                        </Paper>
                    </Grid>
                </Grid>

            </div>
        </AdminLayout>
    );
}
 
export default Dashboard;