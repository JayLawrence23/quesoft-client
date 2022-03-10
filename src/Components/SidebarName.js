//Material UI
import { makeStyles, Typography, Badge, Avatar, withStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
    return {
        avatar: {
            height: theme.spacing(7),
            width: theme.spacing(7),
            marginRight: theme.spacing(2)
        },

        headerprofile: {
            display: 'flex',
            paddingBlock: theme.spacing(2),
            alignItems: 'center',
            background: '#F0F1F6',
            borderRadius: 16,
            margin: theme.spacing(2),
            [theme.breakpoints.down('sm')]: {
                borderRadius: 0,
                margin: theme.spacing(0),
            },
        },
     
        avataricon: {
            background: theme.palette.primary[500],
            marginInline: 10
        },
        name: {
            marginLeft: 13,
            fontWeight: 'bolder'
        }
    }
})

const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }))(Badge);

const SidebarName = ({ name, user }) => {

    const classes = useStyles();

    return ( 
        <div className={classes.headerprofile}>
            <StyledBadge
                overlap="circular"
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
                }}
                variant="dot"
            >
                <Avatar className={classes.avataricon} alt={name}>
                    {user}
                </Avatar>
            </StyledBadge>
            <Typography variant="h6" className={ classes.name }>
                { name }
            </Typography>
        </div>
     );
}
 
export default SidebarName;