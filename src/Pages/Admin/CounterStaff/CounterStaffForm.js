//Material UI
import { Grid, makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { signup, getSingleCounterStaff, updateCounterStaff } from '../../../Actions/counterStaff';
import AlertMessage from '../../../Components/AlertMessage';
import Controls from '../../../Components/Controls/Controls';
//Components
import { Form, useForm } from '../../../Components/useForm';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: theme.spacing(1),
        }
    }
}));

const initialFValues = {
    fname: '',
    lname: '',
    email: '',
}

const CounterStaffForm = ( { id, edit }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isEditCounterStaff, setIsEditCounterStaff] = useState(edit);
    const { values, setValues, errors, setErrors, resetForm, handleInputChange } = useForm(initialFValues);
    const { singleCounterStaff } = useSelector((state) => state.counterStaffAuth);

    useEffect(() => {
        if(id){
            dispatch(getSingleCounterStaff(id));
        } 
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(singleCounterStaff){
            setValues({...singleCounterStaff})
        } 
        //eslint-disable-next-line
    }, [singleCounterStaff])

    useEffect(() => {
        if(edit === false ){
            resetForm();
        } 
        //eslint-disable-next-line
    }, [edit])


    const validate = () => {
        let temp = {}
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
        if(isEditCounterStaff) {
            if(validate()){
                dispatch(updateCounterStaff(singleCounterStaff._id, values, setIsError, setIsSuccess));
                resetForm();
            }
        } else {
            if(validate()){
                dispatch(signup(values, setIsError, setIsSuccess));
                resetForm();
            }
        }
    }

    return ( 
        <Form className={classes.root}>
            { isError ? (
                <AlertMessage severity="error" message="Creating Account Failed."/>) : ( isSuccess ?
                <AlertMessage severity="success" message="Counter Staff Account Successfully Created."/> : null)}
            <Grid container spacing={1} justifyContent="center" alignItems="center">
                <Controls.Input
                    name="fname"
                    // value={ isEditCounterStaff ? (editedValues.fname || "") : values.fname}
                    value={values.fname || ""}
                    label="First Name"
                    onChange={ handleInputChange}
                    error={errors.fname}
                    half
                />

                <Controls.Input
                    name="lname"
                    // value={ isEditCounterStaff ? (editedValues.lname || "") : values.lname}
                    value={ values.lname || ""}
                    label="Last Name"
                    onChange={ handleInputChange}
                    error={errors.lname}
                    half
                />

                <Controls.Input
                    name="email"
                    // value={ isEditCounterStaff ?  (editedValues.email || "") : values.email}
                    value={ values.email || ""}
                    label="Email"
                    onChange={handleInputChange}
                    error={errors.email}
                />
                
                <Controls.Button
                    text={ isEditCounterStaff ? 'Edit Account' : 'Create Account' } 
                    type="submit"
                    className={classes.btn}
                    onClick={handleSubmit}
                />
                { isEditCounterStaff ? null : 
                <Controls.Button
                    text="Reset"
                    color="default"
                    className={classes.btn}
                    onClick={resetForm}
                />
                }
            </Grid>
               

        </Form>
        
    );
}
 
export default CounterStaffForm;