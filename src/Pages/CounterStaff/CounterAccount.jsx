//React
//Material
import { Grid, makeStyles, Paper, Typography, Button } from '@material-ui/core';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import React, { useState,  } from 'react';
import { useDispatch } from 'react-redux';

import CounterStaffLayout from "../../Components/CounterStaffLayout";
import PageHeader from "../../Components/PageHeader";
import { Form, useForm } from '../../Components/useForm';
import Controls from '../../Components/Controls/Controls';
import { updateCounterStaffUser } from '../../Actions/counterStaff';
import AlertMessage from '../../Components/AlertMessage';
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    title: {
        fontWeight: 'bold',
        color: theme.palette.primary[400],
        marginBottom: theme.spacing(1),
    },
    form: {
        marginBlock: theme.spacing(2),
        padding: theme.spacing(6),
        background: '#f9f9f9',
        width: '60%',
        [theme.breakpoints.down('sm')]: {
            width: '80%',
        },
        
    },
    btn: {
        height: 50,
        borderRadius: 16,
        marginBlock: theme.spacing(1)
    }, 
    accountsettings: {
        marginBlock: theme.spacing(3),
    }
}));


const CounterAccount = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('counterstaff')));
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { counterstaffAuthData } = useSelector((state) => state.counterStaffAuth);

    const initialFValues = {
        id: user.updatedCounterStaff ? user.updatedCounterStaff._id : user._id,
        fname: user.updatedCounterStaff ? user.updatedCounterStaff.fname : user.fname,
        lname: user.updatedCounterStaff ? user.updatedCounterStaff.lname : user.lname,
        username: user.updatedCounterStaff ? user.updatedCounterStaff.username : user.username,
        email: user.updatedCounterStaff ? user.updatedCounterStaff.email : user.email,
    }
    const { values, setValues, errors, setErrors, resetForm, handleInputChange } = useForm(initialFValues);

    const validate = () => {
        let temp = {}
        temp.fname = values.fname ? "" : "This field is required."
        temp.lname = values.lname ? "" : "This field is required."
        temp.username = values.username ? "" : "This field is required."
        temp.email = (!(/$^|.+@.+..+/).test(values.email)) ? "Email is not valid." : (!(values.email) ? "This field is required." : "")

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x == "");
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //To not refresh the form after clickng submit

        if(validate()){
            dispatch(updateCounterStaffUser(values, setIsError, setIsSuccess));
        }
       
    }

    return ( 
        <CounterStaffLayout>
            <PageHeader 
                title="Account Settings"
                subTitle="Manage your account "
                icon={<SettingsOutlinedIcon fontSize="large"/>}
            />
            { isError ? (
                <AlertMessage severity="error" message="Editing Account Failed."/>) : ( isSuccess ?
                <AlertMessage severity="success" message="Editing Account Success."/> : null)}
            <div className={classes.root}>
                <div className={classes.accountsettings}>
                    <Typography className={classes.title} variant="h5">Account Settings</Typography>
                    <Typography variant="subtitle1" style={{ color: 'gray'}}>
                        Change your account settings
                    </Typography>

                    <Paper elevation={0} className={classes.form}>
                        <Form>
                            <Grid container spacing={2}>
                                <Controls.Input
                                    name="fname"
                                    value={values.fname || ""}
                                    label="First Name"
                                    onChange={ handleInputChange}
                                    error={errors.fname}
                                    half
                                    fullWidth
                                />

                                <Controls.Input
                                    name="lname"
                                    value={values.lname || ""}
                                    label="Last Name"
                                    onChange={ handleInputChange}
                                    error={errors.lname}
                                    half
                                    fullWidth
                                />

                                <Controls.Input
                                    name="username"
                                    value={values.username || ""}
                                    label="Username"
                                    onChange={ handleInputChange}
                                    error={errors.username}
                                    half
                                    fullWidth
                                />

                                <Controls.Input
                                    name="email"
                                    value={values.email || ""}
                                    label="Email"
                                    onChange={ handleInputChange}
                                    error={errors.email}
                                    half
                                    fullWidth
                                />
                                
                                <Grid item xs={12} md={3}>
                                    <Button
                                        variant="contained"
                                        label="Save"
                                        type="submit"
                                        color="primary"
                                        className={classes.btn}
                                        onClick={handleSubmit}
                                        fullWidth
                                    >
                                        Save 
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </Paper>
                </div>

            </div>
            
        </CounterStaffLayout>
     );
}
 
export default CounterAccount;