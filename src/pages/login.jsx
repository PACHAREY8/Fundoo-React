import React, { Component } from "react";
import LoginComponent from "../components/loginComponent";
class Login extends Component{
    render(){
        console.log("login Cart Id check",this.props);
        
        return (
            <div className="container">
                
              <LoginComponent />
            </div>
        );
    }
}
export default Login;