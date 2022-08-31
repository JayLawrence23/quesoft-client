import { Grid, Typography, makeStyles, Container, Paper, Button } from '@material-ui/core'
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Controls from '../../Components/Controls/Controls'
import Layout from '../../Components/Layout'
import { Form, useForm } from '../../Components/useForm'
import { signup } from '../../Actions/customerAuth'
import AlertMessage from '../../Components/AlertMessage'


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: theme.spacing(1),
        }
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
    },
    card: {
        padding: theme.spacing(6),
        boxShadow: '-1px 3px 12px 0px rgba(207,184,146,0.25)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    }

}));

const initialFValues = {
    fname: '',
    lname: '',
    mobile: '',
}

const CustomerSignUp = () => {

    const classes = useStyles();
    const history = useHistory();
    const [isValid, setIsValid] = useState(false);
    const dispatch = useDispatch();
    const { values, setValues, errors, setErrors, resetForm, handleInputChange } = useForm(initialFValues);

    const validate = () => {
        let temp = {}
        temp.mobile = values.mobile ? "" : "This field is required."
        temp.fname = values.fname ? "" : "This field is required."
        temp.lname = values.lname ? "" : "This field is required."

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "");
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //To not refresh the form after clickng submit
       
        if(validate()){
            dispatch(signup(values, history, setIsValid));
        }
    }

    const handleSignIn = () => {
        history.push("/signin");
    }


    return (
        <Layout>
            <Container className={classes.container}>
                <Paper elevation={0} className={classes.card}> 

                { isValid && (
                    <AlertMessage severity="error" message="The mobile number is already exist."/>)
                }
                        
                    <Typography component="h6" variant="h6">Sign Up</Typography>

                    <Form>
                        <Grid container >
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
                                label="Mobile Number (0945 eg.)"
                                onChange={ handleInputChange}
                                error={errors.mobile}
                                fullWidth
                            />

                            <Controls.Button
                                text="Sign Up" 
                                type="submit"
                                className={classes.btn}
                                onClick={handleSubmit}
                            />

                            <Grid item xs={12} sm={12}>
                                <Button onClick={handleSignIn}>Already have an account? Sign In</Button>
                            </Grid>
                           
                            
                        </Grid>
                    </Form>
                </Paper>
            </Container>
        </Layout>
    )
}

export default CustomerSignUp;
