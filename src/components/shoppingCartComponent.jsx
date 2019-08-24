import React, { Component } from 'react'
import { userCartDetails, placeOrder } from '../services/shoppingService';
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
    },
};
const thm = createMuiTheme({
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
class ShoppingCartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {},
            activeStep: 0,
            address:"",
            key:""
        
        }
    }
    componentWillMount() {
        userCartDetails()
            .then(response => {
                console.log("RES_FROM_USER_CART_LIST", response.data.data[response.data.data.length-1].product);
                var listArray = response.data.data[response.data.data.length-1].product
                console.log("list array", listArray);
                
                this.setState({
                    
                    list: listArray,
                    key:response.data.data[response.data.data.length-1]
                })
                console.log("State",this.state.list);
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
    handleAddress=(e)=>{
        this.setState({
            address:e.target.value
        })
    }
    handleNextToPay=(cartId)=>{
       
        var data={
            'cartId':cartId,
            'address':this.state.address
        }
        placeOrder(data)
        .then(response=>{
            console.log("RES_AFETR_PLACING_AN_ORDER",response);
            this.setState(state => ({
                activeStep: state.activeStep + 1,
            }));
        })
        .catch(err=>{
            console.log("ERR_IN_PLACING_AN_ORDER",err);
            
        })
    }
    render() {
        console.log("render state", this.state.list);
        
        const { classes, theme } = this.props;
        const {list}=this.state
        const {key}=this.state
        // const UserShoppingArr = this.state.list.map((key) => {
            console.log("keyyy cheking ========>>",key.id);
            return (<div>
               
                {(this.state.activeStep=== 0)&&
                <div className="main_div_shopping">
                    <div className="titleInShopping">
                        <div className="shoop_title">Fundoo Notes</div>
                        <div className="stepper">
                            <MuiThemeProvider theme={thm}>
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
                                {/* <div>signIn         review        complete</div> */}
                            </MuiThemeProvider>
                        </div>
                    </div>
                    <div className="shopping_cart">
                        Shopping Cart
            </div>
                    <Divider style={{ marginTop: "20px", marginBottom: "20px" }}></Divider>
                    <div className="Details_adjust_shopping">
                        <div className="shopping_details">
                            ${list.price}
                             per month 
                             <div>{list.name}</div>
                        </div>
                        <div className="shopping_data">
                            <div style={{ color: "#40a1e2", paddingRight: "323px" }}>
                                Advance pack Details
                            </div>
                            <li>
                                {list.description}
                            </li>
                        </div>
                        <div className="shopping_data" >
                            <div>Price</div>
                            <div style={{ color: "#40a1e2" }}>
                                $ {list.price}
                                </div>
                        </div>
                        <div className="shopping_data">
                            <div>Validity</div>
                            <div style={{ color: "#40a1e2" }}>Per Month</div>
                        </div>
                        <div className="shooping_proceede">
                            <div>
                                Subtotal (1 Item) : ${list.price}
                            </div>
                            <div className="checkout">
                                <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === 2}>
                                    Proceed to Checkout
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Divider style={{ marginTop: "20px", marginBottom: "20px" }}></Divider>
                    <div className="final_subtotal">
                        Subtotal (1 Item) : ${list.price}
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
                            ${list.price} per month {list.name}
                        </div>
                        <div className="shopping_data">
                            <div style={{ color: "#40a1e2", paddingRight: "323px" }}>
                                Advance pack Details
                            </div>
                            <li>
                                {list.description}
                            </li>
                        </div>
                        <div className="shopping_data" >
                            <div>Price</div>
                            <div style={{ color: "#40a1e2" }}>
                                $ {list.price}
                                </div>
                        </div>
                        <div className="shopping_data">
                            <div>Validity</div>
                            <div style={{ color: "#40a1e2" }}>Per Month</div>
                        </div>
                        <div className="shooping_proceede">
                             <div className="checkoutt">
                                <Button size="small" onClick={()=>this.handleNextToPay(key.id)} disabled={this.state.activeStep === 2}>
                                    Place Your Order
                                </Button>
                            </div>
                            <div>
                                Subtotal (1 Item) : ${list.price}
                            </div>
                           
                        </div>
                    </div>
                    <Divider style={{ marginTop: "20px", marginBottom: "20px" }}></Divider>
                    <div className="shopping_delivery">
                        <div>
                        <textarea  className="text_message"
                        value={this.state.address}
                        onChange={this.handleAddress}
                        >
                        </textarea>
                        </div>
                        <div className="payment_status" >
                            <div style={{fontSize:"18px",textAlign:"left"}}>payment method</div>
                            <div style={{ color: "#40a1e2",fontSize:"24px",textAlign:"left" }}>Cash on Delivery</div>
                        </div>
                    </div>
                </div>}
                {(this.state.activeStep=== 2)&&
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
                       Order List
            </div>
                    <Divider style={{ marginTop: "20px", marginBottom: "20px" }}></Divider>
                    <div className="Details_adjust_shopping">
                        <div className="shopping_details">
                            ${list.price} per month {list.name}
                        </div>
                        <div className="shopping_data">
                            <div style={{ color: "#40a1e2", paddingRight: "323px" }}>
                                Advance pack Details
                            </div>
                            <li>
                                {list.description}
                            </li>
                        </div>
                        <div className="shopping_data" >
                            <div>Price</div>
                            <div style={{ color: "#40a1e2" }}>
                                $ {list.price}
                                </div>
                        </div>
                        <div className="shopping_data">
                            <div>Validity</div>
                            <div style={{ color: "#40a1e2" }}>Per Month</div>
                        </div>
                    </div>
                    <Divider style={{ marginTop: "20px", marginBottom: "20px" }}></Divider>
                </div>}
            </div>
            )
        // })
        // return (
        //     <div>
        //         {UserShoppingArr}
        //     </div>
        // )
    }
}
ShoppingCartComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(ShoppingCartComponent);
