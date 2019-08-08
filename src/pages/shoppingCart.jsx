import React, { Component } from 'react'
import ShoppingCartComponent from '../components/shoppingCartComponent';
import DashboardComponent from '../components/dashboardComponent';

export default class ShoppingCart extends Component {
    constructor(props){
        super(props);
        this.state={
            open:false,
            listview:false,
            transition:false,
        }
    }
    Handletransition=()=>{
        this.setState({
            transition:!this.state.transition
        })
    }
    listview=(listview)=>{
        this.setState({
            listview:!listview
        })
    }
    render() {
        // console.log("shopping cart checking",this.props);
        var transition =this.state.transition?"transitionLeft":"transitionRight"
    

        return (
            <div >
                <div  >
                <DashboardComponent
            //   Handletransition={this.Handletransition}
              listview={this.listview}
              />
                </div>
                <ShoppingCartComponent id={transition}></ShoppingCartComponent>
            </div>
        )
    }
}
