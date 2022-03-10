import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
//Components
import { useForm, Form } from '../../../Components/useForm';
import Controls from '../../../Components/Controls/Controls';
import AlertMessage from '../../../Components/AlertMessage'
//Material UI
import { makeStyles, Grid, FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core'
// Actions
import { createCounter, getCounter, updateCounter } from '../../../Actions/counters'
import { getServices } from "../../../Actions/services";


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1),
        }
    },
    formControl: {
        '& .MuiInputBase-root': {
            borderRadius: 16,
        }
    }
}));

const initialFValues = {
    cName: '',
    service: '',
}

const CounterForm = ( { id, edit }) => {

    const classes = useStyles();
  
    // const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isEditCounter, setIsEditCounter] = useState(edit);
    const { values, setValues, errors, setErrors, resetForm, handleInputChange } = useForm(initialFValues);
    const { counter } = useSelector((state) => state.counter);
    const { services } = useSelector((state) => state.services);

    useEffect(() => {
        if(id){
            dispatch(getCounter(id));
        } 
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        dispatch(getServices());
        //eslint-disable-next-line
    },[dispatch]);

    useEffect(() => {
        if(counter){
            setValues({...counter})
        } 
        //eslint-disable-next-line
    }, [counter])

    useEffect(() => {
        if(edit === false ){
            resetForm();
        } 
        //eslint-disable-next-line
    }, [edit])

    const validate = () => {
        let temp = {}
        temp.cName = values.cName ? "" : "This field is required."
        temp.service = values.service ? "" : "This field is required."
       
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "");
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //To not refresh the form after clickng submit
        if(isEditCounter) {
            if(validate()) {
                dispatch(updateCounter(counter._id, values, setIsSuccess, setIsError));
                resetForm();
            }
        } else {
            if(validate()) {
                dispatch(createCounter(values, setIsSuccess));
                resetForm();
            }
        }
    }

    return (
        <Form className={classes.root}>
             { isEditCounter ? ( isError ? (
                <AlertMessage severity="error" message="Editing counter failed."/>) : ( isSuccess ?
                <AlertMessage severity="success" message="Counter is successfully updated."/> : null)) : 
                ( isError ? (
                    <AlertMessage severity="error" message="Creating counter failed."/>) : ( isSuccess ?
                    <AlertMessage severity="success" message="Counter is successfully added."/> : null))}
            <Grid container>
                <Controls.Input
                    name="cName"
                    value={values.cName || ""}
                    label="Counter Name"
                    onChange={handleInputChange}
                    error={errors.cName}
                />

                 <Grid item xs={12}>
                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <InputLabel htmlFor="outlined-age-native-simple" style={{ background: 'white', paddingInline: 5}}>Service</InputLabel>
                        <MuiSelect
                            name="service"
                            value={values.service || ""}
                            onChange={handleInputChange}
                            error={errors.service && errors.service.length > 0}
                            >
                                <MenuItem value="">None</MenuItem>
                                {
                                    services.map(
                                        item => (<MenuItem key={item._id} value={isEditCounter ? item.servName : item._id } > {item.servName} </MenuItem>)
                                    )
                                }
                            </MuiSelect>
                    </FormControl>
                </Grid>


                <Controls.Button
                    text={ isEditCounter ? 'Edit Counter' : 'Add Counter'}
                    type="submit"
                    className={classes.btn}
                    onClick={handleSubmit}
                />
                { isEditCounter ? null :
                <Controls.Button
                    text="Reset"
                    color="default"
                    className={classes.btn}
                    onClick={resetForm}
                />
                }
            </Grid>
        </Form>
    )
}

export default CounterForm
