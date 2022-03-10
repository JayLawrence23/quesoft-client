//Material
import { FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select as MuiSelect, Typography } from '@material-ui/core';
//React
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { countersService, getCounters } from '../../Actions/counters';
import { signin } from '../../Actions/counterStaff';
import { getServices } from '../../Actions/services';
import logo from '../../Assets/Images/logo-que.png';
import AlertMessage from '../../Components/AlertMessage';
import Controls from '../../Components/Controls/Controls';
//Components
import { Form, useForm } from '../../Components/useForm';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
        backgroundColor: '#6e57aa',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 2 1'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%236e57aa'/%3E%3Cstop offset='1' stop-color='%23ffba8c'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23fffb24' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23fffb24' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='2' y2='2'%3E%3Cstop offset='0' stop-color='%23fffb24' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23fffb24' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='2' height='1'/%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='url(%23b)' points='0 1 0 0 2 0'/%3E%3Cpolygon fill='url(%23c)' points='2 1 2 0 0 0'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
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
        padding: 30,
        paddingBottom: 80,
        borderRadius: 16,
        width: 350,
        margin: '30px auto',
    },
    formControl: {
        '& .MuiInputBase-root': {
            borderRadius: 16,
        }
    }
}));


const initialFValues = {
    username: '',
    service: '',
    counterno: '',
    password: '',
}


const CounterStaff = () => {

    let history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('counterstaff')));

    const { values, setValues, errors, setErrors, resetForm, handleInputChange } = useForm(initialFValues);
    const { services } = useSelector((state) => state.services);
    const { countersbyserv } = useSelector((state) => state.counter);
    // const counters = services.counters;

    const validateLogin = () => {
        let temp = {}
        temp.service = values.service ? "" : "This field is required."
        temp.counterno = values.counterno ? "" : "This field is required."
        temp.username = values.username ? "" : "This field is required."
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
            history.push('/counterstaff/home');
        }
        // eslint-disable-next-line
    }, [location]);

    useEffect(() => {
        dispatch(getServices());
        dispatch(getCounters());
        // eslint-disable-next-line
    },[dispatch]);

    useEffect(() => {
        dispatch(countersService(values));
        // eslint-disable-next-line
    },[values.service]);

    const handleSubmit = (e) => {
        e.preventDefault(); //To not refresh the form after clickng submit
       
        if(validateLogin()){
            dispatch(signin(values, history, setIsValid));
        }
        
    }

    return (
        <div className={classes.root}>
            <Paper elevation={5} className={classes.paperStyle}>
                <img src={logo} alt="quesoft-logo" style={{ height: 60, marginLeft: -10, marginBottom: 6}} />
                <Typography className={classes.title} variant="h5" color="textPrimary" component="h4" gutterBottom>
                    Counter Staff Login
                </Typography>
                { isValid && ( <AlertMessage severity="error" message="Invalid Account."/>)}

                <Form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                <InputLabel htmlFor="outlined-age-native-simple" style={{ background: 'white', paddingInline: 5}}>Service</InputLabel>
                                <MuiSelect
                                    name="service"
                                    value={values.service}
                                    onChange={handleInputChange}
                                    error={errors.service}>
                                        <MenuItem value="">None</MenuItem>
                                        {
                                            services.map(
                                                item => (<MenuItem key={item._id} value={item.servName} > {item.servName} </MenuItem>)
                                            )
                                        }
                                    </MuiSelect>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                <InputLabel htmlFor="outlined-age-native-simple" style={{ background: 'white', paddingInline: 5}}>Counter Number</InputLabel>
                                <MuiSelect
                                    name="counterno"
                                    value={values.counterno}
                                    onChange={handleInputChange}
                                    error={errors.counterno}>
                                        <MenuItem value="">None</MenuItem>
                                        {
                                            
                                            // services.map((item) => item.servName === values.service)
                                            countersbyserv && countersbyserv.map(
                                                item => item.status === false ?
                                                (<MenuItem key={item._id} value={item.cName}> {item.cName} </MenuItem>)
                                                : null
                                            )
                                        }
                                    </MuiSelect>
                            </FormControl>
                        </Grid>

                        <Controls.Input
                            onChange={handleInputChange}
                            label="Username"
                            name="username"
                            value={values.username}
                            error={errors.username}
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

                        <Controls.Button
                            text='Login'
                            fullWidth
                            type="submit"
                            className={classes.btn}
                        />
                    </Grid>
                </Form>
            </Paper>
            
        </div>
    );
}

export default CounterStaff;