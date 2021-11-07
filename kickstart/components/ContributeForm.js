import React, { Component } from "react";
import {Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from "../ethereum/web3";
import {Router} from '../routes';

class ContributeForm extends Component {
    state = {
        value: '', 
        erroMessage: '',
        loading: false
    }
    onSubmit = async event => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);
        this.setState({loading: true, errorMessage: ''});
        try {
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
            //Do a page refresh to update approvers and campaign balance
            // `` ES 2015 template string
            Router.replaceRoute(`/campaigns/${this.props.address}`)
        } catch (err) {
            this.setState({ errorMessage: err.message});
            console.log(err);
        }
        this.setState({loading: false, value: ''});
    }
    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input 
                        value={this.state.value}
                        onChange={event => this.setState({value:event.target.value})}
                        label="ether"
                        labelPosition="right"
                    />
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>Contribute!</Button>
                </Form.Field>        
            </Form>
                        
        );
    }
}

export default ContributeForm;