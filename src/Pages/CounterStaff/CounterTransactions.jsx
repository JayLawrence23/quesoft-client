//React
//Material
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import { Search } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import { getTransactionsByCounter } from '../../Actions/transaction';
import { socket } from '../../Socket';
//Components
import CounterStaffLayout from "../../Components/CounterStaffLayout";
import Controls from '../../Components/Controls/Controls';
import PageHeader from "../../Components/PageHeader";
import useTable from '../../Components/useTable';


const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        borderRadius: 16,
    },
    searchInput: {
        width: '60%',
        borderRadius: 16
    },
    newButton: {
        position: 'absolute',
        right: 10
    },
    table: {
        minWidth: 700,
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBlock: theme.spacing(3),
        width: 400,
        marginInline: 'auto',
        padding: theme.spacing(4)
    },
    addtext: {
        padding: theme.spacing(1),
        fontWeight: 600,
        marginBlock: theme.spacing(1),
    }
}));

const headCells = [
    { id: 'ticketNo', label: 'Ticket Number' },
    { id: 'counterName', label: 'Counter' },
    { id: 'issuedTime', label: 'Issued Time' },
    { id: 'calledTime', label: 'Called Time' },
    { id: 'status', label: 'Status' },
]


const CounterTransactions = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

    const { waiting } = useSelector((state) => state.ticket);
    //here
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('counterstaff')));

    const values = {
        counterNo: user.updatedCounterStaff ? user.updatedCounterStaff.curCounter :  user.curCounter,
        currentService: user.updatedCounterStaff ? user.updatedCounterStaff.curService : user.curService
    }

    //Start here
    useEffect(() => {
        dispatch(getTransactionsByCounter(values));
        // eslint-disable-next-line
    }, [dispatch]);

    //socket IO

    // socket.once('complete', message => {
    //     dispatch(getTransactions());
    // })

    // socket.off('complete', message => {
    //     dispatch(getTransactions());
    // })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(waiting, headCells, filterFn);


    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.ticketNo.toLowerCase().includes(target.value))
            }
        })
    }

    return (
        <CounterStaffLayout>
             <PageHeader 
                title="Transaction Queues"
                subTitle="All queues should be listed here"
                icon={<ReceiptOutlinedIcon fontSize="large"/>}
            />

            <Toolbar>
                <Controls.Input
                    label="Search Ticket"
                    className={classes.searchInput}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <Search />
                        </InputAdornment>)
                    }}
                    onChange={handleSearch}
                />

            </Toolbar>

            <Paper className={classes.pageContent}>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                    {
                        recordsAfterPagingAndSorting().map(item => 
                            item.service === values.currentService && (
                            <TableRow key={item._id}>
                                <TableCell>{item.ticketNo}</TableCell>
                                <TableCell>{item.counterName ? item.counterName : 'Pending' }</TableCell>
                                <TableCell>{new Date(item.issuedTime).toLocaleTimeString()}</TableCell>
                                <TableCell>{item.calledTime ? new Date(item.calledTime).toLocaleTimeString() : 'Pending' }</TableCell>
                                <TableCell>{item.status}</TableCell>
                          
                            </TableRow>
                            ) 
                        )
                    }
                    </TableBody> 
                </TblContainer>
                <TblPagination />
            </Paper>
        </CounterStaffLayout>
    )
}

export default CounterTransactions
