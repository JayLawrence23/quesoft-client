import { Grid, Typography, makeStyles, Container, Paper, Button } from '@material-ui/core'
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Controls from '../../Components/Controls/Controls'
import Layout from '../../Components/Layout'
import { Form, useForm } from '../../Components/useForm'
import { monitorTicketByCode } from '../../Actions/customerAuth'
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
    otp: '',
}

const CustomerOTP = () => {

    const classes = useStyles();
    const history = useHistory();
    const [isValid, setIsValid] = useState(false);
    const dispatch = useDispatch();
    const { values, setValues, errors, setErrors, resetForm, handleInputChange } = useForm(initialFValues);

    const validate = () => {
        let temp = {}
        temp.otp = values.otp ? "" : "This field is required."

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "");
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //To not refresh the form after clickng submit
       
        if(validate()){
            dispatch(monitorTicketByCode(values, history, setIsValid));
        }
        history.push("/otp");
    }

    const handleSignIn = () => {
        history.push("/signup");
    }


    return (
        <Layout>
            <Container className={classes.container}>
                <Paper elevation={0} className={classes.card}> 

                { isValid && (
                    <AlertMessage severity="error" message="Invalid Code."/>)
                }
                        
                    <Typography component="h6" variant="h6">OTP</Typography>

                    <Form>
                        <Grid container>
                            <Controls.Input
                                name="otp"
                                value={ values.otp || ""}
                                label="Enter code"
                                onChange={ handleInputChange}
                                error={errors.otp}
                                fullWidth
                            />

                            <Controls.Button
                                text="Next" 
                                type="submit"
                                className={classes.btn}
                                onClick={handleSubmit}
                            />
                            
                        </Grid>
                    </Form>
                </Paper>
            </Container>
        </Layout>
    )
}

export default CustomerOTP;
