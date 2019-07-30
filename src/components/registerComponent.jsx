import React, { Component } from 'react'
import { TextField, Button, Card,RadioGroup,FormControlLabel,Radio,FormControl} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import {userRegister} from '../services/userData'
import {withRouter} from 'react-router-dom';
class RegisterComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {
         firstName: "",
         lastName: "",
         userName: "",
         password: "",
         confirm_password: "",
         service:"",
         snackBarMessage:"",
         openSnackBar:false
      }
   }
   handlefirstNameChange = event =>{
      const firstName = event.target.value;
      this.setState({firstName : firstName})
  } 
  handlelastNameChange = event =>{
   const lastname = event.target.value;
   this.setState({lastName : lastname})
} 
handlemailChange = event =>{
   const userName = event.target.value;
   this.setState({userName : userName})
} 
handlepasswordChange = event =>{
   const password = event.target.value;
   this.setState({password : password})
} 
handleconfirm_passwordChange = event =>{
   const confirm_password = event.target.value;
   this.setState({confirm_password : confirm_password})
} 
handleserviceChange = event =>{
   const service = event.target.value;
   this.setState({service : service})
} 
handleSubmit = event => {
   event.preventDefault();
   if (this.state.firstName === "") {
   this.setState({
   openSnackBar: true,
   snackBarMessage: "firstName cannot be empty..!"
   })
   } 
   else if (this.state.lastName === "") {
   this.setState({
   openSnackBar: true,
   snackBarMessage: "lastName cannot be empty..!"
   })
   } 
   else if (this.state.userName === "") {
   this.setState({
   openSnackBar: true,
   snackBarMessage: "Email cannot be empty..!"
   })
   } 
   else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.userName)) {
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
   firstName: this.state.firstName,
   lastName: this.state.lastName,
   service:this.state.service,
   email: this.state.userName,
   password: this.state.password,
 
 
   }
console.log("register data==>",data);
   userRegister(data)
   .then((response) => {
   console.log(response)
   this.setState({
   openSnackBar: true,
   snackBarMessage: "Registered Successfully!!" 
   })
   this.props.history.push("/login")
  
   })
   .catch((err) => {
   console.log(err);
   
   });
   
   };
}
   
   loginClick = e => {
      e.preventDefault();
      this.props.history.push('/login')
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
            <Card className="card"
             
              >
                <div className="textfield">
               <div className="fundoo">FUNDOO</div>
               <br></br>
               <div className="headline">Create Your Fundoo Account</div>
               <br></br>
               <div className="name">
               <div className="first">
                 
                 <TextField
                     id="outlined-name"
                     label="FirstName"
                     name = "firstName"
                     value={this.state.firstName}
                     onChange={this.handlefirstNameChange}
                     margin="normal"
                     variant="outlined"
                     
                  />
                   </div>
                 
                 <div className="last">
                  <TextField 
                     id="outlined-name"
                     label="LastName"
                     name = "lastName"
                     value={this.state.lastName}
                     onChange={this.handlelastNameChange}
                     margin="normal"
                     variant="outlined"
                  />
               </div>
               </div>
               <div className="username">
                  <TextField className="un"
                     id="outlined-name"
                     label="UserName"
                     type="email"
                     autoComplete="email"
                     name = "userName"
                     value={this.state.email}
                     onChange={this.handlemailChange}
                     margin="normal"
                     variant="outlined"
                  />
               </div>
               <div className="pass">
               <div className="password">
                  <TextField
                     id="outlined-name"
                     label="Password"
                     type="password"
                     autoComplete="Password"
                     name = "password"
                     value={this.state.password}
                     onChange={this.handlepasswordChange}
                     margin="normal"
                     variant="outlined"
                  />
                  </div>
                 
                  <div className="password">
                  <TextField
                     id="outlined-name"
                     label="Confirm Password"
                     type="password"
                     autoComplete="confirm_password"
                     name = "confirm_password"
                     value={this.state.confirm_password}
                     onChange={this.handleconfirm_passwordChange}
                     margin="normal"
                     variant="outlined"
                  />
               </div>
               </div>
               
               <FormControl >
       
        <RadioGroup
          aria-label="service"
   
          
          value={this.state.service}
          onChange={this.handleserviceChange}
        >
           <div className="control">    
              <FormControlLabel value="Basic" control={<Radio />} label="Basic" />
          <FormControlLabel value="Advance" control={<Radio />} label="Advance" />
          </div>
        </RadioGroup>
      </FormControl>
     
           
               <br></br>
               <div className="btn">
               <Button id="button"
                     onClick={this.loginClick}
                  > <b>Sign In Instead</b>
               </Button>
                  <Button id="Reg_Button" onClick={this.handleSubmit}> REGISTER
                  </Button>
              
                 
               </div>
               </div>
               <div >
                    
               <img className="image" src={require('../assets/images/keep-512.png')} alt="keep icon" />
                   
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
 export default withRouter(RegisterComponent)
