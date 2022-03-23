import { Container, IconButton, Typography } from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { countCounterByService } from '../../Actions/counters';
import { getService, getTicket, getTicketData } from '../../Actions/services';
import { getTransactions  } from '../../Actions/transaction';
import Layout from '../../Components/Layout';
import Ticket from '../../Components/Ticket';
import useStyles from './styles/ticketing';
import { SocketContext } from '../../Socket';

const Ticketing = () => {

    const classes = useStyles();
    const {socket} = useContext(SocketContext)
    const {service, isLoading} = useSelector((state) => state.services)
    const  { waiting, ticket } = useSelector((state) => state.ticket)
    const dispatch = useDispatch();
    const { id, code } = useParams();
    const values = { service: service.servName };
    let currentTicketNo;



    useEffect(() => {
        dispatch(getService(id));
         // eslint-disable-next-line
    }, [id])

    let serviceCode = { 
        service: service && service.servName,
        code: code,
    }

    useEffect(() => {
        dispatch(getTicketData(serviceCode));
        dispatch(countCounterByService(values));
         // eslint-disable-next-line
    }, [])

    // useEffect(() => {
    //   if(!socket) return
    //   console.log('registering events on socket')
    //   socket.on('ticketData', (message) => {
    //     dispatch(getTicketData(serviceCode));
        
    //   });

    // }, [socket]);


    if(!service) return null;

    // let ticketLength = service.ticketNo && service.ticketNo.length;

    // waiting.map((tickets) => 
    //     tickets.code === code ? currentTicketNo = tickets.ticketNo : currentTicketNo = service.prefix+"-0"+ticketLength
    // );
    
    // console.log(ticket && ticket.ticketNo);

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
            
          
                <Ticket ticketNo={ ticket && ticket.ticketNo || ticket && ticket.newTransaction && ticket.newTransaction.ticketNo } serviceName={service.servName} code={code} isQRShow={true}/>
        
            </Container>
        </Layout>
    );
}

export default Ticketing;
