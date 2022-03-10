//Material
import { FormControl, Grid, InputLabel, makeStyles, Button, Paper, Typography } from '@material-ui/core';
//React
import { Link, useHistory } from 'react-router-dom';
import logo from '../Assets/Images/logo-que.png';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
        backgroundColor: "#FFAA7B",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='0' cy='800' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffa86c'/%3E%3Cstop offset='1' stop-color='%23ffa86c' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='1200' cy='800' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ff9888'/%3E%3Cstop offset='1' stop-color='%23ff9888' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='c' cx='600' cy='0' r='600' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ff9279'/%3E%3Cstop offset='1' stop-color='%23ff9279' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='d' cx='600' cy='800' r='600' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23FFAA7B'/%3E%3Cstop offset='1' stop-color='%23FFAA7B' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='e' cx='0' cy='0' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23FFA85C'/%3E%3Cstop offset='1' stop-color='%23FFA85C' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='f' cx='1200' cy='0' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23FF959F'/%3E%3Cstop offset='1' stop-color='%23FF959F' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1200' height='800'/%3E%3Crect fill='url(%23b)' width='1200' height='800'/%3E%3Crect fill='url(%23c)' width='1200' height='800'/%3E%3Crect fill='url(%23d)' width='1200' height='800'/%3E%3Crect fill='url(%23e)' width='1200' height='800'/%3E%3Crect fill='url(%23f)' width='1200' height='800'/%3E%3C/svg%3E")`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
    },
    btn: {
        borderRadius: 50,
        margin: '15px 0',
        
    },
    title: {
        marginTop: 25,
        fontWeight: '600',
        fontSize: 40,
    },
    subtitle: {
        marginBottom: 20,
        fontWeight: '700',
        fontSize: 40,
        color: theme.palette.primary[500],
    },
    paperStyle: {
        padding: 30,
        paddingBottom: 80,
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        width: 350,
        margin: '30px auto',
    },
    formControl: {
        '& .MuiInputBase-root': {
            borderRadius: 16,
        }
    }
}));

const Welcome = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={5} className={classes.paperStyle}>
                <img src={logo} alt="Advertisement" height="120px" width='100' />
                <Typography className={classes.title}>
                    Welcome to
                </Typography>
                <Typography className={classes.subtitle}>
                    QueSoft
                </Typography>
                <Button className={classes.button} variant="contained" color="white" component={Link} to={{ pathname: "/home" }}>
                    Get Started
                </Button>
            </Paper>
           
        </div>  
    )
}

export default Welcome
