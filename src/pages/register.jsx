import React, { Component } from "react";
import RegisterComponent from "../components/registerComponent";
class Register extends Component{
    render(){
        console.log("cardtid",this.props);
        
        return (
            
            <div className="container">
                
              <RegisterComponent/>
            </div>
        );
    }
}
export default Register;