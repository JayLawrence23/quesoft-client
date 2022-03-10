import { Button, Dialog, Slide, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const DialogBox = ({ title, desc, buttontext, onClick, openDialogBox, setOpenDialog }) => {

    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <Dialog
            open={openDialogBox}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {desc}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClick} color="primary">
                    {buttontext}
                </Button>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogBox
