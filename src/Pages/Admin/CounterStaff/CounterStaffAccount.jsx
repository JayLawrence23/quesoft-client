import { Button, ButtonGroup, InputAdornment, makeStyles, Paper, Snackbar, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
//react
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteCounterStaff, getCounterStaff } from '../../../Actions/counterStaff';
//Components
import AdminLayout from "../../../Components/AdminLayout";
import AlertMessage from '../../../Components/AlertMessage';
import Controls from '../../../Components/Controls/Controls';
import PageHeader from "../../../Components/PageHeader";
import Popup from "../../../Components/Popup";
import useTable from '../../../Components/useTable';
import CounterStaffForm from "./CounterStaffForm";


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
    inactive: {
        background: theme.palette.secondary[800],
        color: 'white',
        borderRadius: 16,
        padding: theme.spacing(1)
    },
    active: {
        background: '#00B526',
        padding: theme.spacing(1),
        color: 'white',
        borderRadius: 16
    }
}));

const headCells = [
    { id: 'fname', label: 'First Name' },
    { id: 'lname', label: 'Last Name' },
    { id: 'username', label: 'Username' },
    { id: 'email', label: 'Email' },
    { id: 'status', label: 'Status' },
    { id: 'action', label: 'Action' },
]

const CounterStaffAccount = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [curId, setCurId] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const { counterStaffs, loading } = useSelector((state) => state.counterStaffAuth);

    useEffect(() => {
        dispatch(getCounterStaff());
    }, [dispatch]);

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(counterStaffs, headCells, filterFn);

    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete the counter staff?")){
            dispatch(deleteCounterStaff(id));
            
        }
    }

    const handleEdit = (id) => {
        setOpenPopup(true);
        setIsEdit(true);
        setCurId(id);
    }

    // For activation an account
    const handleActivate = () => {
        setOpenSnackbar(true);
        // dispatch(activateCounterStaff(curId, setIsError, setIsSuccess));
    };
      
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
                    return items.filter(x => x.fname.toLowerCase().includes(target.value))
            }
        })
    }
    
    if(!counterStaffs) return null;

    return (
        <AdminLayout>
            <PageHeader 
                title="Counter Staff Accounts"
                subTitle="All accounts of counter staffs"
                icon={<PeopleAltOutlinedIcon fontSize="large"/>}
            />
            <Toolbar>
                <Controls.Input
                    label="Search Staff"
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
            { loading ?  null
            : 
            <Paper className={classes.pageContent}>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                    {
                        recordsAfterPagingAndSorting().map(item => (
                            <TableRow key={item._id}>
                                <TableCell>{item.fname}</TableCell>
                                <TableCell>{item.lname}</TableCell>
                                <TableCell>{item.username}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>
                                    <span className={item.status === false ? classes.inactive : classes.active}> 
                                        {item.status === false ? "Inactive" : "Active" }
                                    </span>
                                </TableCell>
                                <TableCell>
                                <ButtonGroup variant="contained" aria-label="contained primary button group">
                                            <Button onClick={() => handleEdit(item._id)} color="secondary">Edit</Button>
                                            {/* <Button onClick={() => handleActivate()} color="primary">
                                                {item.status === false ? "Activate" : "Set Inactive" }
                                            </Button> */}
                                            <Button onClick={() => handleDelete(item._id)}>Delete</Button>
                                        </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                    </TableBody> 
                </TblContainer>
                <TblPagination />
            </Paper>}
            <Popup
                openPopup = {openPopup}
                setOpenPopup = {setOpenPopup}
                title={ isEdit ? "Edit Counter Staff Account" : "Add New Counter Staff" }
            >
                <CounterStaffForm edit={isEdit} id={curId}/>
            </Popup>
            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleClose}>
                { setIsError ? ( <AlertMessage onClose={handleClose} severity="error" message="Account activation failed." />) : ( isSuccess ?
                <AlertMessage onClose={handleClose} severity="success" message="Account activation success."/> : null)}
            </Snackbar>
        </AdminLayout>
     );
}
 
export default CounterStaffAccount;