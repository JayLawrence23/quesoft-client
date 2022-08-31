import { Grid, Typography, makeStyles, Container, Paper, Button } from '@material-ui/core'
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Controls from '../../Components/Controls/Controls'
import Layout from '../../Components/Layout'
import { Form, useForm } from '../../Components/useForm'
import { signin } from '../../Actions/customerAuth'
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
        justifyContent: 'space-around',
        maxWidth: 560,
    }

}));

const initialFValues = {
    mobile: '',
}

const CustomerSignIn = () => {

    const classes = useStyles();
    const history = useHistory();
    const [isValid, setIsValid] = useState(false);
    const dispatch = useDispatch();
    const { values, setValues, errors, setErrors, resetForm, handleInputChange } = useForm(initialFValues);

    const validate = () => {
        let temp = {}
        temp.mobile = values.mobile ? "" : "This field is required."

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "");
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //To not refresh the form after clickng submit
       
        if(validate()){
            dispatch(signin(values, history, setIsValid));
        }
    }

    const handleSignIn = () => {
        history.push("/signup");
    }

    const handleForgot = () => {
        history.push("/forgotpass");
    }

    return (
        <Layout>
            <Container className={classes.container}>
                <Paper elevation={0} className={classes.card}> 

                { isValid && (
                    <AlertMessage severity="error" message="Account doesn't exist."/>)
                }
                        
                    <Typography component="h6" variant="h6">Sign In</Typography>

                    <Form>
                        <Grid container>
                            <Controls.Input
                                name="mobile"
                                value={ values.mobile || ""}
                                label="Mobile Number (eg. 0915)"
                                onChange={ handleInputChange}
                                error={errors.mobile}
                                fullWidth
                            />

                            <Controls.Button
                                text="Sign In" 
                                type="submit"
                                className={classes.btn}
                                onClick={handleSubmit}
                            />

                            <Grid item xs={12} style={{ marginBlock: 10 }}>
                                <Button onClick={handleForgot} color="primary">Forgot Password?</Button>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button onClick={handleSignIn}>No account yet? Sign Up Now</Button>
                            </Grid>
                           
                            
                        </Grid>
                    </Form>
                </Paper>
            </Container>
        </Layout>
    )
}

export default CustomerSignIn;
