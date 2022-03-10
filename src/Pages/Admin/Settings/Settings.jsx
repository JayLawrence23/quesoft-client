//React
//Material
import { Grid, makeStyles, Paper, Typography, Button } from '@material-ui/core';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import AdminLayout from "../../../Components/AdminLayout";
import PageHeader from "../../../Components/PageHeader";
import { Form, useForm } from '../../../Components/useForm';
import Controls from '../../../Components/Controls/Controls';
import SystemSettings from './SystemSettings';
import Industry from './Industry';
import AlertMessage from '../../../Components/AlertMessage';
import { getAdminData, updateAdminUser } from '../../../Actions/admin';



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

const Settings = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('admin')));
    const { adminData } = useSelector((state) => state.adminAuth);
    const data = { id: user.result ? user.result._id : user._id};

    const initialFValues = {
        id: user.result ? user.result._id : user._id,
        name: user.result ? user.result.name : user.name,
        username: user.result ? user.result.username : user.username,
        email: user.result ? user.result.email : user.email,
        contact: user.result ? user.result.contact : user.contact,
        secemail: user.result ? user.result.secemail : user.secemail,
    }

    const { values, setValues, errors, setErrors, resetForm, handleInputChange } = useForm(initialFValues);

    useEffect(() => {
        dispatch(getAdminData(data));
        // eslint-disable-next-line
    }, []);

    const validate = () => {
        let temp = {}
        temp.name = values.name ? "" : "This field is required."
        temp.username = values.username ? "" : "This field is required."
        temp.contact = values.contact ? "" : "This field is required."
        temp.secemail = (!(/$^|.+@.+..+/).test(values.secemail)) ? "Email is not valid." : (!(values.email) ? "This field is required." : "")
        temp.email = (!(/$^|.+@.+..+/).test(values.email)) ? "Email is not valid." : (!(values.email) ? "This field is required." : "")

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "");
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //To not refresh the form after clickng submit

        if(validate()){
            dispatch(updateAdminUser(values, setIsError, setIsSuccess));
        }
       
    }

    return ( 
        <AdminLayout>
            <PageHeader 
                title="Settings"
                subTitle="Manage your account and the QueSoft System"
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
                                    name="name"
                                    value={values.name || ""}
                                    label="Full Name"
                                    onChange={ handleInputChange}
                                    error={errors.name}
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

                                <Controls.Input
                                    name="contact"
                                    value={values.contact || ""}
                                    label="Contact No"
                                    onChange={ handleInputChange}
                                    error={errors.contact}
                                    half
                                    fullWidth
                                />

                                <Controls.Input
                                    name="secemail"
                                    value={values.secemail || ""}
                                    label="Secondary Email"
                                    onChange={ handleInputChange}
                                    error={errors.secemail}
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

               <SystemSettings />
               <Industry /> 
            </div>
            
        </AdminLayout>
     );
}
 
export default Settings;