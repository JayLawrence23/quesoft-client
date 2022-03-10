import { makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    btn: {
        borderRadius: 50,
        margin: '15px 0',
    },
    title: {
        marginBottom: 20,
        fontWeight: '600'
    },
    logo: {
        height: theme.spacing(7),
        margin: '2em auto'
    },
    backbutton: {
        border: '1px ' + theme.palette.primary[500] + ' solid',
        marginRight: 20,
        padding: 0,
        '&:hover': {
            background: theme.palette.primary[500],
        }
    },
    icon: {
        padding: 10,
        '&:hover': {
            color: 'white'
        }
    },
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
        maxWidth: 300,
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
    }
}));

export default useStyles;
