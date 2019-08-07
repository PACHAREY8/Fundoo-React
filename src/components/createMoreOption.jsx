import React, { Component } from 'react';
import { Popper, Paper, IconButton, MenuItem, ClickAwayListener } from '@material-ui/core';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import CreateLabel from './createLabel';
class MoreOptions extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
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
    open = () => {
        this.setState({ open: !this.state.open })
    }
    clickAway=()=>{
        this.setState({
            open:false
        })
    }
    render() {
        return (
            <PopupState variant="popper">
                {popupState => (
                    <div>
                        <IconButton variant="contained" {...bindToggle(popupState)}>
                            <img src={require('../assets/images/more.png')}
                                onClick={this.open}
                                alt="more options icon" />
                        </IconButton>
                    
                        <Popper  {...bindPopper(popupState)} transition style={{ zIndex: "9999" }}  >
                        <ClickAwayListener onClickAway={this.clickAway}>
                            <Paper>
                                <MenuItem>
                                    <CreateLabel>
                                    </CreateLabel>
                                </MenuItem>
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