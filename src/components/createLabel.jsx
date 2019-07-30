import React, { Component } from 'react'
import { createLabels, getLabels, createNoteLabels } from '../services/labelServices';
import {  Input, Button, List, Checkbox, Popper, Paper } from '@material-ui/core';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
export default class CreateLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: [],
            createdLabel: [],
            open: false,
            allLabels: [],
            labelId: "",
            checkList: "",
            isChecked: true
        }
    }
    componentDidMount() {
        this.getlabel()
    }
    getlabel = () => {
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
                this.getlabel()
            })
            .catch(err => {
                console.log("ERR_IN_CREATING_LABEL", err);
            })
    }
    handleToggle = () => {
        this.setState({
            open: !this.state.open,
            labelId: ""
        })
    }
    async CheckedNotes(e, labelId) {
        await this.setState({
            isChecked: e.target.checked,
            checkList: e.target.value,
            labelId: labelId
        })
        var data = {
            'noteIdList': this.props.noteID,
            'label': this.state.checkList
        }
        console.log("labelId Cheking", this.state.labelId);
        console.log("checklist Cheking", this.state.checkList);
        console.log("props noteId Cheking", this.props.noteID);
        await createNoteLabels(data, this.props.noteID, this.state.labelId)
            .then(response => {
                console.log("CREATE_NOTE_LABEL_BY_ID_RESPONSE", response);
                this.getlabel()
            })
            .catch(err => {
                console.log("ERROR_IN_CREATING_LABEL_", err);
            })
        //     console.log("checking for label ID",this.state.labelId);
        // this.props.labelToNote(this.state.labelId,this.state.checkList)
        // console.log("label Props check",this.state.labelId);
    }
    renderAllLabel = () => {
        return (<div>
            {this.state.allLabels.map((key) =>
                <List>
                    <Checkbox
                        value={key.label}
                        onClick={(e) => this.CheckedNotes(e, key.id)}></Checkbox>
                    {console.log("label key checking", key.id)
                    }
                    {key.label}
                </List>
            )}
        </div>
        )
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
                            <Paper >
                                <div className="labelDisp">
                                    <Input
                                        placeholder="add label here....."
                                        value={this.state.label}
                                        onChange={this.handleLabel}>
                                    </Input>
                                    <div className="labelPosition">
                                        {this.renderAllLabel()}
                                    </div>
                                </div>
                                <div>
                                    <Button onClick={this.handleSubmit}>+ &nbsp; CREATE &nbsp; "{this.state.label}"</Button>
                                </div>
                            </Paper>
                        </Popper>
                    </div>
                )}
            </PopupState>
        )
    }
}
