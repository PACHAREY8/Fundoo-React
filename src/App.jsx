import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Register from './pages/register'
import Login from './pages/login'
import Forgot from './pages/forgot'
import Dashboard from './pages/dashboard'
import Drop from './pages/drop'
import QueDisplay from './pages/QueDisplay'
import Editor from './pages/editorComponent'
import Trash from './pages/trash'
import Reminder from './pages/reminder'
import Archive from './pages/archive'
import UserLabel from './pages/userLabel'
import ServiceCard from './pages/serviceCard';
import ShoppingCart from './pages/shoppingCart'


 
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="App">
          <Route exact path="/" component={ServiceCard}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
           <Route path="/forgot" component={Forgot}></Route>
            <Route path="/dashboard" component={Dashboard}></Route>   
            <Route path="/drop" component={Drop}></Route>   
            <Route path="/QueDisplay" component={QueDisplay}></Route>   
            <Route path="/editorComponent" component={Editor}></Route>   
            <Route path="/trash" component={Trash}></Route>  
            <Route path="/reminder" component={Reminder}></Route>   
            <Route path="/archive" component={Archive}></Route>   
            <Route path="/userLabel" component={UserLabel}></Route> 
            <Route path="/serviceCard" component={ServiceCard}></Route>
            <Route path="/shoppingCart" component={ShoppingCart}></Route>  
          </div>
        </Router>
      </div>
    );
  }
}
export default App;