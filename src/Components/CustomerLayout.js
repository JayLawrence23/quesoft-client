import { makeStyles, Typography, Toolbar, AppBar, Avatar, Button, IconButton, Fab, } from '@material-ui/core'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

import { grey, pink } from '@material-ui/core/colors'
import { alpha } from '@material-ui/core/styles';

import React from 'react';
import { useHistory } from 'react-router';

import logo from '../Assets/Images/logo-que.png';

const useStyles = makeStyles((theme) => {
    return {
        page: {
            width: '100%'
        },
        root: {
            display: 'flex',
        },
        active: {
            background: '#f4f4f4',
            fontWeight: 'bold',
        },
        title: {
            // padding: theme.spacing(2)
            color: '#1f1f1f'
        },
        appbar: {
            boxShadow: 'none',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
            backgroundColor: alpha(theme.palette.background.default, 0.72),
        },
        botAppBar: {
            top: 'auto',
            bottom: 0,
            boxShadow: 'none',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
            backgroundColor: alpha(theme.palette.background.default, 0.72),
        },
        centertoolbar: {
            justifyContent: 'center',
        },
        navbar: {
            width: 480,
            // background: '#000',
            display: 'flex',
            justifyContent: 'space-evenly',
        },
        toolbar: theme.mixins.toolbar,
        date: {
            color: '#0f0f0f',
            right: '2rem',
            fontSize: 24,
            position: 'absolute',
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
        },
        iconactive: {
            color: theme.palette.secondary[600],
            fontSize: 26
        },
        iconbutton: {
            display: 'flex',
            flexDirection: 'column',
        }
    }
})

const CustomerLayout = ({ children }) => {

    const classes = useStyles();
    const history = useHistory();

    return ( 
        <div className={classes.root}>
            {/* { app bar } */}
            <AppBar
                className={classes.appbar}
                elevation={0}
            >
                <Toolbar>
                        <div className={ classes.headerdrawer}>
                            <Avatar src={logo} className={classes.avatar}/>
                            <Typography variant="h5" className={ classes.title }>
                                QueSoft
                            </Typography>
                            
                        </div>
                        {/* <Typography className={classes.date}>
                            Today is the { format(new Date(), 'do MMMM Y')}
                        </Typography> */}

                    {/* <IconButton aria-label="show 11 new notifications" color="inherit">
                        <Badge badgeContent={10} color="secondary">
                            <Notifications color="primary"/>
                        </Badge>
                    </IconButton> */}
                    <Button color="primary" >Logout</Button>
                    
                </Toolbar>
            </AppBar>

            <div className={ classes.page }>
                <div className={classes.toolbar}></div>
                { children }
            </div>

            <AppBar position="fixed" color="primary" className={classes.botAppBar}>
                <Toolbar className={classes.centertoolbar}>
                    <div className={classes.navbar}>
                        <IconButton 
                            edge="start" 
                            color="primary" 
                            aria-label="open drawer" 
                            classes={{label: classes.iconbutton}}
                            onClick={() => history.push("/main")}
                        >
                            <HomeOutlinedIcon />
                            <Typography variant="body2">
                                Home
                            </Typography>
                        </IconButton>
                        <IconButton 
                            color="primary" 
                            classes={{label: classes.iconbutton}}
                            onClick={() => history.push("/customertrans")}
                        >
                            <ReceiptOutlinedIcon />
                            <Typography variant="body2">
                                Transaction
                            </Typography>
                        </IconButton>
                        <IconButton 
                            edge="end" 
                            color="primary" 
                            classes={{label: classes.iconbutton}}
                            onClick={() => history.push("/customeracc")}
                        >
                            <AccountCircleOutlinedIcon />
                            <Typography variant="body2">
                                Account
                            </Typography>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
     );
}
 
export default CustomerLayout;