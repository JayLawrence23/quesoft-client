import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
//Component
import Controls from './Controls/Controls';


const useStyles = makeStyles((theme) => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
        width: 480,
        borderRadius: 16,
        [theme.breakpoints.down('sm')]: {
            width: 380,
        },
    },
    dialogTitle: {
        paddingRight: 0
    }
}));

const Popup = (props) => {

    const classes = useStyles();

    const {title, children, openPopup, setOpenPopup } = props;

    return ( 
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper}}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h6" component="div">{title}</Typography>
                    <Controls.ActionButton
                        color="secondary"
                        onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
     );
}
 
export default Popup;