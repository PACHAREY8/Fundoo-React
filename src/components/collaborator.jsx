import React, { Component } from 'react'
import { Dialog, Tooltip, DialogTitle, DialogContent, Avatar, DialogActions, Button, Input, List, ListItem, ListItemText, Hidden } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { getUserList, searchUserList, Addcollaborators } from '../services/noteServices';
const url = "http://34.213.106.173/"
const thm = createMuiTheme({
    overrides: {
        MuiDialog: {
            paperWidthSm: {
                "max-width": 622,
                "width": 535,
                "height": "256px",
                "border-radius": "16px"
            },
        },
        MuiInput: {
            root: {
                560: {
                    364: {
                        position: "relative",
                        width: 427,
                        "padding-left": 20,
                    }
                },
                442: {
                    560: {
                        " margin-left": 29,
                        width: 441,
                    }
                }
            }
        },
        MuiDialogContent: {
            root: {
                359: {
                    overflow: "hidden",
                }
            }
        }
    }
});
export default class CollaboratorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            AllUsers: [],
            ListUsers: [],
            text: "",
            collaborator: []
        }
    }
    componentDidMount() {
        getUserList()
            .then(response => {
                // console.log("response user",response);
                let UserList = response.data.map((key) => {
                    return key.email
                })
                this.setState({
                    AllUsers: UserList
                })
                // console.log("all list", this.state.AllUsers);
            })
            .catch(err => {
                console.log("error in collab", err);
            })
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
    handleOnchange = (e) => {
        const value = e.target.value;
        console.log("onchange vaklue", value);
        let ListUsers = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            ListUsers = this.state.AllUsers.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({
            ListUsers: ListUsers,
            text: value
        }))
        console.log("handle change : ", this.state.ListUsers);
    }
    selectValue(value) {
        this.setState(() => ({
            text: value,
            ListUsers: []
        }))
        var data = {
            "searchWord": value
        }
        searchUserList(data)
            .then((response) => {
                console.log("response from search list....", response);
                this.setState({
                    collaborator: response.data.data.details
                })
                console.log("final data in collab==>", this.state.collaborator);
            })
            .catch(err => {
                console.log("Error in serach User List ", err);
            })
    }
    renderSuggetions = () => {
        // const { ListUsers } = this.state;
        if (this.state.ListUsers.length === 0) {
            return null;
        }
        return (
            <List>
                {this.state.ListUsers.map((users) =>
                    <ListItemText onClick={() => this.selectValue(users)} style={{ "overflow": "Hidden" }}>
                        {users}
                    </ListItemText>)}
            </List>
        )
    }
    handleCollabClick = () => {
        var collab = this.state.collaborator.map((key) => {
            return key
        })
        console.log("collaborator email==>", collab);
        Addcollaborators(collab[0], this.props.noteID)
            .then(() => {
                console.log("Collaborate successfully");
            })
            .catch(err => {
                console.log("Error in collaboration", err);
            })
    }
    render() {
        return (
            <div>
                <div onClick={this.handleOpen}>
                   
                        <img
                            src={require('../assets/images/collaborator.png')}
                            alt="Collaborator"
                        />
                    
                </div>
                <MuiThemeProvider theme={thm}>
                    <Dialog className="dialog"
                        open={this.state.open}
                        onClose={this.handleClose}
                        style={{overflow:Hidden}}>
                        {/* <MuiThemeProvider theme={thm}> */}
                            <DialogTitle>
                                <b>Collaborator</b>
                            </DialogTitle>
                            <DialogContent style={{ "overflow-y": "hidden" }}>
                                <div className="collabUserData" >
                                    <Avatar>
                                        <img style={{
                                            width: "41px", height: "41px"
                                        }}
                                            src={url + (localStorage.getItem("ProfilePic"))} alt="profile Pic">
                                        </img>
                                    </Avatar>
                                    <div className="colabData">
                                        <div className="colabName">
                                            <div className="colabfirstName"> <b>{localStorage.getItem('firstName')}</b></div>
                                            <div className="colablastName"><b>{localStorage.getItem('lastName')}</b>  ( Owner )</div>
                                        </div>
                                        <div className="colabEmail" >
                                            {localStorage.getItem('email')}
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogContent style={{ "overflow": "hidden" }}>
                                <div className="userList-collab">
                                    <Avatar>
                                    </Avatar>
                                    {/* <MuiThemeProvider theme={thm}> */}
                                    <div >
                                        <Input className="colabUserData"
                                            value={this.state.text}
                                            placeholder="Person or Email to share with"
                                            disableUnderline={true}
                                            onChange={this.handleOnchange}
                                            type="text"
                                        />
                                    </div>
                                    </div>
                                    </DialogContent>
                                    <div><List className="collabUser"
                                    style={{overflow:Hidden}} >{this.renderSuggetions()}</List></div>
                                    {/* </MuiThemeProvider> */}
                             
                            
                            <DialogActions>
                                <div className="collabUserData">
                                    <div>
                                        <Button onClick={this.handleClose}><b>Cancel</b></Button>
                                    </div>
                                    <div>
                                        <Button onClick={this.handleCollabClick}><b>Save</b></Button>
                                    </div>
                                </div>
                            </DialogActions>
                        {/* </MuiThemeProvider> */}
                    </Dialog>
                </MuiThemeProvider>
            </div>
        )
    }
}
