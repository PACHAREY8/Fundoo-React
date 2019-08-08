import React, { Component } from 'react'
import InputBase from '@material-ui/core/InputBase';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiThemeProvider, createMuiTheme, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import { withRouter } from 'react-router-dom';
import DrawerMenu from './drawer';
// import AccountMenu from './appBar'
// import AccountCircle from '@material-ui/icons/AccountCircle';
import Dropdown from '../components/dropdown'
// import Notes from './notes';
// import Notes from './notes';
const thm = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paperAnchorLeft: {
        top: 70,
        width: "333px",
        background: 'white'
      },
      paperAnchorDockedLeft: {
        borderColor: "white"
      },
    },
    MuiAppBar: {
      colorPrimary: {
        color: 'black',
        backgroundColor: 'lightgray'
      },
      root: {
        top: 0,
        left: 'auto',
      },
      InputRoot: {
        color: 'inherit',
      },
      positionStatic: {
        position: "fixed",
      }
    }
  }
});
class DashboardComponent extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      searchNote: "",
      listview: false,
      trash: '',
    }
    this.handleToggle = this.handleToggle.bind(this);
  }
   handleToggle=()=>{
     this.setState({ open: !this.state.open });
    this.props.Handletransition();
    console.log("CHECKING_FOR_HANDLE_TOGGLE_IN_DASHBOARD_COMP", this.state.open);
  }
  handleChange = () => {
    //set selection to the value selected
    this.setState({ selection: this.state.selection });
  }
  SearchHandle = (evt) => {
    this.setState({ searchNote: evt.target.value })
    this.props.getSearchNote(evt.target.value)
  }
  handleview = (e) => {
    this.setState({
      listview: !this.state.listview
    })
    this.props.listview(this.state.listview)
  }
  dashTrash = (event, value) => {
    this.setState({
      trash: value
    })
    this.props.dashTrashProps(this.state.trash, event.target.value)
  }
  handleRefresh = (event) => {
    window.location.reload();
    this.props.reloadprops(event.target.value)
  }
  Logout = (e) => {
    console.log("logout", this.props.drop);
    localStorage.clear()
    this.props.history.push('/login')
  }
  NotesPropsToDashboard = (isNotes, isArchive, isReminder, isTrash) => {
    this.props.NotespropsToDashboardPage(isNotes, isArchive, isReminder, isTrash)
    console.log(isArchive);
  }
  handleShoppingCart=()=>{
    this.props.history.push('/shoppingCart')
  }
  render() {
    return (
      <MuiThemeProvider theme={thm}>
        <div>
          <AppBar position="static" className="appBar">
            <Toolbar className="toolBar" >
            <div ><IconButton color="inherit" aria-label="Open drawer" >
                <MenuIcon id="menu" onClick={this.handleToggle} />
              </IconButton></div>
              <img className="img" src={require('../assets/images/keep-512.png')} alt="keep icon" /><b>FundooNotes</b>
             
              <div className="iconAdjust">
                <div className="searchIcon">
                  <InputBase className="srch"
                    placeholder="Search…"
                    value={this.state.searchNote}
                    onChange={this.SearchHandle}
                  />
                  <div className="search">
                    <IconButton><SearchIcon>
                    </SearchIcon></IconButton>
                  </div>
                </div>
              </div>
              <div>
                <Tooltip title="Cart">
                <IconButton style={{  marginLeft: "782%"}} onClick={this.handleShoppingCart}>
                  <img src={require('../assets/images/cart_.png')} alt="cart">
                  </img>
                </IconButton>
                </Tooltip>
              </div>
              <div className="refresh">
                <IconButton onClick={this.handleRefresh}>
                  <img src={require('../assets/images/refresh icon.png')} alt="refresh">
                  </img>
                </IconButton>
              </div>
              <div className="view">
                {!this.state.listview ?
                  <div>
                    <IconButton onClick={this.handleview}>
                      <img src={require('../assets/images/listView')} alt="list" />
                    </IconButton>
                  </div>
                  :
                  <div>
                    <IconButton onClick={this.handleview}>
                      <img src={require('../assets/images/gridview.png')} alt="grid" />
                    </IconButton>
                  </div>
                }
              </div>
              <div className="dropdown">
                <Dropdown className="drop"
                  logoutProps={this.Logout}
                >
                </Dropdown>
              </div>
            </Toolbar>
            <DrawerMenu className="drawer"
              appBarProps={this.state.open}
              trashprops={this.dashTrash}
              NotesPropsToDashboard={this.NotesPropsToDashboard}
            />
          </AppBar>
        </div>
      </MuiThemeProvider>
    )
  }
}
export default withRouter(DashboardComponent);
