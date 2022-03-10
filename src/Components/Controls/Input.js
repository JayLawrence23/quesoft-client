import React from 'react'
import { makeStyles, TextField, Grid, InputAdornment, IconButton } from '@material-ui/core'

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({

    field: {
        marginBlock: 5,
        ['& fieldset']:{
            borderRadius: 16,
        },
    },
}));
    
export default function Input(props) {

   
    const classes = useStyles();
    const {name, label, value, onChange, half, type, handleShowPassword, autoFocus, error=null, ...other} = props;

    return (
        <Grid item xs={12} sm={half ? 6 : 12 }>
            <TextField
                // onChange={(e) => setEmail(e.target.value)}
                onChange={onChange}
                className={classes.field}
                label={label}
                variant="outlined"
                color="primary"
                name={name}
                autoFocus={autoFocus}
                value={value}
                type={type}
                helperText={error}
                error={error === null ? false : (error !== "" && true)}
                {...other}
                required
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}> 
                                {type === 'password' ? <VisibilityOffIcon /> : <VisibilityIcon /> }
                            </IconButton>
                        </InputAdornment>
                    )
                } : null }
                
            />
        </Grid>
    )
}
