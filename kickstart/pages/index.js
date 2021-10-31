import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';
/*
class CampaignIndex extends Component {
    //NextJS doesnt execute react method componentDidMount() on the server like we require.
    //thats why we change to getInitialProps() a speciffically NextJS method below
    async componentDidMount() {
        const campaigns = await factory.methods.getDeployedCampaigns().call()
        console.log(campaigns);
    }
    render() {
        return <div>Some Shyt!!!!</div>
    }
}
*/
class CampaignIndex extends Component {
    //Static- func not assigned to instances of class, no need to create index
    //Its called before component gets rendered
    //this method is very speciffic to ONLY NextJS
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return {campaigns};
    }
    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View Campaign</a>        
                    </Link>
                ),
                fluid: true
            };
        });
        return <Card.Group items={items} />
    }

    render() {
        return ( 
        <Layout>   
            <div>
                <h3>Open Campaigns</h3>
                <Link route="/campaigns/new">
                    <a>
                        <Button 
                            floated="right"
                            content="Create Campaign"
                            icon="add circle"
                            primary
                        />
                    </a>
                </Link>
                {this.renderCampaigns()}
            </div>
        </Layout>
        );
    }
}

export default CampaignIndex;