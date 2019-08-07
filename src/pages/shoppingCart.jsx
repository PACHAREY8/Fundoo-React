import React, { Component } from 'react'
import ShoppingCartComponent from '../components/shoppingCartComponent';

export default class ShoppingCart extends Component {
    render() {
        console.log("shopping cart checking",this.props);
        
        return (
            <div>
                <ShoppingCartComponent></ShoppingCartComponent>
            </div>
        )
    }
}
