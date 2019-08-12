import React, { Component } from 'react'
import { Card } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { userService, addToCart } from '../services/shoppingService';

const theme = createMuiTheme({
    overrides: {
        MuiCard: {
            root: {
                overflow: "visible",
                width: "67%",
                height: "271px",
                display: "grid",
                "font-size": "116%",
                "padding-left": "14px",
                "padding-top": "7px"
            }
        }
    }
})
class ServiceCardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceArr: [],
            cartId: "",
            name: "",
            productDetails: "",
            cart: ""
        }
    }
    componentDidMount() {
        userService()
            .then(response => {
                this.setState({
                    serviceArr: response.data.data.data
                })
                console.log("RES_FROM_GET_SHOPPING_SERVICE", this.state.serviceArr);

            })
            .catch(err => {
                console.log("ERR_IN_GETTING_SHOPPING_SERVICE", err);

            })
    }
    handleServiceLogin = () => {
        this.props.history.push('/login')
    }
    async  goToRegister(cartId) {
        console.log(cartId);

        var data = {
            'productId': cartId,
        }
        await addToCart(data)
            .then(response => {
                console.log("RES_FROM_ADD_TO_CART", response);
                this.setState({
                    productDetails: response.data.data.details.productId,
                    name: response.data.data.details.product.name,
                    cart: response.data.data.details.id,
                })

            })
            .catch(err => {
                console.log("ERR_IN_ADDING_TO_CART", err);

            })
        var cart = {
            productId: this.state.productDetails,
            name: this.state.name,
            cart: this.state.cart

        }
        console.log("cart id after add to cart==>", cart);
        this.props.history.push('/register', cart)



    }
    render() {
        const service = this.state.serviceArr.map((key) => {
            // console.log("serveice props",this.props.color,this.props.cartIdd,this.props.cartProps);
            // console.log("key.id==>",key.id,"props cart id",this.props.cartIdd);


            return (
                <MuiThemeProvider theme={theme}>
                    <div className="ser_cardDisplay" onClick={this.props.cartIdd ? null : () => this.goToRegister(key.id)}>
                    <Card style={{backgroundColor:"#acacac",width:"80%"}}>    
                    <Card style={{ width:"95%",lineHeight:"173%",backgroundColor: (key.id === this.props.cartIdd) ? this.props.color : null }} className="ser_card2" key={key.id}>
                            {/* className="ser_card2" */}
                            <div style={{width:"335px"}} >
                                <div style={{
                                    color: "black", textAlign: "left", "fontSize": "148%",
                                    paddingRight: "22%"
                                }}>Price:${key.price} per Month</div>
                                <div style={{ color: "blue", textAlign: "left" }}>{key.name}</div>
                                <div className="ser_content">
                                    <li> ${key.price}/Month <br></br>
                                        {key.description} </li>
                                </div>
                            </div>

                        </Card>
                        {(key.id===this.props.cartIdd)?

                        <b>{this.props.status} </b>
                        :<b>Add To Cart</b>}
                        </Card>
                    </div>
                </MuiThemeProvider>
            )
        })
        return (
            (this.props.cartProps) ?
                <div className="ser_reg_display">
                    {service}
                </div>
                :
                <div>
                    <div className="serviceTitle">FundooNotes</div>
                    <div className="ser_headline">fundooNotes offered. Choose below service to Register.</div>
                    <div className="ser_card_div">
                        {service}
                    </div>
                    <div className="ser_signIn" onClick={this.handleServiceLogin}>Sign In Instead</div>
                </div>

        )
    }
}
export default withRouter(ServiceCardComponent);
