import React, { Component } from 'react';
import {Header, Container, Segment, Divider, Button, Icon, Modal, Grid, Input, Dropdown} from "semantic-ui-react";
import Item  from '../components/Item';
import {reactLocalStorage} from 'reactjs-localstorage';
import { Web3 } from 'web3'



import './Body.css';

const options = [
    { key: 1, text: 'Canceled', value: 1 },
    { key: 2, text: 'Delayed 1H', value: 2 },
    { key: 3, text: 'Delayed 2H', value: 3 },
    { key: 4, text: 'Delayed 3H', value: 4 },
  ]

const initRules = () => {
    const rules = reactLocalStorage.getObject('rules')
    if(rules === {} || typeof rules.length == "undefined"){
        return [];
    } else {
        return reactLocalStorage.getObject('rules')
    }
}

class Body extends Component {

    state = {rules: initRules(), currentRefundPercent:"", selected:"",value:0, modalOpen: false}

    getRules  = () => {reactLocalStorage.getObject('rules')}
        

    sendRules = () => {
        console.log("send rule")
    }
    
    addRule = () => {
        const rule = {refundPercent:this.state.currentRefundPercent, status:1 }
        var arrayvar = this.state.rules.slice()
        arrayvar.push(rule)
        this.setState({rules:arrayvar})
        reactLocalStorage.setObject('rules', arrayvar);
        this.handleClose()
    }

    handleClose = () => this.setState({ modalOpen: false })

    handleOpen = () => this.setState({ modalOpen: true })

    componentWillMount() {
        console.log("idi");
        this.getBalance();
    }

    getBalance = () => {
        return new Promise (function (resolve, reject) {
          window.web3.eth.getBalance(window.web3.eth.accounts[0], function (error, result) {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          })
        })
      }
    
    
    handleRefundPercent = (event) => {
        this.setState({currentRefundPercent: event.target.value});
    }

    handleSelectStatut = (event) => {
        this.setState({value:1});
    }

    render() {
        const adress = "ihfidhfidf",
        rules = reactLocalStorage.getObject('rules') ;        
        return (
            <div>
                <div className="BodyContainer">
                    <Header as='h1' textAlign="center">Refund rules</Header>
                    <Header as='h3' textAlign="right"> Contract Adress : <a target="_blank" href="https://kovan.etherscan.io/address/0x8502c14592d5adf133d2c7cf492323e05d6dbe90">0x8502c14592d5adf133d2c7cf492323e05d6dbe90</a></Header>
                </div>
                    {
                        typeof rules.length !== "undefined" ?  rules.map((todo, index) => <Item index={index} refundPercent={todo.refundPercent} status={todo.status}/>) : <div></div>
                    }               
                <Modal 
                    closeIcon
                    trigger={<Button className="BodyButton"  onClick={this.handleOpen} floated='right' size='large' color='blue'>Create rule <Icon name='add'/> </Button>}
                    open={this.state.modalOpen}
                    >
                    <Modal.Content>
                        <Segment>
                            <Container textAlign='left'>
                                <Header as='h3' textAlign="left">Rule  #1</Header>
                            </Container>
                            <Divider />
                            <Container>
                                    <Grid columns={2}>
                                        <Grid.Column>
                                            <Container>Status <Dropdown onChange={this.handleSelectStatut} selection options={options} value={this.state.value} placeholder='Status'/></Container>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Container>
                                                <Input
                                                    label={{ basic: true, content: '%' }}
                                                    labelPosition='right'
                                                    placeholder='Enter refund amount'
                                                    onChange={this.handleRefundPercent}
                                                    value={this.state.currentRefundPercent}
                                                />
                                            </Container>
                                        </Grid.Column>
                                    </Grid>
                                    <Button onClick={() => {this.addRule()}} className="BodyButton" floated='right' size='large' color='green'>Save rule</Button>
                            </Container>
                    </Segment>
                </Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default Body;

