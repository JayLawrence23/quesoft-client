//Material UI
import { AppBar, Avatar, Badge, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Button, Dialog, Slide, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { alpha } from '@material-ui/core/styles';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import EventSeatOutlinedIcon from '@material-ui/icons/EventSeatOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import { AppsOutlined, ReceiptOutlined } from '@material-ui/icons';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
//React
import { useHistory, useLocation } from 'react-router';
//Files
import logo from '../Assets/Images/logo-que.png';
import SidebarName from './SidebarName';

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
            borderRight: '3px solid orange',
            color: theme.palette.primary[500],
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
            // color: theme.palette.primary[500],
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
        },
    }
})

const AdminLayout = ({ children }) => {

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('admin')));
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT_ADMIN'});

        history.push('/admin/auth');
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
        
        setUser(JSON.parse(localStorage.getItem('admin')));
        //eslint-disable-next-line
    }, [location]);



    const menuItems = [
        {
            text: "Dashboard",
            icon: <AppsOutlined color="secondary" />,
            path: '/admin/dashboard'
        },
        {
            text: "Counter Staff Accounts",
            icon: <PeopleAltOutlinedIcon color="secondary" />,
            path: '/admin/counterstaffaccount'
            
        },
        {
            text: "Service Management",
            icon: <ForumOutlinedIcon color="secondary" />,
            path: '/admin/servicemanagement'
            
        },
        {
            text: "Counter Management",
            icon: <EventSeatOutlinedIcon color="secondary" />,
            path: '/admin/countermanagement'
            
        },
        {
            text: "Queuing Transactions",
            icon: <ReceiptOutlined color="secondary" />,
            path: '/admin/queuingtransaction'
        },
        {
            text: "Settings",
            icon: <SettingsOutlinedIcon color="secondary" />,
            path: '/admin/settings'
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
                        {/* Welcome, Admin! Today is the { format(new Date(), 'do MMMM Y')} */}
                    </Typography>
                
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

                <SidebarName name="Admin"/>

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
 
export default AdminLayout;