import { makeStyles, Typography, Toolbar, AppBar, Avatar } from '@material-ui/core'
// import { ReceiptOutlined, DesktopWindowsOutlined, AppsOutlined, AccountCircleOutlined, EventNoteOutlined, Notifications } from '@material-ui/icons'
import { grey, pink } from '@material-ui/core/colors'
import { alpha } from '@material-ui/core/styles';

import React from 'react';

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
        }
    }
})

const Layout = ({ children }) => {

    const classes = useStyles();

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
                    </IconButton>
                    <Button color="primary" onClick={handleClickOpen}>Logout</Button> */}
                    
                </Toolbar>
            </AppBar>

            <div className={ classes.page }>
                <div className={classes.toolbar}></div>
                { children }
            </div>
        </div>
     );
}
 
export default Layout;