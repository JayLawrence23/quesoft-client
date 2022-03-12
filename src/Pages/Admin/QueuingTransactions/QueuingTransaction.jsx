//React
//Material
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import { Search } from "@material-ui/icons";
import { useEffect, useState, useContext } from 'react';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from "../../../Actions/transaction";
// import { socket } from '../../../Socket';
//Components
import AdminLayout from "../../../Components/AdminLayout";
import Controls from '../../../Components/Controls/Controls';
import PageHeader from "../../../Components/PageHeader";
import useTable from '../../../Components/useTable';
import backup from '../../../Assets/Images/queuing_system.gzip'
import { SocketContext } from '../../../Socket';


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
    { id: 'service', label: 'Service' },
    { id: 'ticketNo', label: 'Ticket Number' },
    { id: 'counterName', label: 'Counter' },
    { id: 'issuedTime', label: 'Issued Time' },
    { id: 'calledTime', label: 'Called Time' },
    { id: 'status', label: 'Status' },
]


const QueuingTransaction = () => {
    const {socket} = useContext(SocketContext)
    const classes = useStyles();
    const dispatch = useDispatch();
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

    const { waiting } = useSelector((state) => state.ticket);

    useEffect(() => {
        dispatch(getTransactions());
    }, [dispatch]);

    useEffect(() => {
      if(!socket) return
      socket.on('complete', message => {
          dispatch(getTransactions());
        })
    }, [socket])

    const downloadFile = () => {
        window.location.href = "D:/Jay-J/Documents/queuing-system/server/public/queuing_system.gzip"
    }

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
        <AdminLayout>
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

              
                <Controls.Button
                    text="Download Database Backup"
                    href={backup}
                    variant="outlined"
                    startIcon={<BackupOutlinedIcon/>}
                    className={classes.newButton}
                />

            </Toolbar>

            <Paper className={classes.pageContent}>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                    {
                        recordsAfterPagingAndSorting().map(item => (
                            <TableRow key={item._id}>
                                <TableCell>{item.service}</TableCell>
                                <TableCell>{item.ticketNo}</TableCell>
                                <TableCell>{item.counterName ? item.counterName : 'Pending' }</TableCell>
                                <TableCell>{new Date(item.issuedTime).toLocaleTimeString()}</TableCell>
                                <TableCell>{item.calledTime ? new Date(item.calledTime).toLocaleTimeString() : 'Pending' }</TableCell>
                                <TableCell>{item.missed ? "Complete w/ Missed" : item.status}</TableCell>
                          
                            </TableRow>
                        ))
                    }
                    </TableBody> 
                </TblContainer>
                <TblPagination />
            </Paper>
        </AdminLayout>
    )
}

export default QueuingTransaction
