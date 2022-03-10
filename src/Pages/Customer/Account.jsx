import Layout from "../../Components/Layout";
import PageHeader from "../../Components/PageHeader";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import UnderConstruction from "../../Components/UnderConstruction";


const Account = () => {
    return (
        <Layout>
            <PageHeader 
                title="My Account"
                icon={<AccountCircleOutlinedIcon fontSize="large"/>}
            />
            <UnderConstruction />
        </Layout>
    );
}

export default Account;