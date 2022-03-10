//React
//Material
import { Grid, makeStyles, Paper, Typography, Button } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, useForm } from '../../../Components/useForm';
import Controls from '../../../Components/Controls/Controls';
import { updateAdvertisement, getAdvertisement } from '../../../Actions/admin';
import AlertMessage from '../../../Components/AlertMessage';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBlock: theme.spacing(3),
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
    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
    announcement: {
        fontWeight: 'bold',
        color: theme.palette.primary[400],
        marginBottom: theme.spacing(1),
        fontSize: 16,
    }
}));

const SystemSettings = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        dispatch(getAdvertisement());
        // eslint-disable-next-line
    }, []);

    const { advertise } = useSelector((state) => state.adminAuth);
    const id = advertise ? advertise._id : '';
    const initialFValues = {
        ads: '',
        title: advertise ? advertise.adsTitle : '',
        desc: advertise ? advertise.adsDesc : '',
    }
    
    const { values, setValues, errors, setErrors, resetForm, handleInputChange } = useForm(initialFValues);

    const validate = () => {
        let temp = {}
        temp.title = values.title ? "" : "This field is required."
        temp.desc = values.desc ? "" : "This field is required."
    
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "");
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //To not refresh the form after clickng submit

        if(validate()){
            dispatch(updateAdvertisement(id, values, setIsSuccess, setIsError));
        }
    }

    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant="h5">System Settings</Typography>
            <Typography variant="subtitle1" style={{ color: 'gray'}}>
                Change anything about the system
            </Typography>

            { isError ? (
            <AlertMessage severity="error" message="Editing Ads Failed."/>) : ( isSuccess ?
            <AlertMessage severity="success" message="Editing Ads Success."/> : null)}
            
            <Paper elevation={0} className={classes.form}>
                <Form>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Typography className={classes.announcement} variant="h5">Advertisement:</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.fileInput}>
                                <FileBase type="file" multiple={false} onDone={({base64}) => setValues({ ...values, ads: base64})}/>
                            </div>
                        </Grid>
                       

                        <Grid item xs={12}>
                            <Typography className={classes.announcement} variant="h5">Announcements:</Typography>
                        </Grid>

                        <Controls.Input
                            name="title"
                            value={values.title || ""}
                            label="Title"
                            onChange={handleInputChange}
                            error={errors.title}
                            fullWidth
                        />

                        <Controls.Input
                            name="desc"
                            value={values.desc || ""}
                            label="Description"
                            onChange={handleInputChange}
                            error={errors.desc}
                            multiline={true}
                            rows="3"
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
    )
}

export default SystemSettings
