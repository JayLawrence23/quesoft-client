import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginBlock: theme.spacing(2),
    },

  },
  alert: {
    borderRadius: 16,
    marginBlock: theme.spacing(2),
  }
  

}));

export default function SimpleAlerts(props) {
  const classes = useStyles();

  const { severity, message, ...other} = props;

  return (
    <div className={classes.root}>
      <Alert severity={severity} className={classes.alert} {...other}>
        { message }
      </Alert> 
    </div>
  );
}