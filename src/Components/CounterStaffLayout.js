import { AppBar, Avatar, Badge, Button, Drawer, 
    IconButton, List, ListItem, ListItemIcon, ListItemText, 
    makeStyles, Toolbar, Typography,  Dialog, Slide, DialogActions, 
    DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { grey, pink } from '@material-ui/core/colors';
import { alpha } from '@material-ui/core/styles';
import { AppsOutlined, DesktopWindowsOutlined, Notifications, ReceiptOutlined } from '@material-ui/icons';
import { format } from 'date-fns';
import decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import logo from '../Assets/Images/logo-que.png';
import SidebarName from './SidebarName';
import { signOutCounterStaff } from '../Actions/counterStaff';

const drawerWidth = 240;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => {
    return {
        page: {
            width: '100%'
        },
        drawer: {
            width: drawerWidth,
            [theme.breakpoints.down('sm')]: {
                width: 60,
            },
        },
        drawerPaper: {
            width: drawerWidth,
            [theme.breakpoints.down('sm')]: {
                width: 60,
            },
        },
        root: {
            display: 'flex'
        },
        active: {
            background: '#f4f4f4',
            fontWeight: 'bold',
        },
        title: {
            // padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`,
            [theme.breakpoints.down('sm')]: {
                width: `calc(100% - 60px)`,
            },
            boxShadow: 'none',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
            backgroundColor: alpha(theme.palette.background.default, 0.72),
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1,
            color: '#0e0e0e',
        },
        avatar: {
            height: theme.spacing(7),
            width: theme.spacing(7),
            marginRight: theme.spacing(2)
        },
        listtext: {
            color: grey[600],
            fontWeight: 'fontWeightMedium',
        },
        headerdrawer: {
            display: 'flex',
            paddingBlock: theme.spacing(2),
            alignItems: 'center',
        },
        listitem: {
            borderRadius: theme.spacing(6),
            background: pink,
        }
    }
})

const CounterStaffLayout = ({ children }) => {

    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('counterstaff')));
    const [openDialog, setOpenDialog] = useState(false);
    const values = {
        id: user.result ? user.result._id : user._id,
        service: user.updatedCounterStaff ? user.updatedCounterStaff.curService : user.curService,
        counter: user.updatedCounterStaff ? user.updatedCounterStaff.curCounter : user.curCounter,
    }

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleLogout = () => {
        dispatch(signOutCounterStaff(values));
        dispatch({ type: 'LOGOUT_COUNTERSTAFF' });
        history.push('/counterstaff/auth');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        // JWT....
        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 12000 < new Date().getTime()) handleLogout();
        } else if(!user){
            handleLogout();
        }

        setUser(JSON.parse(localStorage.getItem('counterstaff')));
        //eslint-disable-next-line
    }, [location]);

    const menuItems = [
        {
            text: "Home",
            icon: <AppsOutlined color="secondary" />,
            path: '/counterstaff/home'
        },
        {
            text: "Account",
            icon: <DesktopWindowsOutlined color="secondary" />,
            path: '/counterstaff/counteraccount'
            
        },
        {
            text: "Transactions",
            icon: <ReceiptOutlined color="secondary" />,
            path: '/counterstaff/transactions'
        }
    ]
    

    return ( 
        <div className={classes.root}>
            {/* { app bar } */}
            <AppBar
                className={classes.appbar}
                elevation={0}
            >
                <Toolbar>
                    <Typography className={classes.date}>
                        Welcome, {user.result ? user.result.fname : user.fname }! Today is the { format(new Date(), 'do MMMM Y')}
                    </Typography>

                    <IconButton aria-label="show 11 new notifications" color="primary">
                        <Badge badgeContent={10} color="secondary">
                            <Notifications />
                        </Badge>
                    </IconButton>
                    <Button color="primary" onClick={handleClickOpen}>Logout</Button>
                    
                </Toolbar>
            </AppBar>

            {/* { side drawer } */}
            <Drawer
                className={ classes.drawer }
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
            >
                <div className={ classes.headerdrawer}>
                    <Avatar src={logo} className={classes.avatar}/>
                    <Typography variant="h5" className={ classes.title }>
                        QueSoft
                    </Typography>
                    
                </div>
                { user && <SidebarName name={user.result ? user.result.fname : user.fname} user={user.result ? user.result.fname.charAt(0) : user.fname.charAt(0)}/>}

                {/* { List Links} */}

                <List>
                    { menuItems.map(item => (
                        <ListItem 
                        button
                        key={item.text}
                        onClick={() => history.push(item.path)}
                        className={location.pathname === item.path ? classes.active : null} //If the route is on the location, active class will execute
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} className={ classes.listtext}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Logout"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure want to logout?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleLogout} color="primary">
                    Logout
                </Button>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
            
            <div className={ classes.page }>
                <div className={classes.toolbar}></div>
                { children }
            </div>
        </div>
     );
}
 
export default CounterStaffLayout;