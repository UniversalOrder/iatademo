import React, { Component } from 'react';
import { Button, Segment, Container, Icon, Divider, Header, Grid , Image, Dropdown, Input} from "semantic-ui-react";
import { Web3 } from 'web3'


import './Body.css'

const options = [
    { key: 1, text: 'Canceled', value: 1 },
    { key: 2, text: 'Delayed', value: 2 },
  ]

export default class Item extends Component {

    constructor(props) {
        super(props);
        this.state = { mode:"display", ...props };
      }



    _handleDisplayToEdit = () => {
        this.setState((prevState) => ({
            mode:"edit"
          }))
       }

    _handleEditToDisplay = () => {
        this.setState((prevState) => ({
            mode:"display"
          }))
       }

    handleRefundPercent = (event) => {
        this.setState({refundPercent: event.target.value});
    }

    handleSelectStatut = (event) => {
        this.setState({status:1});
    }



    render() {
            if (this.state.mode === "display") {
                return ( <Container>
                    <Segment>
                       <Container textAlign='left'>
                       <Header as='h3' textAlign="left">Rule {options[this.state.status-1].text} : if cancel then rufund {this.state.refundPercent}%</Header>
                       </Container>
                       <Container textAlign='right'>
                           <Button onClick={this._handleDisplayToEdit} icon='write' />
                       </Container>
                       <Divider />
                       <Container>
                           <Grid columns={2}>
                           <Grid.Column>
                               <Container>Status {options[this.state.status-1].text}</Container>
                           </Grid.Column>
                           <Grid.Column>
                               <Container>
                                    {this.state.refundPercent}%
                               </Container>
                           </Grid.Column>
                           </Grid>
                       </Container>
                   </Segment>
                   <Divider />
               </Container>) ;
            } else {
                return ( 
                <Container>
                    <Segment>
                       <Container textAlign='left'>
                       <Header as='h3' textAlign="left">Rule  #{this.state.index}</Header>
                       </Container>
                       <Container textAlign='right'>
                            <Button onClick={this._handleEditToDisplay} color='green' icon='checkmark' />
                            <Button onClick={this._handleEditToDisplay} icon='remove' />
                       </Container>
                       <Divider />
                       <Container>
                           <Grid columns={2}>
                           <Grid.Column>
                               <Container>Status <Dropdown onChange={this.handleSelectStatut} value={this.state.status} selection options={options} placeholder='Status'/></Container>
                           </Grid.Column>
                           <Grid.Column>
                               <Container>
                                   <Input
                                       label={{ basic: true, content: '%' }}
                                       labelPosition='right'
                                       placeholder='Enter refund amount'
                                       onChange={this.handleRefundPercent}
                                       value={this.state.refundPercent}
                                   />
                               </Container>
                           </Grid.Column>
                           </Grid>
                       </Container>
                   </Segment>
                   <Divider />
               </Container>) ;
            }
    }
}

