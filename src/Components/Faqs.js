import { Typography, AccordionDetails, AccordionSummary, Accordion, Chip, } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import useStyles from '../Pages/Customer/styles/virtualmonitoring';

const Faqs = () => {

    const classes = useStyles();

    return ( 
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}>
                        How does virtual monitoring work?
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Go to the bank and get in line - The customer will use their phone to scan the generated ticket with a 
                        QR code or manually enter the code into our progressive web application.
                        <br/> <br/>
                        After selecting a service and receiving a virtual ticket, the customer can wait remotely (for example, in their car or at fastfood chain) 
                        and track their position in line on their phone. They will be able to see real-time updates,
                        their position in line, and the estimated time until their turn. 
                        <br/> <br/>
                        When there is progress in the line, the customer will be notified via SMS or email.
                        <br/> <br/>
                        When it is their turn, a staff member calls them using the queuing management system, and an SMS or email notification is sent to them.
                        <br/> <br/>
                        The service is provided and received from a safe distance.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}>
                        Can a customer complete all transactions even if their ticket is only for one service?
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Generally, customers are only allowed to use the specified ticket for a particular service. 
                        It is important that they choose their start point and service correctly before selecting a ticket. 
                        However, a customer can still get a new ticket for another service and be entertained, 
                        ensuring a smooth and successful transaction.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}>
                        What if a customer misses their turn in line?
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Customers who missed their queues can be called by the counter staff at 
                        any time within an hour by entering their ticket number, and if they do not show up, 
                        their tickets will be automatically cancelled after an hour.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}>
                        How will you handle priorities (senior citizens, persons with disabilities (PWDs), and pregnant women)?
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                    Priorities have a separate counter both in the system and on a physical counter. 
                    They will be served whatever type of service they desire in one go for a hassle-free transaction.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
     );
}
 
export default Faqs;