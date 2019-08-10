import React, { Component } from 'react';
import   {DeleteNotePermanent,updateTitle,trashNotes, removeremainder}   from '../services/noteServices'
import { Input, IconButton, Card, Avatar, Chip, CardContent, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
// import Delete from '@material-ui/icons/DeleteForever'
import  {getTrashNotes}  from '../services/NavigationBarServices';
import {withRouter} from 'react-router-dom';
const url = "http://34.213.106.173/"
const thm = createMuiTheme({
    overrides: {
        MuiCard: {
            root: {
                width: 385,
                "margin-top": 110
            }
        },
        MuiInput: {
            root: {
                position: "relative",
                display: "flex",
                "margin-left": 21,
            }
        }
        ,
        MuiChip: {
            label: {
                "align-items": "center",
                "user-select": "none",
                "white-space": "nowrap",
                "font-size": "larger",
            },
        },
        MuiPaper: {
            rounded: {
                "border-radius": 13,
            }
        },
        MuiAvatar: {
            colorDefault: {
                color: "darkslategray",
                "background-color": "lightgrey",
            },
            533 :{
                color: "darkslategray",
                "background-color": "lightgrey"
            },
        },
        MuiDialogTitle: {
            root: {
                "margin-top": 47,
            }
        },
        MuiDialogContent: {
            root: {
                "padding-left": "24px",
                height: "192px",
                width: "539px",
                overflow: "Hidden",
                "overflow-y": "Hidden",
            }
        },
        MuiDialog: {
            paper: {
                margin: "48px",
                position: "relative",
                "overflow-y": "Hidden",
            }
        }
    }
});
function searchingFor(search) {
    return function (x) {
        return x.title.includes(search) || x.description.includes(search)
    }
}
 class TrashComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            note: [],
            title: "",
            description: "",
            noteId: "",
            oldState: false,
            isDeleted: true,
            isArchived: false,
            color: "",
            search: [],
            label: "",
            reminder: "",
        }
    }
    componentDidMount(){
        
        getTrashNotes()
            .then(response => {
                console.log("responsee  from trash", response)
                this.setState({
                    note:response.data.data.data
                })
                console.log("final destination Trash",this.state.note);
                
              
            })
            .catch((error) => {
                console.log(error)
                alert("catch error in trash", error)
            });
    }
    getNote=()=>{
        getTrashNotes()
        .then(response => {
            console.log("responsee  from trash", response)
            this.setState({
                note:response.data.data.data
            })
            console.log("final destination Trash",this.state.note);
            
          
        })
        .catch((error) => {
            console.log(error)
            alert("catch error in trash", error)
        });
    }
    handleupdate = (id, oldTitle, OldDescription) => {
        this.setState(Old => ({
            oldState: !Old.oldState,
            noteId: id,
            title: oldTitle,
            description: OldDescription
        }));
        if (this.state.oldState && (this.state.title !== null || this.state.description !== null)) {
            var data = {
                'noteId': this.state.noteId,
                'title': this.state.title,
                'description': this.state.description
            }
            let formData = new FormData();    //formdata object
            formData.append('noteId', this.state.noteId);
            formData.append('title', this.state.title);   //append the values with key, value pair
            formData.append('description', this.state.description);
            updateTitle(data)
                .then(response => {
                    console.log(response, "data updated");
                })
                .catch(err => {
                    alert("Error in updation", err)
                })
        }
    }
  
    handleDelete = (noteId) => {
        const data = {
            noteIdList: [noteId],
            isDeleted: this.state.isDeleted
        }
console.log("data in trash",this.state.note);
        console.log("Itemm to be deleted", data);
        DeleteNotePermanent(data)
            .then(response => {
                console.log("responsee  from delete Note", response)
                this.getNote()
              
            })
            .catch((error) => {
                console.log(error)
                alert("catch error in deletePermanent", error)
            });
    }
    handleTrash =(noteId)=>{
        // this.setState({
        //     isDeleted:false
        // })
 
console.log("delete check in getnotes",this.state.isDeleted);
         const data = {
            noteIdList: [noteId],
            isDeleted: false
                }
        console.log("Itemm to be deleted", data);
         trashNotes(data)
            .then(response => {
                console.log("responsee", response)
                this.getNote()
            })
            .catch((error) => {
                console.log(error)
                alert("catch ", error)
            });
    }
    handleOpen=()=>{
        this.setState({open:!this.state.open})
    }
  
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    RedirectToQuePage=(noteId)=>{
        // e.preventDefault();
        this.props.history.push('/QueDisplay',noteId)
    }
    handleDeleteReminder = (noteId) => {
        var data = {
            'noteIdList': [noteId],
            'reminder': ""
        }
        removeremainder(data)
            .then(response => {
                console.log("Delete Reminder", response);
                this.getNote()
            })
            .catch(err => {
                console.log("errin delete remainder", err);
            })
        }
    render() {
        // console.log(this.props.note);
        
        const listview = this.props.listview ? "list-view" : null;
        var notearr = this.state.note.filter(searchingFor(this.props.searchNote)).map((key) => {
            return ( 
               (key.isDeleted===true) &&
            
               <div  onClick={this.handleOpen}>
               <div>
               <MuiThemeProvider theme={thm}>
                   <div key={key.id} 
                   >
                       <Card className="take-note-user-card-description card-desc" id={listview}
                           // onChange={() => this.handleColorChanger(key.color, key.id)}
                           style={{ backgroundColor: key.color }}
                       >
                           <div>
                               <Input
                                   type="text"
                                   className="take-note-title"
                                   placeholder="Title"
                                   value={key.title}
                                   onClick={() => this.handleupdate(key.id, key.title, key.description)}
                                   multiline
                                   disableUnderline={true}
                               />
                           </div>
                           <div>
                               <Input
                                   className="take-note"
                                   placeholder="Take a note"
                                   value={key.description}
                                   onClick={() => this.handleupdate(key.id, key.title, key.description)}
                                   multiline
                                   disableUnderline={true}
                               />
                           </div>
                           <div className="chip_adjust">
                           <div>
                               <MuiThemeProvider theme={thm}>
                                   {
                                       (key.collaborators.length > 0) &&
                                       <div>
                                           <Avatar>
                                               <span> {key.collaborators[0].firstName.toString().substring(0, 1) + key.collaborators[0].lastName.toString().substring(0, 1)}
                                               </span>
                                           </Avatar>
                                       </div>
                                   }
                               </MuiThemeProvider>
                           </div>
                           <br></br>
                           <div>
                               {
                                   (key.reminder.length > 0) ?
                                       <MuiThemeProvider theme={thm}>
                                           <div>
                                               <Chip
                                                   // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                                                   label={key.reminder.toString().substring(0, 24)}
                                                   onChange={this.handleremainder}
                                                   onDelete={() => this.handleDeleteReminder(key.id)}
                                                   className="chipRem"
                                                   variant="outlined"
                                                   size="medium"
                                               />
                                           </div>
                                       </MuiThemeProvider>
                                       :
                                       null
                               }
                           </div>
                           </div>
                           <br></br>
                           <div>
                           {
                               (key.imageUrl.length > 0) &&
                           <div>
                               
                                   <img src={url+key.imageUrl.toString()} alt="noteimage"></img>
                               
                           </div>
                           }
                           </div>
                           <div className="TrashedData">
<div>
    <IconButton onClick={()=>this.handleDelete(key.id)} >
        <img src={require('../assets/images/DeleteP.svg')} alt="delete"></img>
    </IconButton>
</div>
<div>
    <IconButton onClick={()=>{this.handleTrash(key.id)}}>
        <img src={require('../assets/images/restore.svg')} alt="restore"></img>
    </IconButton>
</div>
</div>
<CardContent>
{
    <div style={{display:"flex", flexDirection:"column-reverse"}}>
    {(key.questionAndAnswerNotes.length > 0) &&
    <div className="que-display" onClick={()=>this.RedirectToQuePage(key.id)} >
       
        <b className="quehead">
            Question Asked
        </b>
    
        <div className="quehead" 
      
        dangerouslySetInnerHTML={{ __html:key.questionAndAnswerNotes[key.questionAndAnswerNotes.length-1].message.toString().substring(4).slice(0,-5)}}>
           
         </div>
       
    </div>}
    </div>
}
</CardContent>
                       </Card>
                   </div>
               </MuiThemeProvider>
           </div>
           <MuiThemeProvider theme={thm}>
           { (this.state.noteId === key.id) ? 
               <Dialog 
               open={this.state.open}
               onClose={this.handleupdate} >
                    
                   <div key={key.id} className="modaldisplay card-desc"
                       isOpen={this.state.oldState}
                       // className="modal card-desc"
                       // onChange={() => this.handleColorChanger(key.color, key.id)}
                       style={{ backgroundColor: key.color }}
                       toggle={this.handleupdate} >
                       {/* <Card */}
                       <div className="Modal_body" >
                           <MuiThemeProvider theme={thm}>
                               <DialogTitle>
                                   <div toggle={this.handleupdate}>
                                       <Input
                                           className="FullNoteTitle"
                                           placeholder="Title"
                                           name="title"
                                           value={this.state.title}
                                           onChange={this.handleChange}
                                           multiline
                                           disableUnderline={true}
                                       />
                                   </div>
                               </DialogTitle>
                           </MuiThemeProvider>
                           <MuiThemeProvider theme={thm}>
                               <DialogContent>
                                   <div>
                                       <Input
                                           className="FullNote"
                                           placeholder="Take a note"
                                           name="description"
                                           value={this.state.description}
                                           onChange={this.handleChange}
                                           multiline
                                           disableUnderline={true}
                                       />
                                   </div>
                                   <div className="chip_adjust">
                                   <div>
                                       <MuiThemeProvider theme={thm}>
                                           {
                                               (key.collaborators.length > 0) &&
                                               <div>
                                                   <Avatar>
                                                       <span> {key.collaborators[0].firstName.toString().substring(0, 1) + key.collaborators[0].lastName.toString().substring(0, 1)}
                                                       </span>
                                                   </Avatar>
                                               </div>
                                           }
                                       </MuiThemeProvider>
                                   </div>
                                   <br></br>
                                   <div>
                                       {
                                           (key.reminder.length > 0) ?
                                               <MuiThemeProvider theme={thm}>
                                                   <div>
                                                       <Chip
                                                           // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                                                           label={key.reminder.toString().substring(0, 24)}
                                                           onChange={this.handleremainder}
                                                           onDelete={() => this.handleDeleteReminder(key.id)}
                                                           className="chipRem"
                                                           variant="outlined"
                                                           size="medium"
                                                       />
                                                   </div>
                                               </MuiThemeProvider>
                                               :
                                               null
                                       }
                                   </div>
                                   </div>
                                   <br></br>
                           <div>
                           {(key.imageUrl.length > 0) &&
                           <div>
                               
                                   <img src={url+key.imageUrl.toString()} alt="noteimage"></img>
                               
                           </div>
                           }
                           </div>
                                   <br></br>
                               </DialogContent>
                           </MuiThemeProvider>
                           <DialogActions>
                           <div className="TrashedData">
<div>
    <IconButton onClick={()=>this.handleDelete(key.id)} >
        <img src={require('../assets/images/DeleteP.svg')} alt="delete"></img>
    </IconButton>
</div>
<div>
    <IconButton onClick={()=>{this.props.handleTrash(key.id,false)}}>
        <img src={require('../assets/images/restore.svg')} alt="restore"></img>
    </IconButton>
</div>
</div>
                           </DialogActions>
                   </div>
                   <CardContent>
                                          {
                                              <div style={{display:"flex", flexDirection:"column-reverse"}}>
                                              {(key.questionAndAnswerNotes.length > 0) &&
                                              <div className="que-display" onClick={()=>this.RedirectToQuePage(key.id)} >
                                                 
                                                  <b className="quehead">
                                                      Question Asked
                                                  </b>
                                              
                                                  <div className="quehead" 
                                                
                                                  dangerouslySetInnerHTML={{ __html:key.questionAndAnswerNotes[key.questionAndAnswerNotes.length-1].message.toString().substring(4).slice(0,-5)}}>
                                                     
                                                   </div>
                                                 
                                              </div>}
                                              </div>
                                          }
                                  </CardContent>
               </div>
               )
                          
           </Dialog>
           : null}
           </MuiThemeProvider>
                       
           </div >
                   )
        })
        return (
            <div className="trash_notes">
                {notearr}
            </div>
        )
    }
}
export default withRouter(TrashComponent)
