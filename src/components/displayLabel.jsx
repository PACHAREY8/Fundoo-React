import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { showNoteByLabel, RemoveNoteLabel } from '../services/labelServices';
import { Card, IconButton, Tooltip, Input, Avatar, Chip, CardContent, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import MoreOptions from '../components/moreOptions';
import ImageUpload from '../components/imageUpload';
import Archive from '@material-ui/icons/ArchiveOutlined'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Reminder from '../components/remainder';
import CollaboratorComponent from '../components/collaborator';
import ColorPalette from '../components/colorPalette';
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
                "padding-left": 12,
                "padding-right": 12,
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
                "margin-left": "278px",
            },
            533 :{
                color: "darkslategray",
                "margin-left": "494px",
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
 class DisplayLabel extends Component {
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
            this.showLabel()
            
           
            
        })
        .catch(err=>{
            console.log("ERROR_WHILE_GETTING_NOTE_USING_LABLE",err);
            
        })
    
        
    }
  async  handleDeleteLabel (noteId,labelId,label)  {
    await  this.setState({
          noteId:noteId
      })
      console.log("Note_id_cheking",this.state.noteId,label,labelId);
       var remove={
           'noteId':noteId,
      'lableId':labelId,
   data :{
          'noteIdList':noteId,
          'label':label,
          
      }
  }
      RemoveNoteLabel(remove)
          .then(response => {
              console.log("Delete_label_Response", response);
              this.getNote()
          })
          .catch(err => {
              console.log("err in delete label", err);
          })
  }
    
    
    render() {
      var showLabelArr=this.state.data.map((label)=>{
          
      
            return ( 
              
               
            <div  onClick={this.handleOpen}>
                <div>
<MuiThemeProvider theme={thm}>
                    <div label={label.id} 
                    >
                        <Card className="take-note-user-card-description card-desc" 
                            // onChange={() => this.handleColorChanger(label.color, label.id)}
                            style={{ backgroundColor: label.color }}
                        >
                            <div>
                                <Input
                                    type="text"
                                    className="take-note-title"
                                    placeholder="Title"
                                    value={label.title}
                                    onClick={() => this.handleupdate(label.id, label.title, label.description)}
                                    multiline
                                    disableUnderline={true}
                                />
                            </div>
                            <div>
                                <Input
                                    className="take-note"
                                    rows="5"
                                    placeholder="Take a note"
                                    value={label.description}
                                    onClick={() => this.handleupdate(label.id, label.title, label.description)}
                                    multiline
                                    disableUnderline={true}
                                />
                            </div>
                            <div>
                                <MuiThemeProvider theme={thm}>
                                    {
                                        (label.collaborators.length > 0) &&
                                        <div>
                                            <Avatar>
                                                <span> {label.collaborators[0].firstName.toString().substring(0, 1) + label.collaborators[0].lastName.toString().substring(0, 1)}
                                                </span>
                                            </Avatar>
                                        </div>
                                    }
                                </MuiThemeProvider>
                            </div>
                            <br></br>
                            <div>
                                {
                                    (label.reminder.length > 0) ?
                                        <MuiThemeProvider theme={thm}>
                                            <div>
                                                <Chip
                                                    // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                                                    label={label.reminder.toString().substring(0, 24)}
                                                    onChange={this.handlereminder}
                                                    onDelete={() => this.handleDeleteReminder(label.id)}
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
                            <br></br>
                            <div className="noteDisplay">
                                            
   
                                            {
                                                (label.noteLabels.length > 0) ?
                                                label.noteLabels.map((printLabel) => {
                                                    return(
                                                    <MuiThemeProvider theme={thm}>
                                                        <div>
                                                            <Chip
                                                                // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                                                                label={printLabel.label}
                                                                onDelete={() => this.handleDeleteLabel(label.id,printLabel.id,printLabel.label)}
                                                                className="chipLabel"
                                                                variant="outlined"
                                                                size="medium"
                                                            />
                                                        </div>
                                                    </MuiThemeProvider>
                                                    )
                                                })
                                                    :
                                                    null
                                            
                                            
                                            
                                            }
                                            </div>
                            <br></br>
                            <div>
                            {
                                (label.imageUrl.length > 0) &&
                            <div>
                                
                                    <img src={url+label.imageUrl.toString()} alt="noteimage"></img>
                                
                            </div>
                            }
                            </div>
                            <div className="button-11">
                                <Tooltip title="Reminder"><div>
                                    <Reminder
                                        toolsPropsToReminder={this.handlereminder}
                                        noteID={label.id}>
                                    </Reminder>
                                </div></Tooltip>
                                <div>
                                    <CollaboratorComponent
                                        noteID={label.id}>
                                    </CollaboratorComponent>
                                </div>
                                <div>
                                    <ColorPalette
                                        PropsToColorpallete={this.handleColorChange}
                                        noteID={label.id}
                                    // reload={this.handleReload}
                                    >
                                    </ColorPalette>
                                </div>
                                <div
                                    onClick={() => this.handleArchive(label.id)}>
                                    <Archive></Archive>
                                </div>
                              
                                    <Tooltip title="addImage">
                                    <ImageUpload  sendImageProps={this.sendImageProps}>
                                    </ImageUpload>
                                    </Tooltip>
                             
                                <div>
                                    <MoreOptions
                                        PropsToDelete={this.handleTrash}
                                        noteID={label.id} 
                                        propsToEditor={()=>this.HandleEditor(label.id)}></MoreOptions>
                                </div>
                            </div>
                     
                            <CardContent>
{
    <div style={{display:"flex", flexDirection:"column-reverse"}}>
    {(label.questionAndAnswerNotes.length > 0) &&
    <div className="que-display" onClick={()=>this.RedirectToQuePage(label.id)} >
       
        <b className="quehead">
            Question Asked
        </b>
    
        <div className="quehead" 
      
        dangerouslySetInnerHTML={{ __html:label.questionAndAnswerNotes[label.questionAndAnswerNotes.length-1].message.toString().substring(4).slice(0,-5)}}>
           
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
            { (this.state.noteId === label.id) ? 
                <Dialog 
                open={this.state.open}
                onClose={this.handleupdate} >
                     
                    <div label={label.id} className="modaldisplay card-desc"
                        isOpen={this.state.oldState}
                        // className="modal card-desc"
                        // onChange={() => this.handleColorChanger(label.color, label.id)}
                        style={{ backgroundColor: label.color }}
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
                                            rows="5"
                                            name="description"
                                            value={this.state.description}
                                            onChange={this.handleChange}
                                            multiline
                                            disableUnderline={true}
                                        />
                                    </div>
                                    <div>
                                        <MuiThemeProvider theme={thm}>
                                            {
                                                (label.collaborators.length > 0) &&
                                                <div>
                                                    <Avatar>
                                                        <span> {label.collaborators[0].firstName.toString().substring(0, 1) + label.collaborators[0].lastName.toString().substring(0, 1)}
                                                        </span>
                                                    </Avatar>
                                                </div>
                                            }
                                        </MuiThemeProvider>
                                    </div>
                                    <br></br>
                                    <div>
                                        {
                                            (label.reminder.length > 0) ?
                                                <MuiThemeProvider theme={thm}>
                                                    <div>
                                                        <Chip
                                                            // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                                                            label={label.reminder.toString().substring(0, 24)}
                                                            onChange={this.handlereminder}
                                                            onDelete={() => this.handleDeleteReminder(label.id)}
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
                                    <br></br>
                            <div>
                            {(label.imageUrl.length > 0) &&
                            <div>
                                
                                    <img src={url+label.imageUrl.toString()} alt="noteimage"></img>
                                
                            </div>
                            }
                            </div>
                                    <br></br>
                                </DialogContent>
                            </MuiThemeProvider>
                            <DialogActions>
                                <div className="FullNote button-11">
                                    <div className="popupbuttonsGN">
                                    <IconButton>
                                        <Reminder
                                            toolsPropsToReminder={this.handlereminder}
                                            noteID={label.id}>
                                        </Reminder>
                                    </IconButton>
                                    <IconButton>
                                        <img
                                            src={require('../assets/images/collaborator.png')}
                                            alt="Collaborator"
                                        />
                                    </IconButton>
                                    <IconButton>
                                        <ColorPalette
                                            PropsToColorpallete={this.handleColorChange}
                                            noteID={label.id}
                                        >
                                        </ColorPalette>
                                    </IconButton>
                                    <IconButton
                                        onClick={() => this.handleArchive(label.id)}
                                    >  <Archive></Archive>
                                    </IconButton>
<IconButton>
                                    <Tooltip title="addImage">
                                    <ImageUpload  sendImageProps={this.sendImageProps}>
                                    </ImageUpload>
                                    </Tooltip>
                                    </IconButton>
                                    <IconButton >
                                        <MoreOptions
                                            PropsToDelete={this.handleTrash}
                                            noteID={label.id}
                                            propsToEditor={this.HandleEditor}
                                        
                                          ></MoreOptions>
                                    </IconButton>
                                </div>
                                <div>
                                    <IconButton
                                        onClick={this.handleupdate}><b>Close</b>
                                    </IconButton>
                                </div>
                            </div>
                            </DialogActions>
                    </div>
                    {/* </Card> */}
                   
                </div>
                )
                           
            </Dialog>
            : null}
            </MuiThemeProvider>
                        
            </div >
             
                 )
        })
return (
   
            <div style={{
                "width": "74%",
                "display": "flex",
                "flex-wrap": "wrap",
                "justify-content": "space-evenly",
                "margin-left": "20%",
                "margin-top": "4%",
            }}>
              {showLabelArr}
                       </div>
               
        )
  
    }
}
export default withRouter(DisplayLabel)
