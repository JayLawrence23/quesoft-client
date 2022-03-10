//React
//Material
import { Grid, makeStyles, Paper, Typography, Button, 
    Dialog, Slide, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import FileBase from 'react-file-base64';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, useForm } from '../../../Components/useForm';
import Controls from '../../../Components/Controls/Controls';
import { updateBusiness, getAdminData } from '../../../Actions/admin';
import AlertMessage from '../../../Components/AlertMessage';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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

const businessServiceItems = [
    { id: 'Pawnshop', title: 'Pawnshop' },
    { id: 'Bank', title: 'Bank' },
    { id: 'School', title: 'School' },
    { id: 'Others', title: 'Others' },
    

]

const Industry = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('admin')));
    const { adminData } = useSelector((state) => state.adminAuth);
    const data = { id: user.result ? user.result._id : user._id};
    const id = user ? user.result._id : user._id;
    const initialFValues = {
        business: user.result ? user.result.business : user.business,
        typeagain: '',
    }
    
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = (e) => {
        e.preventDefault(); 
        setOpenDialog(true);
        
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        dispatch(getAdminData(data));
        // eslint-disable-next-line
    }, []);

    const { values, setValues, errors, setErrors, resetForm, handleInputChange } = useForm(initialFValues);

    const validate = () => {
        let temp = {}
        temp.business = values.business ? "" : "This field is required."
        temp.typeagain = values.typeagain === values.business ? "" : "Incorrect Business Service";
    
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "");
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //To not refresh the form after clickng submit

        if(validate()){
            dispatch(updateBusiness(id, values, setIsSuccess, setIsError));
            setOpenDialog(false);
        }
    }

    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant="h5">Business Service</Typography>
            <Typography variant="subtitle1" style={{ color: 'gray'}}>
                Select the business service for this system
            </Typography>

            { isError ? (
            <AlertMessage severity="error" message="Updating Business Service Failed."/>) : ( isSuccess ?
            <AlertMessage severity="success" message="Updating Business Service Success."/> : null)}
            
            <Paper elevation={0} className={classes.form}>
                <Form>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Typography className={classes.announcement} variant="h5">Choose one:</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Controls.RadioGroup
                                name="business"
                                value={values.business || ""}
                                onChange={handleInputChange}
                                label="Choose your business service"
                                items={businessServiceItems}
                            />
                        </Grid>
                       

                      
                        
                        <Grid item xs={12} md={3}>
                            <Button
                                variant="contained"
                                label="Save"
                                type="submit"
                                color="primary"
                                className={classes.btn}
                                onClick={handleClickOpen}
                                fullWidth
                            >
                                Save 
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </Paper>

            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Are you sure?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Type the business service that you want to change.
                        <br/>
                        Make your that no pending transaction in queueing system to avoid technical problems. 
                    </DialogContentText>
                    
                    <Grid container>
                        <Controls.Input
                            name="typeagain"
                            value={values.typeagain}
                            label={`Type ${values.business}`}
                            onChange={handleInputChange}
                            error={errors.typeagain}
                            fullWidth
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleSubmit} color="primary">
                    Change
                </Button>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Industry
