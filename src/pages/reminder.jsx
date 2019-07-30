import React, { Component } from 'react'
import ReminderComponent from '../components/reminderComponent'
import DashboardComponent from '../components/dashboardComponent';
import {withRouter} from 'react-router-dom';
import Notes from '../components/createNotes';
 class Reminder extends Component {
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
           
        }
        getSearchNote=(value)=>{
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
   
    render() {
        return (
            <div>
                  <div  >
              <DashboardComponent
              Handletransition={this.Handletransition}
              getSearchNote={this.getSearchNote}
              listview={this.listview}
              dashTrashProps={this.trashPage}
              NotespropsToDashboardPage={this.NotespropsToDashboardPage}
              />
             </div>
             <div>
                  <Notes getNewNote={this.displayNote}
                  />
                  </div>
             <div>
              <ReminderComponent
                  listview={this.state.listview}
                  isArchive={this.state.isArchive}
                isReminder={this.state.isReminder}
                isTrash={this.state.isTrash}
                searchNote={this.state.searchNote}
                ></ReminderComponent>
                </div>
            </div>
        )
    }
 }
export default withRouter(Reminder)