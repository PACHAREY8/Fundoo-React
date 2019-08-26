import React, { Component } from 'react';
import { Drawer } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import { getLabels, createLabels } from '../services/labelServices';
import EditLabel from './editLabel';
class DrawerMenu extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            trash: "",
            label: [],
            allLabels: [],
            showLabel: "",
            data: []
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
    getNotes = () => {
        this.props.history.push('/dashboard');
    }
    getArchive = () => {
        this.props.history.push('/archive');
    }
    getReminders = () => {
        this.props.history.push('/reminder');
    }
    getTrash = () => {
        this.props.history.push('/trash');
    }
    handleOpen = () => {
        this.setState({
            open: !this.state.open
        })
    }
    handleClose = () => {
        this.setState({
            open: false
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
    async ShowNote(labelName) {
        this.props.history.push(`/userLabel/${labelName}`,labelName)
    }
    render() {
        console.log("props_checking_in_drawer", this.props.appBarProps);
        var labelarr = this.state.allLabels.map((key) => {
            console.log("key labels name", key.label);
            return (
                <MenuItem>
                    <div className="MenulabelShow">
                        <img src={require('../assets/images/menuLabel.png')} alt="labels"></img>
                    </div>
                    <div onClick={() => this.ShowNote(key.label)} className="labelShow">
                        <b>{key.label}</b>
                    </div>
                </MenuItem>
            )
        })
        return (
            <div>
                <Drawer
                    variant="persistent"
                    open={this.props.appBarProps}
                    width={250}>
                    <div onClick={this.getNotes}>
                        <MenuItem id="noteMenu">
                            <img src={require('../assets/images/createNote.png')} alt="note icon"
                                style={{ marginRight: "50px" }} />
                            <b>NOTES</b>
                        </MenuItem>
                    </div>
                    <div onClick={this.getReminders}>
                        <MenuItem id="noteMenu" >
                            <img src={require('../assets/images/menuReminder.svg')} alt="reminder icon"
                                style={{ marginRight: "50px" }} />
                            <b>REMINDERS</b>
                        </MenuItem>
                    </div>
                    <div style={{ borderBottom: "1px solid lightgrey", borderTop: "1px solid lightgrey" }}>
                        <div style={{ marginRight: "218px", fontSize: "13px", marginBottom: "10px", marginTop: "10px", fontFamily: "arial" }}>
                            <b>LABELS</b>
                        </div>
                        <div style={{ "overflow-y": "auto", maxHeight: "500px", borderRadius: "0 25px 25px 0"}}>
                            {labelarr}
                        </div>
                        <EditLabel ></EditLabel>
                    </div>
                    <div>
                        <MenuItem id="noteMenu" onClick={this.getArchive} >
                            <img src={require('../assets/images/menuArchive.svg')} alt="archive icon"
                                style={{ marginRight: "50px" }} />
                            <b>ARCHIVE</b>
                        </MenuItem>
                    </div>
                    <MenuItem id="noteMenu" onClick={this.getTrash} >
                        <img src={require('../assets/images/menuTrash.svg')} alt="trash icon"
                            style={{ marginRight: "50px" }} />
                        <b>TRASH</b>
                    </MenuItem>
                </Drawer>
            </div>
        )
    }
}
// export default (DrawerMenu)
export default withRouter(DrawerMenu);