import React, { Component } from 'react'
import { Card, TextField, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { userLogin } from '../services/userData'
import Snackbar from '@material-ui/core/Snackbar';
import ServiceCardComponent from './serviceCard';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
const theme = createMuiTheme({
    overrides: {
        MuiCard: {
            root: {
                width: "67%",
                overflow: "hidden",
                "font-size": "116%",
                "margin-left": "18%"
            }
        }
    }
})
class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            snackBarMessage: "",
            openSnackBar: false,
            cartId:"",
            cartIId:""
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
    handleSubmit = () => {
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
        else {
            this.setState=({
                cartIId:this.props.location.state.Cart.Cart
            })
            if (this.props.location.state !== undefined) {
                var data = {
                'email': this.state.email,
                'password': this.state.password,
                'cartId':this.props.location.state.Cart.Cart
            }
        }else{
            var data = {
                'email': this.state.email,
                'password': this.state.password
            }
        }
            userLogin(data)
                .then((response) => {
                    console.log(response);
                    var token = response.data.id;
                    console.log(token);
                    localStorage.setItem('token', token);
                    localStorage.setItem('firstName', response.data.firstName)
                    localStorage.setItem('lastName', response.data.lastName)
                    localStorage.setItem('email', response.data.email)
                    localStorage.setItem('ProfilePic', response.data.imageUrl)
                    localStorage.setItem('userId', response.data.userId)
                    this.setState({
                        openSnackBar: true,
                        snackBarMessage: "Registered Successfully!!"
                    });
                    if(this.props.location.state !== undefined){
                        this.setState({
                            cartId:this.props.location.state.cartIdd.cartIdd
                        })
                        console.log("login--to--shopping cart",this.state.cartId);
                        
                        this.props.history.push('/shoppingCart',this.state.cartId)
                    }
                    else{
                        this.props.history.push("/dashboard");
                    }
                    
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    }
    forgotPassClick = e => {
        e.preventDefault();
        this.props.history.push('/forgot')
    }
    registerClick = () => {
        this.props.history.push('/serviceCard')
    }
    dashboardClick = e => {
        e.preventDefault();
        this.props.history.push('/dashboard');
    }
    handleSnackClose = () => {
        this.setState({
            openSnackBar: false
        })
    }
    render() {
        console.log("product_ID",this.props.location.state.cartIdd.cartIdd,"cart_IID",this.props.location.state.Cart.Cart);
        var changeColor = '', cartIdd = '',status='';
        if (this.props.location.state !== undefined) {
            changeColor = "orange"
            cartIdd = this.props.location.state.cartIdd.cartIdd
            status="Selected"
        }
        return (
            <div className="main">
                <MuiThemeProvider theme={theme}>
                    <Card className="Lcard" >
                        <p className="loginheadd">
                            <span style={{ color: "blue" }}>F</span>
                            <span style={{ color: "red" }}>U</span>
                            <span style={{ color: "yellow" }}>N</span>
                            <span style={{ color: "blue" }}>D</span>
                            <span style={{ color: "green" }}>O</span>
                            <span style={{ color: "red" }}>O</span>
                        </p>
                        <div className="ser_sign"><b>Sign In</b></div>
                        <div className="ser_contToFundoo">Continue to Fundoo</div>
                        <div>
                            <TextField className="email"
                                id='email'
                                label="EMAIL"
                                type="email"
                                autoComplete="email"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                                margin="normal"
                                variant="outlined" />
                        </div>
                        <div >
                            <TextField className="passworrd"
                                id="password"
                                label="PASSWORD"
                                type="password"
                                autoComplete="current-password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <br></br>
                        <div className="ser_bt">
                            <Button className="ser_Reg_Button" onClick={this.handleSubmit} style={{ backgroundColor: "royalblue" }}>Sign In</Button>
                        </div>
                        <br></br>
                        <div className="ser_ButnInLogin">
                            <div className="ser_button" onClick={this.forgotPassClick}> forgot password?</div>
                            <div className="ser_create" onClick={this.registerClick}>Create Account</div>
                        </div>
                        
                        <br></br>
                
                             {(this.props.location.state !== undefined) 
                            && 
                            <div  style={{backgroundColor:"gray",paddingTop:"4%",paddingBottom:"10%"}}>
                                <b style={{fontSize:"20px"}}>Services</b>
                                
                                <ServiceCardComponent
                                    cartProps={true}
                                    cartIdd={cartIdd}
                                    color={changeColor}
                                    status={status}
                                >
                                </ServiceCardComponent>
                            </div>
                            }

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
                </MuiThemeProvider>
            </div>
        )
                    
    }
}
export default withRouter(LoginComponent);
