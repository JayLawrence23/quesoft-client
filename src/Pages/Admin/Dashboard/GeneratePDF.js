import React from 'react'
import { Button, ButtonGroup, Typography, Box, makeStyles} from '@material-ui/core';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import axios from 'axios';
import { saveAs } from 'file-saver';

// const baseURL = 'http://localhost:5000';
// const baseURL = 'https://quesoft.herokuapp.com';
const baseURL = 'https://quesoft.onrender.com';

const API = axios.create({ baseURL});

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    btn: {
        boxShadow: 'none',
        borderRadius: 12,
        marginTop: 10
    }
}));

const GeneratePDF = () => {

    const classes = useStyles();
    const initialFValues = {
        aveServiceTime: '',
        numcustomer: '',
        largestVol: '',
        mostService: '',
        virtualRate: '',
        missedQueues: '',
        leaveQueues: '',
    }

    // const initialFValues = {
    //     name: 'Jay',
    //     receiptId: 24,
    //     price1: 4233,
    //     price2: 2424
    // }
    const handleDownload = () => {
        API.post('/create-pdf', initialFValues)
        .then(() => API.get('fetch-pdf', { responseType: 'blob'}))
        .then((res) => {
            const pdfBlob = new Blob([res.data], { type : 'application/pdf' })
            
            saveAs(pdfBlob, 'reports.pdf');
        })
    }

    return (
        <div>
            <Typography fontSize={20}>
                Generate PDF Report
            </Typography>
            <Button 
                variant='contained'
                className={classes.btn}
                color="primary"
                onClick={handleDownload}
            >
                 Download
                <ArrowDownwardOutlinedIcon style={{ marginLeft: 5, fontSize: 19 }}/>
            </Button>
            
        </div>
  )
}

export default GeneratePDF