//React
//Material
import { Button, ButtonGroup, InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import EventSeatOutlinedIcon from '@material-ui/icons/EventSeatOutlined';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCounters, deleteCounter } from "../../../Actions/counters";
//Components
import AdminLayout from "../../../Components/AdminLayout";
import Controls from '../../../Components/Controls/Controls';
import PageHeader from "../../../Components/PageHeader";
import Popup from "../../../Components/Popup";
import useTable from '../../../Components/useTable';
import CounterForm from "./CounterForm";


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
    { id: 'cName', label: 'Counter Name' },
    { id: 'service', label: 'Service' },
    { id: 'curStaffName', label: 'Current Staff' },
    { id: 'currentTicNo', label: 'Current Ticket No.' },
    { id: 'status', label: 'Status' },
    { id: 'action', label: 'Action' },
]


const Counters = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    // const [isError, setIsError] = useState(false);
    // const [isSuccess, setIsSuccess] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [curId, setCurId] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const { counters } = useSelector((state) => state.counter);

    useEffect(() => {
        dispatch(getCounters());
    }, [dispatch]);

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(counters, headCells, filterFn);

    const handleEdit = (id) => {
        setOpenPopup(true);
        setIsEdit(true);
        setCurId(id);
    }

    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete the counter?")){
            dispatch(deleteCounter(id));
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackbar(false);
    };

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.cName.toLowerCase().includes(target.value))
            }
        })
    }

    return (
        <AdminLayout>
             <PageHeader 
                title="Counter Management"
                subTitle="All counters should be listed here"
                icon={<EventSeatOutlinedIcon fontSize="large"/>}
                
            />

            <Toolbar>
                <Controls.Input
                    label="Search Counter"
                    className={classes.searchInput}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <Search />
                        </InputAdornment>)
                    }}
                    onChange={handleSearch}
                />

                <Controls.Button
                    text="Add New"
                    variant="outlined"
                    startIcon={<AddIcon/>}
                    className={classes.newButton}
                    onClick={() => {
                        setOpenPopup(true) 
                        setIsEdit(false)
                        setCurId(null)
                    }}
                />
            </Toolbar>

            <Paper className={classes.pageContent}>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                    {
                        recordsAfterPagingAndSorting().map(item => (
                            <TableRow key={item._id}>
                                <TableCell>{item.cName}</TableCell>
                                <TableCell>{item.service}</TableCell>
                                <TableCell>{item.curStaffName ? item.curStaffName : 'None' }</TableCell>
                                <TableCell>{item.currentTicNo ? item.currentTicNo : 'None' }</TableCell>
                                <TableCell>{item.status ? 'On Serve' : 'Available'}</TableCell>
                                <TableCell>
                                <ButtonGroup variant="contained" aria-label="contained primary button group">
                                            <Button onClick={() => handleEdit(item._id)} color="secondary">Edit</Button>
                                            {/* <Button onClick={() => handleActivate()} color="primary">
                                                {item.status === false ? "Activate" : "Set Inactive" }
                                            </Button>*/}
                                            <Button onClick={() => handleDelete(item._id)}>Delete</Button>
                                        </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                    </TableBody> 
                </TblContainer>
                <TblPagination />
            </Paper>

            <Popup
                openPopup = {openPopup}
                setOpenPopup = {setOpenPopup}
                title={ isEdit ? "Edit Service" : "Add New Service" }
            >
                 <CounterForm edit={isEdit} id={curId} />
            </Popup>
        </AdminLayout>
    )
}

export default Counters
