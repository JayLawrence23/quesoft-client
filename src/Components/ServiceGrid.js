import { Grid, makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../Actions/services';
import ServiceCard from './ServiceCard';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    services: {
        minHeight: 220,
        backgroundColor: theme.palette.primary[500],
        borderRadius: 16,
        padding: theme.spacing(3),
        textAlign: 'left',
    },
    servicetitle: {
        color: "#FFF",
        
    },
    divider: {
        height: 3,
        background: theme.palette.secondary[500],
        marginTop: theme.spacing(2)
    },
    servicesubtitle: {
        color: '#FFF',
        marginTop: theme.spacing(2),
    },
    subservice: {
        textAlign: 'left',
        minHeight: 220,
        backgroundColor: grey[100],
        borderRadius: 16,
        padding: theme.spacing(3),
    },
    firstdot: {
        color: theme.palette.secondary[500],
        fontSize: 40
    },
    subdot: {
        color: theme.palette.primary[500],
        fontSize: 40
    }
}));

const ServiceGrid = () => {

    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(getServices());
    },[dispatch]);

    const { services } = useSelector((state) => state.services);

    return ( 
        <div className={classes.root}>
            <Grid container spacing={2} style={{ padding: '1rem'}}> 
            
                {services.map((service) => (
                    <Grid item key={service._id} xs={12} sm={6} md={4}>
                        <ServiceCard service={service} />
                    </Grid>
                ))}

                {/* <Grid item xs={12} sm={6} md={3}>
                    <ButtonBase component={Link} to={{ pathname: "/ticketing", state}}>
                        <Paper elevation={0} className={classes.subservice}>
                            <Typography variant="h4" component="h4" style={{color: grey[900], }} gutterBottom>
                                Bills Payment<span className={classes.subdot}>.</span>
                            </Typography>
                            <Divider className={classes.divider} />
                            <Typography variant="subtitle1" style={{color: grey[900], marginTop: 6}} gutterBottom>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                            </Typography>
                            <Typography style={{ fontStyle: 'italic' }}>Waiting: 
                                <Typography display="inline" 
                                    variant="button" 
                                    color="textPrimary" 
                                    style={{ fontWeight: 'bold', }}> 12
                                </Typography>
                            </Typography>
                        </Paper>
                    </ButtonBase>
                </Grid>
               */}
            </Grid>
        </div>
     );
}
 
export default ServiceGrid;