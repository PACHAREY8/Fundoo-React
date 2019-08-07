import React, { Component } from "react";
import DashboardComponent from '../components/dashboardComponent';
import Notes from '../components/createNotes';
import Getnotes from '../components/getNotes';
import {withRouter} from 'react-router-dom';
// import ColorPickerField from '../components/colorpicker'
class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state={
            open:false,
            searchNote: "",
            listview:false,
            trash:"",
            isNotes:true,
            isArchive:false,
            isReminder:false,
            isTrash:false,
            transition:false,
        }
        this.noteToCards = React.createRef()
        this.getSearchNote=this.getSearchNote.bind(this)
        this.displayNote=this.displayNote.bind(this)
    }
    getSearchNote(value) {
        this.setState({ searchNote: value })
    }
    displayNote(newCard){
        console.log("newcard data....==>",newCard);
        
        this.noteToCards.current.displayNewCard(newCard);
    }
    listview=(listview)=>{
        this.setState({
            listview:!listview
        })
    }
    trashPage=(value)=>{
        this.setState({
            trash:value
        })
    }
    Handletransition=()=>{
        this.setState({
            transition:!this.state.transition
        })
    }
    // NotespropsToDashboardPage=(isNotes,isArchive,isReminder,isTrash)=>{
    //     this.setState({
    //         isNotes:isNotes,
    //         isArchive:isArchive,
    //         isReminder:isReminder,
    //         isTrash:isTrash
    //     })
    //     console.log( this.state.isNotes,this.state.isArchive,this.state.isReminder, this.state.isTrash);
        
    // }
    // RedirectToQuePage=(e)=>{
    //     e.preventDefault()
    //     this.props.history.push('/QueDisplay')
    // }
  
    render(){
        if(localStorage.getItem("token")===null){
            return(
                <div>
                    {this.props.history.push('/login')}
                </div>
            )
        }
        else{
        var transition =this.state.transition?"transitionLeft":"transitionRight"
        return (
          
            <div className={transition} >
              <DashboardComponent
              Handletransition={this.Handletransition}
              getSearchNote={this.getSearchNote}
              listview={this.listview}
              dashTrashProps={this.trashPage}
              NotespropsToDashboardPage={this.NotespropsToDashboardPage}
              />
              <div id={transition} style={{display: "flex",justifyContent: "center"}}>
                  <Notes getNewNote={this.displayNote}
                  />
                  </div>
              <div className="getnote" id={transition}>
               
                  <Getnotes 
                  wrappedComponentRef={this.noteToCards}
                  searchNote={this.state.searchNote}
                  listview={this.state.listview}
                  trashPage={this.state.trash}
                  isNotes={this.state.isNotes}
                  isArchive={this.state.isArchive}
                  isReminder={this.state.isReminder}
                  isTrash={this.state.isTrash}
                //   RedirectToQuePage={this.RedirectToQuePage}
                  />
                  
              </div>
              {/* <div><Cards></Cards></div> */}
              {/* <div><DialogBox></DialogBox></div> */}
              {/* <div><ColorPickerField></ColorPickerField></div> */}
              
             
            </div>
        );
        }
    }
}
export default withRouter (Dashboard);
