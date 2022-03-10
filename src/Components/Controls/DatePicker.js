import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const DatePicker = (props) => {

    const { name, label, value, onChange, ...other } = props


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                label={label}
                format="MM/dd/yyyy"
                name={name}
                value={value}
                onChange={date =>onChange(convertToDefEventPara(name,date))}
                {...other}

            />
        </MuiPickersUtilsProvider>
    )
}
export default DatePicker;