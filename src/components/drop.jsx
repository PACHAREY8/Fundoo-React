import React, { Component } from 'react'
import { createLabels, getLabels } from '../services/labelServices';
import { MenuItem, Input, Button, List, Checkbox, Paper, Popper } from '@material-ui/core';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
export default class CreateLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: [],
            createdLabel: [],
            open: false,
            allLabels: []
        }
    }
    componentDidMount() {
        getLabels()
            .then(response => {
                console.log("getlabels_in_drawer", response);
                this.setState({
                    allLabels: response.data.data.details
                })
                console.log("EXACT_RESPONSE_FROM_GET_ALL_LABELS", this.state.allLabels);
                console.log("RESPONSE_FROM_GET_ALL_LABEL", response);
            })
            .catch(err => {
                console.log("ERR_IN_GETTING_LABEL", err);
            })
    }
    handleLabel = (e) => {
        this.setState({
            label: e.target.value
        })
    }
    handleSubmit = () => {
        var userId = localStorage.getItem('userId')
        var data = {
            'label': this.state.label,
            'isDeleted': false,
            'userId': userId
        }
        createLabels(data)
            .then(response => {
                console.log("RESPONSE_FROM_CREATE_NOTE", response);
                this.setState({
                    createdLabel: response.data.label
                })
            })
            .catch(err => {
                console.log("ERR_IN_CREATING_LABEL", err);
            })
    }
    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }
    renderAllLabel() {
        this.state.allLabels.map((key) => {
            return (
                <List>
                    {key.label}
                </List>
            )
        })
    }
    render() {
        return (
            <PopupState variant="popper" >
                {popupState => (
                    <div>
                        <div variant="contained" {...bindToggle(popupState)}>
                            <div >Create Label
                </div>
                        </div>
                        <Popper  {...bindPopper(popupState)} transition style={{ zIndex: "9999" }}>
                            <Paper>
                                <div>
                                    <Input
                                        placeholder="add label here....."
                                        value={this.state.label}
                                        onChange={this.handleLabel}>
                                    </Input>
                                    <div>
                                        <Checkbox></Checkbox>
                                        {this.renderAllLabel()}
                                    </div>
                                </div>
                                <div>
                                    <Button onClick={this.handleSubmit}>+ &nbsp; CREATE &nbsp; {this.state.label}</Button>
                                </div>
                            </Paper>
                        </Popper>
                    </div>
                )}
            </PopupState>
        )
    }
}
// onClick={this.handlelableprops}