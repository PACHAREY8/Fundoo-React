import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import { TextField, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import { userForgot } from '../services/userData'
// const userforgot = new service.userforgot();
class ForgotComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirm_password: "",
            snackBarMessage: "",
            openSnackBar: false
        }
    }
    handleEmailChange = event => {
        const email = event.target.value;
        this.setState({ email: email })
    }
    handlePasswordChange = event => {
        const password = event.target.value;
        this.setState({ password: password })
    }
    handleconfirm_PasswordChange = event => {
        const confirm_password = event.target.value;
        this.setState({ confirm_password: confirm_password })
    }
    loginClick = e => {
        e.preventDefault();
        this.props.history.push('/login')
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.state.email === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Email cannot be empty..!"
            })
        }
        else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Invalid Email..!"
            })
        }
        else if (this.state.password === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Password cannot be empty..!"
            })
        }
        else if (this.state.password.length < 6) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Password must be of atleast 6 characters long..!"
            })
        }
        else if (this.state.confirm_password === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Confirm Password cannot be empty..!"
            })
        }
        else if (this.state.password !== this.state.confirm_password) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Password and confirm Password must be same..!"
            })
        }
        else {
            var data = {
                Email: this.state.userName,
                Password: this.state.password
            }
            userForgot(data)
                .then((response) => {
                    console.log(response);
                    this.setState({
                        openSnackBar: true,
                        snackBarMessage: "Registered Successfully!!"
                    });
                    this.props.history.push("/login");
                })
                .catch((err) => {
                    console.log(err);
                    this.props.history.push("/login");
                });
        };
    }
    handleSnackClose = () => {
        this.setState({
            openSnackBar: false
        })
    }
    render() {
        return (
            <div className="main">
                <Card className="Lcard">
                    <div className="forgot"><b>Forgot Password</b></div>
                    <br></br>
                    <div>
                        <TextField className="email"
                            id="outlined-name"
                            label="Enter Registered Email Id"
                            type="email"
                            autoComplete="email"
                            value={this.state.Email}
                            onChange={this.handleEmailChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div >
                        <TextField className="passworrd"
                            id="outlined-name"
                            label="Create New Password"
                            type="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div className="sfirst">
                        <TextField className="passworrd"
                            id="outlined-name"
                            label="Confirm New Password"
                            type="password"
                            autoComplete="current-password"
                            value={this.state.confirm_password}
                            onChange={this.handleconfirm_PasswordChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <br></br>
                    <div className="bt">
                        <Button id="Reg_Button" onClick={this.handleSubmit}>Save & Redirect to Sign in</Button>
                    </div>
                </Card>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={this.state.openSnackBar}
                    autoHideDuration={2000}
                    onClose={this.handleSnackClose}
                    variant="error"
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id"> {this.state.snackBarMessage} </span>}
                    action={[
                        <div key="undo">
                            <Button key="undo" color="primary" size="small" onClick={this.handleSnackClose}>
                                OK
                  </Button>
                        </div>
                    ]}
                />
            </div>
        )
    }
}
export default withRouter(ForgotComponent);