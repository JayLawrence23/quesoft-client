import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
    return {
        paperheader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: theme.spacing(3),
            [theme.breakpoints.down('sm')]: {
                // width: 60,
            },
        },
        tab: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
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
            paddingBlock: 12,
            background: '#FFF',
            boxShadow: '1px 2px 10px 2px rgba(217,217,230,0.55)',
            [theme.breakpoints.down('xs')]: {
                padding: '.5rem',
            },
        },
        waiting: {
            padding: theme.spacing(3),
            background: '#F7F7F7',
            marginTop: theme.spacing(2),
            borderRadius: 16,
            maxWidth: 400,
        },
        rightpaper: {
            borderRadius: 16,
            padding: theme.spacing(2),
        }
    }
    
})

export default useStyles;