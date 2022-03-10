import { useHistory } from 'react-router-dom';
import { makeStyles, Typography, Paper, Divider, ButtonBase } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { useDispatch } from 'react-redux';
import { getTicket } from '../Actions/services';

const useStyles = makeStyles((theme) => ({
    buttonbase: {
        width: '100%', 
        height: '100%', 
        borderRadius: 16
    },
    services: {
        minHeight: 220,
        backgroundColor: theme.palette.primary[500],
        borderRadius: 16,
        padding: theme.spacing(3),
        textAlign: 'left',
        width: '100%',
        height: '83%'
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

const ServiceCard = ( { service }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    // const {service } = useSelector((state) => state.services)
    // const  {ticket} = useSelector((state) => state.ticket)

    // const handleOnClick = () => {
    //     props.history.push('/ticket', { service: 7 })
    // }
// Pending
    // useEffect(() => {
    //     dispatch(getService(service._id));
    // }, [])

    
    let ticketLength = service.ticketNo && service.ticketNo.length + 1;
    let currentTicketNo = service.prefix+"-0"+ticketLength;
    // let predictedWaitTime = service.ticketNo * 4;
    let code = Math.random().toString(36).slice(2);
    
    const handleGetTicket = () => {
        dispatch(getTicket( { 
            service: service.servName, 
            ticketNo: currentTicketNo,
            code: code,
            business: service.business,
        }))
        history.push(`/ticketing/${service._id}/${code}`);
    }

    return ( 
       <>
         <ButtonBase onClick={handleGetTicket} className={classes.buttonbase}>
        {/* <ButtonBase onClick={handleOnClick()}> */}

            <Paper elevation={0} className={classes.services}>
                <Typography variant="h4" component="h4" className={classes.servicetitle} gutterBottom>
                    { service.servName }<span className={classes.firstdot}>.</span>
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle1" className={classes.servicesubtitle} gutterBottom>
                    { service.desc }
                </Typography>
                <Typography style={{ fontStyle: 'italic', color: 'white' }}>Waiting: <Typography display="inline" variant="button" style={{ fontWeight: 'bold', color: 'white' }}>{ service.queuingTic.length}</Typography></Typography>
            </Paper>
        </ButtonBase>
       </>
     );
}
 
export default ServiceCard;