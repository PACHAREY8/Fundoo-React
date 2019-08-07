import React, { Component } from 'react'
import { userCartDetails } from '../services/shoppingService';
import DashboardComponent from './dashboardComponent';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
const styles = {
    root: {
        flexGrow: 1,
        message:""
    },
};
const theme = createMuiTheme({
    overrides: {
        MuiLinearProgress: {
            bar: {
                "width": "300px",
                position: "relative",

            },
            barColorPrimary: {
                backgroundColor: "#3f51b5"
            }

        },
        MuiMobileStepper: {
            progress: {
                width: "43%"
            }

        }

    }
})
//   .MuiLinearProgress-barColorPrimary {
//     background-color: #3f51b5;
// }
//   .MuiMobileStepper-progress {
//     width: 79%;
// }
//   .MuiLinearProgress-bar {
//     /* top: 0; */
//     width: 385px;
//     bottom: 0;
//     /* position: absolute; */
//     transition: transform 0.2s linear;
//     /* transform-origin: left; */
// }

class ShoppingCartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            activeStep: 0,

        }
    }
    componentWillMount() {
        userCartDetails()
            .then(response => {
                console.log("RES_FROM_USER_CART_LIST", response);
                this.setState({
                    list: response.data.data
                })
                console.log(this.state.list);

            })
            .catch(err => {
                console.log("ERR_IN_GETTING_CART_LIST", err);

            })
    }
    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    render() {
        const { classes, theme } = this.props;

        const UserShoppingArr = this.state.list.map((key) => {
            console.log(key.product.name);


            return (<div>
                <div>
                    <DashboardComponent />
                </div>
                {(this.state.activeStep=== 0)&&
                <div className="main_div_shopping">
                    <div className="titleInShopping">
                        <div className="shoop_title">Fundoo Notes</div>
                        <div className="stepper">
                            <MuiThemeProvider theme={theme}>
                                <MobileStepper
                                    variant="progress"
                                    steps={3}
                                    // [{title:'signin'},{title:'review'},{title:'complete'}]
                                    position="static"
                                    className={classes.root}
                                    activeStep={this.state.activeStep}
                                    image={<img src={require('../assets/images/cart_.png')} alt="cartImage"></img>}
                                >

                                </MobileStepper>
                            </MuiThemeProvider>
                            {/* <div>signIn    review   complete</div> */}
                        </div>
                    </div>
                    <div className="shopping_cart">
                        Shopping Cart
            </div>
                    <Divider style={{ marginTop: "20px", marginBottom: "20px" }}></Divider>
                    <div className="Details_adjust_shopping">
                        <div className="shopping_details">
                            ${key.product.price} per month {key.product.name}
                        </div>
                        <div className="shopping_data">
                            <div style={{ color: "#40a1e2", paddingRight: "323px" }}>
                                Advance pack Details
                            </div>
                            <li>
                                {key.product.description}
                            </li>
                        </div>
                        <div className="shopping_data" >
                            <div>Price</div>
                            <div style={{ color: "#40a1e2" }}>$ {key.product.price}</div>
                        </div>
                        <div className="shopping_data">
                            <div>Validity</div>
                            <div style={{ color: "#40a1e2" }}>Per Month</div>
                        </div>
                        <div className="shooping_proceede">
                            <div>
                                Subtotal (1 Item) : ${key.product.price}
                            </div>
                            <div className="checkout">
                                <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === 2}>
                                    Proceed to Checkout
                                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                </Button>


                            </div>
                        </div>
                    </div>
                    <Divider style={{ marginTop: "20px", marginBottom: "20px" }}></Divider>
                    <div className="final_subtotal">
                        Subtotal (1 Item) : ${key.product.price}
                    </div>
                </div>}
                {(this.state.activeStep=== 1)&&
                <div className="main_div_shopping">
                    <div className="titleInShopping">
                        <div className="shoop_title">Fundoo Notes</div>
                        <div className="stepper">
                            <MuiThemeProvider theme={theme}>
                                <MobileStepper
                                    variant="progress"
                                    steps={3}
                                    // [{title:'signin'},{title:'review'},{title:'complete'}]
                                    position="static"
                                    className={classes.root}
                                    activeStep={this.state.activeStep}
                                    image={<img src={require('../assets/images/cart_.png')} alt="cartImage"></img>}
                                >

                                </MobileStepper>
                            </MuiThemeProvider>
                            {/* <div>signIn    review   complete</div> */}
                        </div>
                    </div>
                    <div className="shopping_cart">
                        Shopping Cart
            </div>
                    <Divider style={{ marginTop: "20px", marginBottom: "20px" }}></Divider>
                    <div className="Details_adjust_shopping">
                        <div className="shopping_details">
                            ${key.product.price} per month {key.product.name}
                        </div>
                        <div className="shopping_data">
                            <div style={{ color: "#40a1e2", paddingRight: "323px" }}>
                                Advance pack Details
                            </div>
                            <li>
                                {key.product.description}
                            </li>
                        </div>
                        <div className="shopping_data" >
                            <div>Price</div>
                            <div style={{ color: "#40a1e2" }}>$ {key.product.price}</div>
                        </div>
                        <div className="shopping_data">
                            <div>Validity</div>
                            <div style={{ color: "#40a1e2" }}>Per Month</div>
                        </div>
                        <div className="shooping_proceede">
                            <div>
                                Subtotal (1 Item) : ${key.product.price}
                            </div>
                            <div className="checkout">
                                <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === 2}>
                                    Proceed to Checkout
                                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                </Button>


                            </div>
                        </div>
                    </div>
                    <Divider style={{ marginTop: "20px", marginBottom: "20px" }}></Divider>
                    <div className="shopping_delivery">
                        <div>
                        <textarea  className="text_message"
                        value={this.state.message}
                        >
                        </textarea>
                        </div>
                        <div className="payment_status" >
                            <div style={{fontSize:"18px",textAlign:"left"}}>payment method</div>
                            <div style={{ color: "#40a1e2",fontSize:"24px",textAlign:"left" }}>Cash on Delivery</div>
                        </div>
                    </div>
                </div>}
            </div>
            )
        })
        return (
            <div>
                {UserShoppingArr}
            </div>
        )

    }
}
ShoppingCartComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(ShoppingCartComponent);

