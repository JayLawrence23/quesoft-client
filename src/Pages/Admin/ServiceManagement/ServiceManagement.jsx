//react
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
//Material
import { Button, ButtonGroup, Typography, InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar, Snackbar } from '@material-ui/core';
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
// Components
import AdminLayout from "../../../Components/AdminLayout";
import PageHeader from "../../../Components/PageHeader";
import ServiceForm from "./ServiceForm";
import Controls from '../../../Components/Controls/Controls';
import Popup from "../../../Components/Popup";
import AlertMessage from '../../../Components/AlertMessage';
import useTable from '../../../Components/useTable';
import { getServices } from "../../../Actions/services";

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
    { id: 'servName', label: 'Service' },
    { id: 'prefix', label: 'Prefix' },
    { id: 'desc', label: 'Description' },
    { id: 'aveServTime', label: 'Ave Service Time' },
    { id: 'action', label: 'Action' },
]


const ServiceManagement = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [curId, setCurId] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const { services } = useSelector((state) => state.services);

    useEffect(() => {
        dispatch(getServices());
    }, [dispatch]);

 
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(services, headCells, filterFn);

    const handleEdit = (id) => {
        setOpenPopup(true);
        setIsEdit(true);
        setCurId(id);
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
                    return items.filter(x => x.servName.toLowerCase().includes(target.value))
            }
        })
    }

    return ( 
        <AdminLayout>
            <PageHeader 
                title="Service Management"
                subTitle="All services should be listed here"
                icon={<ForumOutlinedIcon fontSize="large"/>}
            />
            <Toolbar>
                <Controls.Input
                    label="Search Service"
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
                                <TableCell>{item.servName}</TableCell>
                                <TableCell>{item.prefix}</TableCell>
                                <TableCell>{item.desc}</TableCell>
                                <TableCell>{item.aveServTime} mins</TableCell>
                                <TableCell>
                                <ButtonGroup variant="contained" aria-label="contained primary button group">
                                            <Button onClick={() => handleEdit(item._id)} color="secondary">Edit</Button>
                                            {/* <Button onClick={() => handleActivate()} color="primary">
                                                {item.status === false ? "Activate" : "Set Inactive" }
                                            </Button>
                                            <Button onClick={() => handleDelete(item._id)}>Delete</Button> */}
                                            <Button >Delete</Button> 
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
                 <ServiceForm edit={isEdit} id={curId} />
            </Popup>
            {/* <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleClose}>
                { setIsError ? ( <AlertMessage onClose={handleClose} severity="error" message="Account activation failed." />) : ( isSuccess ?
                <AlertMessage onClose={handleClose} severity="success" message="Account activation success."/> : null)}
            </Snackbar> */}

            {/* <Paper elevation={1} className={classes.paper}>
                <Typography variant="h5" className={classes.addtext}>Add Service</Typography>
                <ServiceForm />
            </Paper> */}
        </AdminLayout>
     );
}
 
export default ServiceManagement;