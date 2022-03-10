import { Container, IconButton, Typography } from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { countCounterByService } from '../../Actions/counters';
import { getService, getTicket, getTicketData } from '../../Actions/services';
import Controls from '../../Components/Controls/Controls';
import Layout from '../../Components/Layout';
import Ticket from '../../Components/Ticket';
import useStyles from './styles/ticketing';

const Ticketing = () => {

    const classes = useStyles();
    const {service, isLoading} = useSelector((state) => state.services)
    const  {ticket} = useSelector((state) => state.ticket)
    const dispatch = useDispatch();
    const history = useHistory();
    const { id, code } = useParams();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const { countCounter } = useSelector((state) => state.counter);
    const values = { service: service.servName } ;

    useEffect(() => {
        dispatch(getService(id));
         // eslint-disable-next-line
    }, [id])

    useEffect(() => {
        dispatch(getTicketData(service.servName));
        dispatch(countCounterByService(values));
         // eslint-disable-next-line
    }, [])

    

    if(!service) return null;

    let ticketLength = service.ticketNo && service.ticketNo.length + 1;
    let currentTicketNo = service.prefix+"-0"+ticketLength;

    // const location = useLocation();
    // const { selectedService } = location.state;

    // const { service } = (props.location && props.location.state) || {}

    const handleGetTicket = () => {
        dispatch(getTicket( {customerId: user.result._id, 
        customerName: user.result.fname, 
        service: service.servName, ticketNo: currentTicketNo}))
        history.push('/virtualmonitoring');

    }
    
    return (
        <Layout>
            <Container className={classes.root}>
                <div style={{ display: 'flex', alignItems: 'center', }}>
                    <IconButton className={classes.backbutton} component={Link} to={{ pathname: "/home" }}>
                        <ArrowBackRoundedIcon fontSize="medium" color="primary" className={classes.icon} />
                    </IconButton>
                    <Typography
                        variant="h5"
                        color="textPrimary"
                        component="h4"
                        style={{ marginTop: 5 }}
                        gutterBottom
                    >
                       { service.servName }
                    </Typography>
                </div>
            
          
                <Ticket ticketNo={currentTicketNo} serviceName={service.servName} code={code} isQRShow={true}/>
        
                {/* <Paper className={classes.paperStyle}>
                    <Paper elevation={0} className={classes.ticketStyle}>
                        <img src={logo} alt="logo" className={classes.logo} />

                        <Typography component="div">
                            <Box fontSize={20}>Ticket Number:</Box>
                            <Box fontWeight="fontWeightBold" fontSize={40}>{currentTicketNo}</Box>
                            <Box fontSize={18}>{service.servName}</Box>
                            <Box fontSize={18}>Jay Lawrence</Box>
                            <Box fontSize={12} style={{ marginBlock: '1rem'}}>Predicted Wait Time: {predictedWaitTime} minutes</Box>
                        </Typography>
                        
                        <div className={classes.divider} ></div>
                        <div className={classes.bite} style={{ right: -12, bottom: '19%' }}></div>
                        <div className={classes.bite} style={{ left: -12, bottom: '19%'}}></div>
                        <Typography variant="caption" display="block" style={{ margin: '2rem 0'}} gutterBottom>
                            Your number will be called shortly, <br /> Thank you for waiting.
                        </Typography>

                    </Paper>
                </Paper> */}

                { ticket ? null : (
                <div style={{ margin: '10px auto', display: 'flex', justifyContent: 'center' }}>
                    <Controls.Button
                        text="Get the Ticket Now"
                        onClick={handleGetTicket}
                    />

                    <Controls.Button
                        text="Get the Ticket for Later"
                        onClick={() => {
                            history.push('/scheduling')
                        }}

                        style={{ background: 'white', color: 'gray', border: '1px gray solid' }}
                    />
                </div>
                )}
            </Container>
        </Layout>
    );
}

export default Ticketing;
