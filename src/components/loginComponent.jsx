import React, { Component } from 'react'
import { Card,TextField,Button } from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {userLogin} from '../services/userData'
import Snackbar from '@material-ui/core/Snackbar';
class LoginComponent extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            email:"",
            password:"",
            snackBarMessage:"",
         openSnackBar:false
        }
    }
    handleEmailChange=event=>{
        const email=event.target.value;
        this.setState({email:email})
    }
    handlePasswordChange=event=>{
        const password=event.target.value;
        this.setState({password :  password})
    }
    handleSubmit =() => {
       
        
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
        var data = {
        
        email: this.state.email,
        password: this.state.password
        }
     
        userLogin(data)
        .then((response) => {
        console.log(response);
        var token=response.data.id;
        console.log(token);
        localStorage.setItem('token',token);
        localStorage.setItem('firstName',response.data.firstName)
        localStorage.setItem('lastName',response.data.lastName)
        localStorage.setItem('email',response.data.email)
        localStorage.setItem('ProfilePic',response.data.imageUrl)
        localStorage.setItem('userId',response.data.userId)
        this.setState({
        openSnackBar: true,
        snackBarMessage: "Registered Successfully!!"
        });
        this.props.history.push("/dashboard");
        })
     
        .catch((err) => {
        console.log(err);
        
        });
        
        };
     }
        
   
     
     forgotPassClick=e=>{
        e.preventDefault();
        this.props.history.push('/forgot')
    }
    dashboardClick=e=>{
        e.preventDefault();
        this.props.history.push('/dashboard');
        
    }
    handleSnackClose=()=>{
        this.setState({
           openSnackBar:false
        })
     }
   
    render()
    {
        return (
            <div className="main">
                <Card className="Lcard" >
                    <h1 className="loginhead">FUNDOO</h1>
                    <div className="sign"><b>Sign In</b></div>
    <div>
       
 <TextField  className="email"
         id="outlined-name"
         label="EMAIL"
         type="email"
         autoComplete="email"
         value={this.state.email}
         onChange={this.handleEmailChange}
         margin="normal"
         variant="outlined"/>
    
       </div>
       <div >
        <TextField className="passworrd"
         id="outlined-name"
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
      
      <div className="bt">
          <Button id="Reg_Button" onClick={this.handleSubmit}>Sign In</Button>
      </div>
      <br></br>
      <div>
          <button id="button" onClick={this.forgotPassClick}> forgot password
          </button>
          </div>
          <br></br>
     
        
    
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
export default withRouter(LoginComponent);
