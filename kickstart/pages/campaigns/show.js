import React, {Component} from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';

class CampaignShow extends Component {
    //Gets called automatically before component is rendered
    static async getInitialProps(props) {
        //Get the address of the deployed campaign from props.query property
        //address is the name of the prop passed down from our route.js file    
        const campaign = Campaign(props.query.address);
        //console.log(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        //console.log(summary);---It retruns an object(not an array although it seems like one)
        //return well labled props
        return {
            address: props.query.address,     //This is needed to be passed to contributeForm
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            manager:summary[4]
        };
    }

    renderCards() {
        const {
            minimumContribution,
            balance,
            manager,
            requestCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'Manager Created this campaign and can create request to withdraw mullah',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (Wei)',
                description: 'You must contribute a certain amount in wei to become an approver.'
            },
            {
                header: requestCount,
                meta: 'Number of Requests',
                description: 'A Request tries to withdraw money from the contract. They must be approved by the Approvers.'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of People who\'ve already contributed.'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (Ether)',
                description: 'The balance is the total amount of money this campaign has.'
            }
        ];

        return <Card.Group items={items} />
    }
    render() {
        return (
            <Layout>
                <h3>Campain Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;