import React, { Component } from 'react';
import { Popper, Paper, IconButton, MenuItem, Avatar, Button, Input } from '@material-ui/core';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
// import AccountCircle from '@material-ui/icons/AccountCircle';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { profilePicUpload } from '../services/noteServices'
const url = "http://fundoonotes.incubation.bridgelabz.com/"
const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            rounded: {
                "border-radius": 13,
                width: 387,
            }
        },
        MuiInputBase: {
            root: {
                323: {
                    width: 97,
                    "margin- left": 13,
                }
            },
            input: {
                333: {
                    font: "inherit",
                    width: 100,
                    border: "none",
                    "margin-left": 8,
                }
            }
        },
        MuiInput: {
            root: {
                323: {
                    position: "unset",
                    width: 100,
                    "margin-left": "inherit",
                }
            }
        }
    }
})
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
        console.log("profile event", event.target.files[0]);
        this.setState({ selectFile: event.target.files[0].name })
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
        this.setState({ open: !this.state.open })
        this.props.logoutProps(this.state.open)
        console.log("logout props", this.state.open);
    }
    // onClick={this.clickMoreOptions}
    render() {
        return (
            <MuiThemeProvider theme={theme}>
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
                                            <div className="profileupload">
                                                {this.state.profilePic !== "" &&
                                                    <div>
                                                        <label for="profilePic">
                                                        <Avatar style={{ width: "115px", height: "115px" }}>
                                                            <img style={{
                                                                width: "118px", height: "118px"
                                                            }}
                                                                src={this.state.profilePic} alt="pic"></img>
                                                        </Avatar>
                                                        </label>
                                                        {/* <b style={{ backgroundColor: "black" }}></b> */}
                                                        <Input type="file" onChange={this.handleprofile} className="inputfile" id="profilePic" style={{ display: "none" }} />
                                                    </div>
                                                }
                                            </div>
                                            <div className="nameEmailProfile">
                                                <div className="firstLastName">
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
            </MuiThemeProvider>
        )
    }
}
export default Dropdown;