import React, { Component } from 'react'
import { List, Dialog, DialogTitle, DialogContent, Input, DialogActions, Button } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { getLabels, createLabels, UpdateLabels, delateLabel } from '../services/labelServices';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
export default class EditLabel extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            trash: "",
            label: [],
            allLabels: [],
            flip: false,
            noteId: "",
            labelId: "",
            labelName: ''
        }
    }
    componentDidMount() {
        this.getLabel()
    }
    getLabel = () => {
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
    handleOpen = () => {
        this.setState({
            open: !this.state.open
        })
    }
    handleFlip = (noteId) => {
        this.setState({
            flip: !this.state.flip,
            noteId: noteId
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    handleLabel = (e) => {
        this.setState({
            label: e.target.value,
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
                this.getLabel()
            })
            .catch(err => {
                console.log("ERR_IN_CREATING_LABEL", err);
            })
    }
    async updateLabel(value) {
        var userId = localStorage.getItem('userId')
        await this.setState({
            labelId: value
        })
        console.log("label name", this.state.labelName);
        var data = {
            'label': this.state.labelName,
            'isDeleted': true,
            // 'id':this.state.labelId,
            'userId': userId
        }
        console.log("label_id_chhecking===>", this.state.labelId);
        UpdateLabels(data, this.state.labelId)
            .then(response => {
                console.log("RESPONSE_FROM_UPDATE_lABES", response);
                this.getLabel()
            })
            .catch(err => {
                console.log("ERR_IN_UPDATE_LABEL", err);
            })
    }
    handleLabelName = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
   async DeleteLabel(labelId){
    await this.setState({
            labelId:labelId
        })
        console.log("label Id check in edit label",this.state.labelId);
        
      await  delateLabel(this.state.labelId)
        .then(response=>{
            console.log("RESPONSE_FROM_DELETE_LABEL",response);
            this.getLabel()
            
        })
        .catch(err=>{
            console.log("ERR_IN_DELETING_LABEL",err);
            
        })
    }
    clearState=()=>{
        this.setState({
            label:""
        })
    }
    render() {
        var labelarr = this.state.allLabels.map((key) => {
            // console.log("key labels", key.label);
            return (
                !this.state.flip ?
                    <List >
                        <div onClick={() => this.handleFlip(key.id)} className="firstLabelDiv">
                            <div> <img src={require('../assets/images/labels.png')} alt="labels"></img>
                            </div>
                            <div>{key.label}</div>
                            <div>
                                <img src={require('../assets/images/renameLabels.png')} alt="renameLabels"></img>
                            </div>
                        </div>
                    </List>
                    :
                    <List>
                        <div className="firstLabelDiv">
                            <div onClick={()=>this.DeleteLabel(key.id)}>  <img src={require('../assets/images/DeleteP.svg')} alt="deleteLabels"></img>
                            </div>
                            <div><Input className="textfINlabel"
                                defaultValue={key.label}
                                name="labelName"
                                // value={this.state.labelName}
                                onChange={this.handleLabelName}
                            /></div>
                            <div onClick={() => this.updateLabel(key.id)}>
                                <img src={require('../assets/images/checkMark.png')} alt="checkmark"></img>
                            </div>
                        </div>
                    </List>
            )
        })
        return (
            <div>
                <div onClick={this.handleOpen}>
                    <MenuItem >
                        <img src={require('../assets/images/menuEdit.svg')} alt="edit icon"
                            style={{ marginRight: "50px" }} />
                        <b>EDIT LABELS</b>
                    </MenuItem>
                </div>
                <Dialog open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle><b>EDIT_LABELS</b></DialogTitle>
                    <DialogContent>
                        <div className="labelDialogContent">
                            <div onClick={this.clearState}><img src={require('../assets/images/cross.png')} alt="cross mark"></img></div>
                            <div><Input placeholder="Create Label...."
                                value={this.state.label}
                                onChange={this.handleLabel}>
                            </Input></div>
                            <div onClick={this.handleSubmit}><img src={require('../assets/images/checkMark.png')} alt="checkmark"></img>
                            </div>
                        </div>
                        <div>
                            {labelarr}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Done</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
