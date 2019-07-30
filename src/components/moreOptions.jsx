import React, { Component } from 'react';
import { Popper, Paper, MenuItem, ClickAwayListener } from '@material-ui/core';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import CreateLabel from './createLabel';
class MoreOptions extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            addLabel: false,
            queAns: []
        }
    }
    handleDelete = (evt) => {
        try {
            console.log("Note ID: ", this.props.noteID)
            this.props.PropsToDelete(this.props.noteID);
            console.log(evt.target.value);
        } catch (err) {
            console.log("error in handle delete event", err);
        }
    }
    
    handleAway=()=>{
        this.setState({open:false})
    }
    // handleEditor=(e)=>{
    //     this.props.moreToEditorPorps(e.target.value,this.props.noteID)
    //     console.log("more option editor value",e.target.value);
    // }
    QuePropsToAllNotes=(value)=>{
        this.setState({
            queAns:value
        })
        this.props.QuePropsToAllNotes(this.state.queAns)
    }
    // handleIdToEditor=()=>{
    //     this.props.IdtoEditor(this.props.noteID)
        
    // }
    handleEditor=()=>{
    this.props.propsToEditor()
    }
    render() {
        return (
            <PopupState variant="popper" >
                {popupState => (
                    <div>
                        <div variant="contained" {...bindToggle(popupState)}>
                            <img src={require('../assets/images/more.png')}
                                onClick={this.clickMoreOptions}
                                alt="more options icon" />
                        </div>
                            <Popper  {...bindPopper(popupState)} transition style={{zIndex:"9999"}}
                            >
                            <ClickAwayListener onClickAway={this.handleAway} >
                                <Paper>
                                    
                                            <div>
                                                <MenuItem onClick={this.handleDelete}>Delete Note</MenuItem>
                                                <MenuItem ><CreateLabel noteID = {this.props.noteID} >Create</CreateLabel></MenuItem>
                                                <MenuItem onClick={this.handleEditor}> 
                                                   
                                                    
                                                 Ask A Question</MenuItem>
                                            </div>
                                          
                                </Paper>
                                </ClickAwayListener>
                            </Popper>
                    </div>
                )}
            </PopupState>
        )
    }
}
export default MoreOptions;
// onClick={this.handlelableprops}