import { Container, IconButton, Typography } from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { countCounterByService } from '../../Actions/counters';
import { getService, getTicket, getTicketData } from '../../Actions/services';
import { getTransactions  } from '../../Actions/transaction';
import Layout from '../../Components/Layout';
import Ticket from '../../Components/Ticket';
import useStyles from './styles/ticketing';

const Ticketing = () => {

    const classes = useStyles();
    const {service, isLoading} = useSelector((state) => state.services)
    const  { waiting } = useSelector((state) => state.ticket)
    const dispatch = useDispatch();
    const { id, code } = useParams();
    const values = { service: service.servName };
    let currentTicketNo;


    useEffect(() => {
        dispatch(getService(id));
         // eslint-disable-next-line
    }, [id])

    useEffect(() => {
        dispatch(getTicketData( service && service.servName));
        dispatch(countCounterByService(values));
        dispatch(getTransactions());
         // eslint-disable-next-line
    }, [])


    if(!service) return null;

    let ticketLength = service.ticketNo && service.ticketNo.length + 1;

    waiting.map((tickets) => 
        tickets.code === code ? currentTicketNo = tickets.ticketNo : currentTicketNo = service.prefix+"-0"+ticketLength
    );
    
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
        
            </Container>
        </Layout>
    );
}

export default Ticketing;
