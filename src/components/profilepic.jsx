import React, { Component } from 'react';
import { Popper, Paper, IconButton, MenuItem, Avatar, Button, } from '@material-ui/core';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
// import AccountCircle from '@material-ui/icons/AccountCircle';
import profilePicUpload from '../services/noteServices'
const url = "http://34.213.106.173/"
class Dropdown extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            profilePic: "",
        }
        // this.Logout=this.Logout.bind(this)
    }
    componentDidMount() {
        if (localStorage.getItem("ProfilePic") !== 'undefined') {
            this.setState({
                profilePic: url + localStorage.getItem("ProfilePic")
            })
        }
    }
    handleprofile = (event) => {
        // console.log("profile event", event.target.files[0].name);
        this.setState({selectFile:event.target.files[0].name})
        console.log(this.state.selectFile);
        const formData = new FormData()
        formData.append('file', event.target.files[0])
        profilePicUpload(formData)
            .then(response => {
                console.log("response from profile pic upload==>", response);
                console.log("profile", response.data.status.imageUrl);
                localStorage.setItem('ProfilePic', response.data.status.imageUrl)
                this.setState({
                    profilePic: url + response.data.status.imageUrl
                })
                console.log("final profile pic", this.state.profilePic);
            })
    }
    Logout = (e) => {
        this.setState({open:!this.state.open})
        this.props.logoutProps(this.state.open)
        console.log("logout props",this.state.open);
        
        
        
      }
    // onClick={this.clickMoreOptions}
    render() {
        return (
         
            <PopupState variant="popper" >
                {popupState => (
                    <div >
                        <IconButton {...bindToggle(popupState)}>
                            <Avatar>
                                {this.state.profilePic !== "" ?
                                    <img style={{
                                        width: "41px", height: "41px"
                                    }}
                                        src={this.state.profilePic} alt="pic"></img>
                                    : <b style={{ backgroundColor: "black" }}></b>
                                }
                            </Avatar>
                        </IconButton>
                        <Popper  {...bindPopper(popupState)}>
                            <Paper className="profilepaper">
                                <br></br>
                              
                              <div >
                              <div className="userdataset">
                                    <Avatar type="file" onClick={this.handleprofile} 
                                    style={{  width: "120px", height: "120px"}}>
                                        {this.state.profilePic !== "" ?
                                            <img style={{
                                                width: "118px", height: "118px"
                                            }}
                                                src={this.state.profilePic} alt="pic"></img>
                                            : <b style={{ backgroundColor: "black" }}></b>
                                        }
                                    </Avatar>
                                    <div className="nameEmailProfile">
                                   <div    className="firstLastName">                                  
                                        <label >
                              <b> {localStorage.getItem('firstName')} </b>
                              <b>{localStorage.getItem('lastName')}</b>
                                        
                                    </label>
                                    </div>
                                    <div>
                                    <label>
                                    {localStorage.getItem('email')}
                                    </label>
                                    </div>
                                    </div>
                                    </div>
                                    <MenuItem onClick={this.Logout} ><Button id="logoutButton"><b>Sign Out</b></Button></MenuItem>
                                </div>
                              
                            </Paper>
                        </Popper>
                    </div>
                )}
            </PopupState>
         
        )
    }
}
export default Dropdown;