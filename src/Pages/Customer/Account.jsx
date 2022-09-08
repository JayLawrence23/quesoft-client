import { Button, Divider, Grid, Paper, Typography, } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import { monitorTicket, updateCustomer } from '../../Actions/customerAuth';
import { getTransactions, } from '../../Actions/transaction';
import Controls from '../../Components/Controls/Controls';
import CustomerLayout from '../../Components/CustomerLayout';
import AlertMessage from '../../Components/AlertMessage'
import { Form, useForm } from '../../Components/useForm'
// import { socket } from '../../Socket';
import useStyles from './styles/main';
import { SocketContext } from '../../Socket';

const Account = () => {
    const {socket} = useContext(SocketContext)
    console.log('socket', socket)
    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();
    const { value } = useParams();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const initialFValues = {
        code: value,
        fname: user?.fname.trim(),
        lname: user?.lname.trim(),
        mobile: user?.mobile.trim(),
        email: user?.email.trim(),
    }

    const  { monitor } = useSelector((state) => state.customerAuth)
    const [openDialog, setOpenDialog] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const id = monitor && monitor._id;
    const { values, setValues, errors, setErrors, resetForm, handleInputChange } = useForm(initialFValues);
    const textdata = "SEgr"
    // const servicename = "" || monitor.service;

    useEffect(() => {
        dispatch(getTransactions());
         // eslint-disable-next-line
    }, []) 
    
    useEffect(() => {
        dispatch(monitorTicket(value));
         // eslint-disable-next-line
    }, [value])

    const validate = () => {
        let temp = {}
        temp.mobile = values.mobile ? "" : "This field is required."
        temp.fname = values.fname ? "" : "This field is required."
        temp.lname = values.lname ? "" : "This field is required."
        temp.email = (!(/$^|.+@.+..+/).test(values.email)) ? "Email is not valid." : (!(values.email) ? "This field is required." : "")

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "");
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //To not refresh the form after clickng submit
       
        if(validate()){
           dispatch(updateCustomer(user._id, values, setIsError, setIsSuccess))
        }
    }
    
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT'});

        history.push('/signin');
        setUser(null);
    }
   
    return (
        <CustomerLayout>
            <Paper className={classes.bodycontainer}>
                <Grid container className={classes.root} spacing={3}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h4"
                                    color="main"
                                    component="overline"
                                    className={classes.welcometitle}
                                    gutterBottom
                                    noWrap
                                >
                                Account Settings
                                </Typography>
                               
                               
                            </Grid>
                         
                        </Grid> 
                    </Grid>

                    <Grid item xs={12}>
                        <Form className={classes.root}>
                            <Grid container spacing={2}>
                            { isValid && (
                                <AlertMessage severity="error" message="The mobile number is already exist."/>)
                            }   
                            { isError ? (
                            <AlertMessage severity="error" message="Updating Account Error."/>) : ( isSuccess ?
                            <AlertMessage severity="success" message="Account Updated Successfully."/> : null)}
                                <Controls.Input
                                    name="fname"
                                    value={ values.fname || ""}
                                    label="First Name"
                                    onChange={ handleInputChange}
                                    error={errors.fname}
                                    fullWidth
                                />

                                <Controls.Input
                                    name="lname"
                                    value={ values.lname || ""}
                                    label="Last Name"
                                    onChange={ handleInputChange}
                                    error={errors.lname}
                                    fullWidth
                                />

                                <Controls.Input
                                    name="mobile"
                                    value={ values.mobile || ""}
                                    label="Mobile Number (eg. 0975)"
                                    onChange={ handleInputChange}
                                    error={errors.mobile}
                                    fullWidth
                                />
                                
                                <Controls.Input
                                    name="email"
                                    value={ values.email || ""}
                                    label="Email"
                                    onChange={ handleInputChange}
                                    error={errors.email}
                                    fullWidth
                                />

                                <Button
                                    type="submit"
                                    className={classes.btn}
                                    onClick={handleSubmit}
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                >
                                Save
                                </Button>
                            
                            </Grid>
                        </Form>
                    </Grid>
                   
                    <Grid item xs={12}>
                    <Divider />
                        <Typography variant='body2' align='center' style={{ marginTop: 10 }}>Or</Typography>
                        <Button
                            type="submit"
                            className={classes.btn}
                            onClick={handleLogout}
                            color="secondary"
                            variant="contained"
                            fullWidth
                        >
                            Logout
                        </Button>
                     
                    </Grid>
                </Grid>
            </Paper>
        </CustomerLayout>
    );
}

export default Account;