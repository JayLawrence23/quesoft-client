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
    bodycontainer: {
        maxWidth: 480,
        marginInline: 'auto',
        marginBlock: '3.5rem',
        marginBottom: '5.8rem',
    },
    backbutton: {
        border: '1px ' + theme.palette.primary[500] + ' solid',
        marginRight: 20,
        padding: 0,
        '&:hover': {
            background: theme.palette.primary[500],
        }
    },
    buttonMonitor: {
        width: '100%',
        justifyContent: 'left',
        paddingBlock: '1rem',
        marginBlock: '.3rem',
        background: theme.palette.primary[400],
    },
    buttonTrans: {
        width: '100%',
        justifyContent: 'left',
        paddingBlock: '1rem',
        marginBlock: '.3rem',
        background: '#F4F4F4',

    },
    textvisit: {
        justifyContent: 'left',
        marginBlock: '.3rem',
        fontSize: 12,
        background: '#F4F4F4',
        paddingLeft: '1rem',
        paddingBlock: '.7rem',
        borderRadius: 7,
        // border: '1px #393939 solid',
    },
    button: {
        margin: '10px auto', 
        display: 'flex', 
        justifyContent: 'center' 
    },
    icon: {
        padding: 10,
        '&:hover': {
            color: 'white'
        }
    },
    servingtitle: {
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
            fontSize: 30,
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '5vw',
        },
    },
    welcometitle: {
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
            fontSize: 36,
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '7vw',
        },
    },
    displayname: {
        position: 'relative',
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
            fontSize: 36,
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '7vw',
        },
        '&::before': {
            content: "' '",
            position: 'absolute',
            height: 5,
            width: 30,
            background: theme.palette.primary[400],
            bottom: 1,
            left: 0,
        },
    },
    servingcontent: {
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
            fontSize: 24,
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '4vw',
        },
    },
    servingcontainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 16,
        padding: 7,
        background: '#FFF',
        boxShadow: '1px 2px 10px 2px rgba(217,217,230,0.55)',
        [theme.breakpoints.down('xs')]: {
            padding: '.5rem',
        },
    },
   
    //For the number current serving
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

    feedbackpaper: {
        margin: theme.spacing(5),
        padding: theme.spacing(5),

    }, 

    papercontact: {
        padding: theme.spacing(4),
        marginBlock: theme.spacing(2)
    },

    papercontactbody: {
        margin: theme.spacing(2),
    },
    heading: {
        fontWeight: 600,
    },
    cell: {
        background: '#F7F7F7',
        paddingBlock: 7,
        paddingInline: 6,
        borderBottom: '2px #D3D3D3 solid', 
    }
}));

export default useStyles;