//Material
import { makeStyles, Paper, Typography } from '@material-ui/core';
//React
import logo from '../Assets/Images/logo-que.png';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
        backgroundColor: "#FFF",
        backgroundSize: 'cover',
        height: '100vh',
        width: '100%',
        overflow: 'scroll',
    },
    title: {
        marginBlock: 25,
        fontWeight: '600',
        fontSize: 30,
    },
    subtitle: {
        marginBlock: 10,
    },
    paperStyle: {
        padding: 40,
        paddingBottom: 80,
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        width: '88%',
        margin: '30px auto',
    },
}));

const DataPrivacy = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={2} className={classes.paperStyle}>
                <img src={logo} alt="Advertisement" height="90px" width='75' />
                <Typography className={classes.title}>
                    Privacy Policy for Quesoft
                </Typography>
              
                <Typography variant="subtitle2" className={classes.subtitle}>
                    At Quesoft, accessible from https://quesoft.vercel.app, 
                    one of our main priorities is the privacy of our visitors. 
                    This Privacy Policy document contains types of information
                    that is collected and recorded by Quesoft and how we use it.
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    This Privacy Policy applies only to our online activities and is valid for visitors 
                    to our website with regards to the information that they shared and/or collect in Quesoft. 
                    This policy is not applicable to any information collected offline or via channels other than this website. 
                    Our Privacy Policy was created with the help of the Free Privacy Policy Generator.
                </Typography>

                <Typography variant="h6">
                    Consent
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                </Typography>
                
                <Typography variant="h6">
                    Information we collect
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    The personal information that you are asked to provide, 
                    and the reasons why you are asked to provide it, will be made 
                    clear to you at the point we ask you to provide your personal information.
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    If you contact us directly, we may receive additional information about you such as your name, 
                    email address, phone number, the contents of the message and/or 
                    attachments you may send us, and any other information you may choose to provide.
                </Typography>


                <Typography variant="subtitle2" className={classes.subtitle}>
                    When you register for an notification, we may ask for your contact information, 
                    including items such as email address, or telephone number.
                </Typography>

                <Typography variant="h6">
                    How we use your information
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    We use the information we collect in various ways, including to:
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    • Provide, operate, and maintain our website
                    <br/>
                    • Develop new products, services, features, and functionality
                    <br/>
                    • Improve, personalize, and expand our website
                    <br/>
                    • Communicate with you, either directly or through one of our partners, including for customer service, 
                    to provide you with updates and other information relating to the website, and for marketing and promotional purposes
                    <br/>
                    • Send you a notification using your email or SMS.
                </Typography>
   
                <Typography variant="h6">
                    Log Files
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    Quesoft follows a standard procedure of using log files. 
                    These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics.
                    The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, 
                    referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. 
                    The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
                </Typography>

                <Typography variant="h6">
                    Advertising Partners Privacy Policies
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    You may consult this list to find the Privacy Policy for each of the advertising partners of Quesoft.
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or 
                    Web Beacons that are used in their respective advertisements and links that appear on Quesoft, 
                    which are sent directly to users' browser. They automatically receive your IP address when this occurs. 
                    These technologies are used to measure the effectiveness of their advertising campaigns 
                    and/or to personalize the advertising content that you see on websites that you visit.
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    Note that Quesoft has no access to or control over these cookies that are used by third-party advertisers.
                </Typography>

                <Typography variant="h6">
                    Third Party Privacy Policies
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    Quesoft's Privacy Policy does not apply to other advertisers or websites. 
                    Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. 
                    It may include their practices and instructions about how to opt-out of certain options.
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    You can choose to disable cookies through your individual browser options. 
                    To know more detailed information about cookie management with specific web browsers, 
                    it can be found at the browsers' respective websites.
                </Typography>

                <Typography variant="h6">
                    CCPA Privacy Rights (Do Not Sell My Personal Information)
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    Under the CCPA, among other rights, California consumers have the right to:
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    Request that a business delete any personal data about the consumer that a business has collected.
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    Request that a business that sells a consumer's personal data, not sell the consumer's personal data.
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
                </Typography>

                <Typography variant="h6">
                    GDPR Data Protection Rights
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    The right to rectification – You have the right to request that we correct any information you 
                    believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    The right to erasure – You have the right to request that we erase your personal data, under certain conditions.
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    The right to data portability – You have the right to request that we transfer 
                    the data that we have collected to another organization, or directly to you, under certain conditions
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
                </Typography>

                <Typography variant="h6">
                    Children's Information
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    Another part of our priority is adding protection for children while using the internet. 
                    We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                </Typography>

                <Typography variant="subtitle2" className={classes.subtitle}>
                    Quesoft does not knowingly collect any Personal Identifiable Information from children 
                    under the age of 13. If you think that your child provided this kind of information on our website, 
                    we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
                </Typography>


            </Paper>
           
        </div>  
    )
}

export default DataPrivacy;
