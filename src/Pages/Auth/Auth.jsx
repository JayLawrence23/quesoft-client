//Material
import { Container, Paper, Button, Typography, Grid, Fade  } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
//React
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//Components
import { useForm, Form } from '../../Components/useForm';
import Controls from '../../Components/Controls/Controls';
import { signin, signup } from '../../Actions/customerAuth'
import AlertMessage from '../../Components/AlertMessage'
import imgLogin from '../../Assets/Images/login-img.jpg'
import imgSignup from '../../Assets/Images/imgsignup.jpg'
import logo from '../../Assets/Images/logo-que.png'


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(8),
        display: 'flex',
        alignItems: 'center'
    },
    btn: {
        borderRadius: 50,
        margin: '15px 0',
    },
    title: {
        marginBottom: 20,
        fontWeight: '600'
    },
    paperStyle: {
        padding: theme.spacing(5),
        paddingBottom: 80,
        borderRadius: 16,
    },
    gridcontainer: {
        borderRadius: 16, 
        boxShadow: '-1px 0px 21px 0px rgba(207,184,146,0.75)',
      
    },
    leftlogin: {
        backgroundImage: `linear-gradient(0deg, rgba(13, 13, 13, 0.5), rgba(13, 13, 13, 0.6)), url(${imgLogin})`,
        height: '100%',
        width: '100%',
        backgroundSize: 'cover',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        [theme.breakpoints.down('xs')]: {
            borderTopRightRadius: 16,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        },
    },
    leftsignup: {
        backgroundImage: `linear-gradient(0deg, rgba(13, 13, 13, 0.5), rgba(13, 13, 13, 0.6)), url(${imgSignup})`,
        height: '100%',
        width: '100%',
        backgroundSize: 'cover',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        [theme.breakpoints.down('xs')]: {
            borderTopRightRadius: 16,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        },
    },
    textlogo: {
        fontWeight: 'bold',
        color: 'white',
    }, 
    textspanlogo: {
        fontWeight: 'bold',
        color: theme.palette.primary[400],
        display: 'inline',
    },
    lefttitle: {
        padding: theme.spacing(5),
    },
    textcontent: {
        color: 'white',
        marginBlock: theme.spacing(5)
    },
    textvirtual: {
        position: 'relative',
        '&:before': {
            content: "''",
            height: 4,
            position: 'absolute',
            width: 110,
            background: theme.palette.primary[400],
            bottom: -1,
            [theme.breakpoints.down('sm')]: {
                left: -90,
            },
        }
    }
}));

const initialFValues = {
    fname: '',
    lname: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    date_created: new Date(),
}


