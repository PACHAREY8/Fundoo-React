import React, { Component } from 'react'
import { TextField, Button, Card,RadioGroup,FormControlLabel,Radio,FormControl} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import {userRegister} from '../services/userData'
import {withRouter} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import ServiceCardComponent from './serviceCard';
const theme=createMuiTheme({
   overrides:{
      MuiInputBase:{
         input:{  
               width: "278px",          
         }
      },
         MuiCard:{
            root:{
            width: "80%",
            display: "block",
            overflow: "hidden",
            "font-size": "116%"
        }

      }
   }
})
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
         openSnackBar:false,
         // cartId:"",
         // name:""
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
   // var cartId="",name="";
   // this.setState({
   //    cartId:this.props.location.state.cartId,
   //    name:this.props.location.state.name
   // })  
   // console.log("service name check>>",this.props.location.state.cartId,this.props.location.state.name);
    
   var data = {
   firstName: this.state.firstName,
   lastName: this.state.lastName,
   service:this.props.location.state.name,
   email: this.state.userName,
   password: this.state.password,
   cartId:this.props.location.state.cart
 
 
   }
// console.log("register data==>",data);
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

   loginClick = (cartIdd,changeColor,Cart) => {
      var data={
         cartIdd:cartIdd,
         changeColor:changeColor,
         Cart:Cart
      }
      this.props.history.push('/login',data)
   }
   handleSnackClose=()=>{
      this.setState({
         openSnackBar:false
      })
   }
   goToServiceCard=()=>{
      this.props.history.push('/serviceCard')
   }
   render() 
   {
      // console.log("reg cart checking==>",this.props.location.state.cartId);
      
      var changeColor="", cartIdd="",Cart="";
      if(this.props.location.state!=='undefined'){
         changeColor="orange"
         cartIdd=this.props.location.state.productId
         Cart=this.props.location.state.cart

      }
      // console.log("reg cart checking==>",cartIdd);
      return (
         <div className="main">
            <MuiThemeProvider theme={theme}>
            <Card className="card"
              >
                <div className="textfield">
                <div className="titleName_fundoo">
                <p className="loginhead">
                        <span style={{ color: "blue" }}>F</span>
                        <span style={{ color: "red" }}>U</span>
                        <span style={{ color: "yellow" }}>N</span>
                        <span style={{ color: "blue" }}>D</span>
                        <span style={{ color: "green" }}>O</span>
                        <span style={{ color: "red" }}>O</span>
                    </p>
                    <Button className="button_GTC" style={{backgroundColor:"darkgrey",width: "9%",height: "49px"}} onClick={this.goToServiceCard} >Go TO Cart</Button>
                    </div>
               <br></br>
               <div className="headline">Create Your Fundoo Account</div>
               <br></br>
               <MuiThemeProvider theme={theme}>
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
                 
                  <div className="cpassword">
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
               </MuiThemeProvider>
               <br></br>
               <div><ServiceCardComponent
               cartProps={true}
               cartIdd={cartIdd}
               color={changeColor}
               >
            </ServiceCardComponent>
            </div>
               <div className="btn">
               <Button id="button"
                     onClick={()=>this.loginClick({cartIdd},{changeColor},{Cart})}
                  > <b>Sign In Instead</b>
               </Button>
                  <Button id="Reg_Button" onClick={this.handleSubmit}> <b>REGISTER</b>
                  </Button>
               </div>
               </div>
            </Card>
            </MuiThemeProvider>

           
           
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
