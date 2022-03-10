import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getService, getServiceByName } from '../Actions/services';
import { countCounterByService } from '../Actions/counters';
import logo from '../Assets/Images/logo-que.png';
import Qrcode from 'qrcode.react';
import { socket } from '../Socket';

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
        maxWidth: 350,
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
    qrcode: {
        height: 20,
        width: 20,
        margin: '16px auto',
    },
    nowservingnumber: {
        animation: `$change 1s step-end infinite`,
    },
    '@keyframes change': {
        '0%': {
            color: theme.palette.primary[400]
        },
        '50%': {
            color: '#2E2E2E'
        },
        '100%': {
            color: theme.palette.primary[400]
        },
    },
}));

const Ticket = ( { ticketNo, serviceName, isQRShow, predictedWait, code, email}) => {

    const classes = useStyles();
    const {service} = useSelector((state) => state.services)
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const [isQR, setIsQR] = useState(isQRShow);
    const { countCounter } = useSelector((state) => state.counter);
    const value = { service: serviceName };
    
    useEffect(() => {
        dispatch(getService(id));
        //eslint-disable-next-line
    }, [id])

    useEffect(() => {
        dispatch(countCounterByService(value));
        if(predictedWait){
            dispatch(getServiceByName(value));
        }
        //eslint-disable-next-line
    }, [])

    function timeConvert(n) {
        let num = n;
        let hours = (num / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        let singularHour = rhours < 2 ? 'hour' : 'hours';
        let singluarMinute = rminutes < 2 ? 'minute' : 'minutes';
        let zeroHour = rhours === 0 ? null : `${rhours} ${singularHour} and `;
        return zeroHour + rminutes + ` ${singluarMinute}`;
    }
   

    if(!service) return null;
    
    let timeDeduct;
    let ticketLen;
    let predictedWaitTime;
    let predictWaitPercent = predictedWait;
    
    timeDeduct = service.queuingTic && service.queuingTic.length * .11;
    ticketLen = service.queuingTic && service.queuingTic.length;
    predictedWaitTime = service.queuingTic && service.queuingTic.length * service.aveServTime;
   

    if(!isQR){
        if(!predictedWait){
            predictWaitPercent = .5;
        }
        timeDeduct = predictWaitPercent * .11;
        ticketLen = predictWaitPercent;
        predictedWaitTime = (predictWaitPercent * service.aveServTime);
    }
    
    let computedPredTime = (predictedWaitTime - timeDeduct) / countCounter;
    let currentDate = new Date();

    // console.log(predictedWaitTime)

    let noChangeTime = new Date(currentDate.getTime() + (computedPredTime * 60000));
    let lessTime = new Date(currentDate.getTime() + (computedPredTime - 3)*60000);
    let addTime = new Date(currentDate.getTime() + (computedPredTime + 3)*60000);

    if(predictedWait === 2){
        socket.emit('thirdIndex', 'test');
    }

    return ( 
        <Paper className={classes.paperStyle}>
            <Paper elevation={0} className={classes.ticketStyle}>
                <img src={logo} alt="logo" className={classes.logo} />

                <Typography component="div">
                    { predictedWait === 2 ? <Box fontWeight="fontWeightBold" fontSize={20}>You're near in line! Make sure you're inside at the vicinity.</Box> : null}
                    { predictedWait === 1 ? <Box fontWeight="fontWeightBold" fontSize={30}>You're Next! Please get ready.</Box> : null}
                    { predictedWait === 0 ? <Box fontWeight="fontWeightBold" fontSize={28} className={classes.nowservingnumber}>It's your turn! Please proceed to the counter</Box> : null}
                    <Box fontSize={20}>Ticket Number:</Box>
                    <Box fontWeight="fontWeightBold" fontSize={40}>{ticketNo}</Box>
                    <Box fontSize={18}>{serviceName}</Box>
                    { !isQR ? 
                    <Box fontSize={12} style={{ marginBlock: '1rem'}}>
                        Predicted Serving Time: &nbsp;
                        {ticketLen === 0 ? noChangeTime.toLocaleTimeString() + " - " + addTime.toLocaleTimeString() : lessTime.toLocaleTimeString() + " - " + addTime.toLocaleTimeString()}
                    </Box>
                    : null}
                    { isQR && <Box fontWeight="fontWeightBold" fontSize={14}>Scan this QR Code on your phone <br/> to monitor your queue virtually.</Box> }
                </Typography>
                { isQR ?
                <>
                    <Qrcode value={`https://quesoft-jaylawrence23.vercel.app/virtualmonitoring/${code}`} className={classes.qrcode}/>
                    
                    <div className={classes.bite} style={{ right: -12, bottom: '19%' }}></div>
                    <div className={classes.bite} style={{ left: -12, bottom: '19%'}}></div>
                    <Typography variant="caption" display="block" style={{ margin: '2rem 0'}} gutterBottom>
                        If you're not able to scan the QR code, <br/> Enter this code: <b> {code} </b> on <br /> 
                        https://quesoft-jaylawrence23.vercel.app/code
                    </Typography>
                </>
                : null }
                <Typography variant="caption" display="block" style={{ margin: '2rem 0'}} gutterBottom>
                    The customer should be at the vicinity at least 3 prior to their number.
                    <br /> Thank you for waiting.
                </Typography>

            </Paper>
        </Paper>
     );
}
 
export default Ticket;