const Auth = () => {

    let history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [agree, setAgree] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const { values, setValues, errors, setErrors, resetForm, handleInputChange } = useForm(initialFValues);

    const validate = () => {
        let regularExpression = /(?=^.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])(?=^.*[^\s].*$).*$/;
        let temp = {}
        temp.fname = values.fname ? "" : "This field is required."
        temp.lname = values.lname ? "" : "This field is required."
        temp.mobile = !(values.mobile) ? "This field is required." : ((!(values.mobile.length === 11)) ? "11 digits required." : "")
        temp.email = (!(/$^|.+@.+..+/).test(values.email)) ? "Email is not valid." : (!(values.email) ? "This field is required." : "")
        temp.password = !(values.password) ? "This field is required." : (((values.password.length < 8)) ? "Password should at least 8 characters" : (!(regularExpression).test(values.password)) ? "Password should have at least one digit, letter and special character" : "")
        temp.confirmPassword = values.confirmPassword !== values.password ? "Password doesn't match!" : (values.confirmPassword ? "" : "This field is required.")
        setErrors({
            ...temp
        })
        // ( ^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$)

        return Object.values(temp).every(x => x === "");
    }

    const validateLogin = () => {
        let temp = {}
        temp.email = (!(/$^|.+@.+..+/).test(values.email)) ? "Email is not valid." : (!(values.email) ? "This field is required." : "")
        temp.password = values.password ? "" : "This field is required."
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "");
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    // To proceed to home page if someone logged in
    useEffect(() => {
        // JWT....
        if(user){
            history.push('/home');
        }

    }, [location]);

    const handleSubmit = (e) => {
        e.preventDefault(); //To not refresh the form after clickng submit
       
        if(isSignup){
            if(validate()){
                dispatch(signup(values, history, setIsValid));
            }
        } else {
            if(validateLogin()){
                dispatch(signin(values, history, setIsValid));
            }
        }
    }

    return (
        <Container className={classes.root}>
            <Grid container className={classes.gridcontainer}>
                <Grid item xs={12} sm={5} md={7}>
                    { isSignup ? 
                    (<Fade in timeout={1300}>
                        <div className={classes.leftsignup}>
                            <div className={classes.lefttitle}>
                                <Typography variant="h4" className={classes.textlogo}>
                                    <span className={classes.textspanlogo}> Q</span>
                                    ueSoft
                                </Typography>
                                <Typography variant="subtitle1" className={classes.textcontent}>
                                    Quesoft enable people to monitor
                                    your progress in real time, so that you could also do other things that you could do while
                                    you are waiting for your turn without wasting your precious time in line.
                                </Typography>
                                <Typography variant="h6" className={classes.textcontent}>
                                    <span className={classes.textvirtual}>Sign Up</span> Now!
                                </Typography>
                            </div>
                        </div>
                    </Fade>) 
                    : 
                    (<Fade in timeout={1300}>
                        <div className={classes.leftlogin}>
                            <div className={classes.lefttitle}>
                                <Typography variant="h4" className={classes.textlogo}>
                                    <Typography variant="h4" className={classes.textspanlogo}>Q</Typography> 
                                    ueSoft
                                </Typography>
                                <Typography variant="subtitle1" className={classes.textcontent}>
                                    Quesoft enable people to monitor
                                    your progress in real time, so that you could also do other things that you could do while
                                    you are waiting for your turn without wasting your precious time in line.
                                </Typography>
                                <Typography variant="h6" className={classes.textcontent}>
                                    Get your <span className={classes.textvirtual}>Virtual Ticket</span> Now!
                                </Typography>
                            </div>
                        </div>
                    </Fade>)
                    }
                   
                </Grid>
                <Grid item xs={12} sm={7} md={5}>
                    <Paper elevation={0} className={classes.paperStyle}>
                        <img src={logo} alt="quesoft-logo" style={{ height: 60, marginLeft: -10, marginBottom: 6 }} />
                        <Typography className={classes.title} variant="h5" color="textPrimary" component="h4" gutterBottom>
                        { isSignup ? 'Sign Up' : 'Login'}
                    
                        </Typography>
                        { isValid && (isSignup ? 
                        <AlertMessage severity="error" message="Existing Account."/> :
                        <AlertMessage severity="error" message="Invalid Account."/>)}

                        <Form onSubmit={handleSubmit}>
                            <Grid container spacing={1}>
                                {
                                    isSignup && (
                                        <>
                                            <Controls.Input
                                                name="fname"
                                                value={values.fname}
                                                label="First Name"
                                                onChange={handleInputChange}
                                                error={errors.fname}
                                                autoFocus
                                                half

                                            />

                                            <Controls.Input
                                                onChange={handleInputChange}
                                                label="Last Name"
                                                name="lname"
                                                value={values.lname}
                                                error={errors.lname}
                                                half
                                            />

                                            <Controls.Input
                                                label="Mobile Number (eg. 0912)"
                                                onChange={handleInputChange}
                                                name="mobile"
                                                value={values.mobile}
                                                error={errors.mobile}
                                                fullWidth
                                            />
                                        </>
                                    )
                                }

                            <Controls.Input
                                onChange={handleInputChange}
                                label="Email"
                                name="email"
                                value={values.email}
                                error={errors.email}
                                fullWidth
                            />

                            <Controls.Input
                                onChange={handleInputChange}
                                label="Password"
                                type={ showPassword ? "text" : "password"} 
                                handleShowPassword={handleShowPassword}
                                name="password"
                                value={values.password}
                                error={errors.password}
                                fullWidth
                            />

                            {
                                isSignup && (
                                    <>
                                        <Controls.Input
                                            onChange={handleInputChange}
                                            label="Repeat Password"
                                            type="password"
                                            name="confirmPassword"
                                            value={values.confirmPassword}
                                            error={errors.confirmPassword}
                                            fullWidth
                                        />
                                        

                                        <Controls.Checkbox
                                            name="checkedB"
                                            label="I have read and agree the Privacy Policy"
                                            onChange={() => setAgree(!agree)}
                                        />
                                    </>
                                )
                            }

                            <Controls.Button
                                text={ isSignup ? 'Register' : 'Login' }
                                fullWidth
                                type="submit"
                                className={classes.btn}
                                disabled={isSignup ? !agree : false }
                            />
                            </Grid>
                        

                        </Form>
                        <Button onClick={() => {
                            setIsSignup((prevIsSignup) => !prevIsSignup);
                            resetForm();
                            setIsValid(false);
                        }}
                        color="primary">
                        { isSignup ? 'Already have an account?' : "Don't have an account? Sign Up"}
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
            
        </Container>
    );
}

export default Auth;