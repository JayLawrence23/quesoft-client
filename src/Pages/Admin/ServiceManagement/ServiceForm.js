import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
//Components
import { useForm, Form } from '../../../Components/useForm';
import Controls from '../../../Components/Controls/Controls';
import AlertMessage from '../../../Components/AlertMessage'
//Material UI
import { makeStyles, Grid } from '@material-ui/core'
// Actions
import { createService, getService, updateService } from '../../../Actions/services'


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1),
        }
    }
}));

const initialFValues = {
    servName: '',
    prefix: '',
    desc: '',
    aveServTime: '',
    tags: '',
}

const ServiceForm = ( { id, edit }) => {

    const classes = useStyles();
  
    // const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isEditService, setIsEditService] = useState(edit);
    const { values, setValues, errors, setErrors, resetForm, handleInputChange } = useForm(initialFValues);
    const { service } = useSelector((state) => state.services);

    useEffect(() => {
        if(id){
            dispatch(getService(id));
        } 
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(service){
            setValues({...service})
        } 
        //eslint-disable-next-line
    }, [service])

    useEffect(() => {
        if(edit === false ){
            resetForm();
        }
        //eslint-disable-next-line 
    }, [edit])

    const validate = () => {
        let temp = {}
        temp.servName = values.servName ? "" : "This field is required."
        temp.prefix = values.prefix ? "" : "This field is required."
        temp.aveServTime = values.aveServTime ? "" : "This field is required."
        temp.tags = values.tags ? "" : "This field is required."
       
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "");
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //To not refresh the form after clickng submit
        if(isEditService) {
            if(validate()) {
                dispatch(updateService(service._id, values, setIsSuccess, setIsError));
                resetForm();
            }
        } else {
            if(validate()) {
                dispatch(createService(values, setIsSuccess));
                resetForm();
            }
        }
    }

    return (
        <Form className={classes.root}>
             { isEditService ? ( isError ? (
                <AlertMessage severity="error" message="Editing service failed."/>) : ( isSuccess ?
                <AlertMessage severity="success" message="Service is successfully updated."/> : null)) : 
                ( isError ? (
                    <AlertMessage severity="error" message="Creating service failed."/>) : ( isSuccess ?
                    <AlertMessage severity="success" message="Service is successfully added."/> : null))}
            <Grid container>
                <Controls.Input
                    name="servName"
                    value={values.servName || ""}
                    label="Service Name"
                    onChange={handleInputChange}
                    error={errors.servName}
                />

                <Controls.Input
                    name="prefix"
                    value={values.prefix && values.prefix.toUpperCase() || ""}
                    label="Prefix (eg. CS)"
                    onChange={handleInputChange}
                    error={errors.prefix}
                />

                <Controls.Input
                    name="desc"
                    value={values.desc || ""}
                    label="Description"
                    onChange={handleInputChange}
                    error={errors.desc}
                    multiline={true}
                    rows="3"
                />

                <Controls.Input
                    name="aveServTime"
                    type="number"
                    value={values.aveServTime || ""}
                    label="Average Service Time in Minutes (eg. 5)"
                    onChange={handleInputChange}
                    error={errors.aveServTime}
                />

                <Controls.Input
                    name="tags"
                    value={values.tags || ""}
                    label="Services covered: (eg. Payment Inquiry)"
                    onChange={(e) => setValues({ ...values, tags: e.target.value.split(',')})}
                    error={errors.tags}
                />

                <Controls.Button
                    text={ isEditService ? 'Edit Service' : 'Add Service'}
                    type="submit"
                    className={classes.btn}
                    onClick={handleSubmit}
                />
                { isEditService ? null :
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

export default ServiceForm
