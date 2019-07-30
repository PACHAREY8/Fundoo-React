import React, { Component } from 'react'
import DashboardComponent from '../components/dashboardComponent';
import Notes from '../components/createNotes';
import { withRouter } from 'react-router-dom'
import { showNoteByLabel } from '../services/labelServices';
import DisplayLabel from '../components/displayLabel'
 class UserLabel extends Component {
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
            data:[]
        }
        this.noteToCards = React.createRef()
        this.getSearchNote=this.getSearchNote.bind(this)
        this.displayNote=this.displayNote.bind(this)
    }
    componentDidMount(){
        this.showLabel()
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
    showLabel=()=>{
        var show=window.location.pathname
        var llabel=show.substring(11)
        console.log("sgahjgshgaws",show,llabel);
          
        var data={
            'labelName':llabel
        }
        showNoteByLabel(data,llabel)
        .then(response=>{
            console.log("RESPONSE_fROM_sHOW_LABEL",response);
            this.setState({
                data:response.data.data.data
            })
            console.log("data inside response",this.state.data);
            
           
            
        })
        .catch(err=>{
            console.log("ERROR_WHILE_GETTING_NOTE_USING_LABLE",err);
            
        })
    
        
    }
    
    render() {
        console.log("most wanted props from drawer",this);
        
        return (
            <div>
                <div>
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
              <div className="getnote">
              
                  <DisplayLabel 
                //   labelSearch={this.props.location.state}
                  wrappedComponentRef={this.noteToCards}
                //   searchNote={this.state.searchNote}
                  listview={this.state.listview}
                  trashPage={this.state.trash}
                  isNotes={this.state.isNotes}
                  isArchive={this.state.isArchive}
                  isReminder={this.state.isReminder}
                  isTrash={this.state.isTrash}
                //   RedirectToQuePage={this.RedirectToQuePage}
                  />
                  </div>
                
            </div>
        )
    }
}
export default withRouter(UserLabel)