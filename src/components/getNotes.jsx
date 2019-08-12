import React, { Component } from 'react';
import { getNotes, updateTitle, archiveNote, colorChange, setremainder, trashNotes, removeremainder } from '../services/noteServices'
import ColorPalette from '../components/colorPalette'
import { Input, IconButton, Card, Tooltip, Chip, Dialog, Avatar, DialogTitle, DialogActions, DialogContent, CardContent,  } from '@material-ui/core';
import MoreOptions from './moreOptions'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Archive from '@material-ui/icons/ArchiveOutlined'
import Reminder from '../components/remainder'
import ReminderComponent from './reminderComponent'
import ArchiveComponent from './archiveComponent';
import TrashComponent from './trashComponent';
import CollaboratorComponent from './collaborator';
import ImageUpload from './imageUpload';
import {withRouter} from 'react-router-dom';
import {  RemoveNoteLabel } from '../services/labelServices';
// import Seaching from '../components/searchComponent'
const url = "http://34.213.106.173/"
const thm = createMuiTheme({
    overrides: {
        MuiCard: {
            root: {
                width: "385px",
              
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
                // "white-space": "nowrap",
                "margin-left": "2px",
                // "padding-right": 12,
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
                // "margin-left": "278px",
            },
            533 :{
                color: "darkslategray",
                // "margin-left": "494px",
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
        },
        MuiCardContent:{
            root:{
                last:{
                    child:{
                        "padding-bottom": "17px"
                    }


            }

        }
    }

    }
});

function searchingFor(search) {
    return function (x) {
        return x.title.includes(search) || x.description.includes(search)
    }
}
 class Getnotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            note: [],
            title: "",
            description: "",
            noteId: "",
            oldState: false,
            isDeleted: true,
            isArchived: true,
            color: "",
            search: [],
            reminder: "",
            imageUrl:[],
            label:[]
            
        }
        this.displayNewCard = this.displayNewCard.bind(this)
        this.sendImageProps = this.sendImageProps.bind(this)
    }
    componentDidMount(){
    this.getNote()
        
    }
    getNote=()=>{
        getNotes()
            .then(result => {
                
                this.setState({
                    note: result.data.data.data,
                })
                console.log(" all note data==>", this.state.note);
            },
                error => {
                    console.log(error);
                }); 
    }
   async  sendImageProps(value){
         console.log("get value from image upoad",value);
         
        //  var file=value.toString();
     await   this.setState({
        imageUrl:value.toString()
        })
        console.log("sendimage props value in getnotes",this.state.imageUrl);
        
    }
   handleupdate = (id, oldTitle, OldDescription) => {
        console.log("sendimage props value in getnotes",this.state.imageUrl);
        // console.log("props from imageupload",this.props.sendImageProps);
        
        this.setState(Old => ({
            oldState: !Old.oldState,
            noteId: id,
            title: oldTitle,
            description: OldDescription,
            imageUrl: this.state.imageUrl
        }));
        if (this.state.oldState && (this.state.title !== null || this.state.description !== null || this.state.imageUrl!=="")) {
            var data = {
                'noteId': this.state.noteId,
                'title': this.state.title,
                'description': this.state.description,
                'imageUrl': this.state.imageUrl
            }
            let formData = new FormData();    //formdata object
            formData.append('noteId', this.state.noteId);
            formData.append('imageUrl',this.state.imageUrl) 
            formData.append('title', this.state.title);   //append the values with key, value pair
            formData.append('description', this.state.description);
            // formData.append('noteId', this.state.noteId);
// console.log("FORMDATA_IN_GETNOTES",formData);
            updateTitle(data)
                .then(response => {
                    console.log(response, "data updated");
                    this.getNote()
                })
                .catch(err => {
                    alert("Error in updation", err)
                })
        }
    }
    // sendImageProps=(value)=>{
    //     this.setState({
    //         imageUrl:value
    //     })
    //     console.log("get image value",this.state.imageUrl);
    handleColorChange = (value, noteId) => {
        console.log("color value", value);
        console.log("Find Color NoteId ", noteId);
        this.setState({
            color: value
        })
        console.log("color state", this.state.color);
        var data = {
            noteIdList: [noteId],
            color: value,
        }
        console.log("note data in color==>", data);
     colorChange(data)
            .then(response => {
                console.log("Color resp", response);
               this.getNote()
                // this.setState({
                //     note:this.state.color
                // })
                // alert("Color Changes Successfully", response)
            })
            .catch(err => {
                alert("Error in Color Change", err)
            })
    }
     handleTrash =(noteId)=>{
        this.setState({
            isDeleted:true
        })
 
console.log("delete check in getnotes",this.state.isDeleted);
         const data = {
            noteIdList: [noteId],
            isDeleted: this.state.isDeleted
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
    handleToggleOpen = () => {
        this.setState({ open: !this.state.open })
    }
    handleToggleClose = () => {
        this.setState({ open: this.state.open })
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleArchive = (noteId, isArchived) => {
        console.log("archive note id ", noteId);
        this.setState({ isArchived: isArchived });
        console.log("archieve state..", this.state.isArchived);
        if (this.state.isArchived === true) {
            var data = {
                'noteIdList': [noteId],
                'isArchived': isArchived,
            }
            archiveNote(data)
                .then(response => {
                    console.log("archive services==>", response);
                    // alert("Archive Successfully")
                    this.getNote()
                })
                .catch(err => {
                    console.log("Eroorrrrrr....", err);
                    alert("Error While Archiving")
                })
        }
    }
    displayNewCard(newCard){
        console.log("kjdfhdrkjshkrjsk..", newCard);
        this.setState({
            note: [...this.state.note, newCard]
        })
        console.log(this.state.note);
    }
    handlereminder = (remainderdate, noteId) => {
        this.setState({
            reminder: remainderdate,
        })
        console.log("remainder ==> ", this.state.reminder);
        var data = {
            'noteIdList': [noteId],
            'reminder': remainderdate,
        }
        setremainder(data)
            .then(response => {
                console.log("remainder response", response.config.data)
                this.setState({
                    reminder: response.config.data
                })
                // this.props.remimderToReminderComponent(this.state.reminder)
                console.log("reminder after api hitting....", this.state.reminder);
this.getNote()
            })
            .catch(err => {
                console.log(err);
            })
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
    // QuePropsToAllNotes = (value) => {
    //     console.log("quevalue...at getnotes", value);
    // }
 
    RedirectToQuePage=(noteId)=>{
        // e.preventDefault();
        this.props.history.push('/QueDisplay',noteId)
    }
    HandleEditor=(noteId)=>{
        this.props.history.push('/editorComponent',noteId)
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
        console.log("FORMDATA_IN_GETNOTES",this.formData);
        const listview = this.props.listview ? "list-view" : null;
        var notearr = this.state.note.filter(searchingFor(this.props.searchNote)).map((key) => {
            // console.log("notekeyyyyy label==>",key.noteLabels);
            return ((((key.isArchived === false)
                && (key.isDeleted === false))
                &&
                <div>
                    <div onClick={this.handleToggleOpen}>
                        <MuiThemeProvider theme={thm}>
                            <div key={key.id} 
                            >
                                <Card className="take-note-user-card-description card-desc" id={listview}  
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
                                                    <div className="rem-Chip">
                                                        <Chip
                                                            // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                                                            label={key.reminder.toString().substring(0, 24)}
                                                            onChange={this.handlereminder}
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
<br></br>
                                    <div className="noteDisplay">
{
    (key.noteLabels.length > 0) ?
    key.noteLabels.map((printLabel) => {
        return(
            (printLabel.isDeleted===false)&&
        <MuiThemeProvider theme={thm}>
            <div className="chipDisp">
                <Chip
                    // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                    label={printLabel.label}
                    onDelete={() => this.handleDeleteLabel(key.id,printLabel.id,printLabel.label)}
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
                                    <div className="button-11">
                                    <MuiThemeProvider>
                                        <Tooltip title="Reminder"><div>
                                            <Reminder
                                                toolsPropsToReminder={this.handlereminder}
                                                noteID={key.id}>
                                            </Reminder>
                                        </div>
                                        </Tooltip>
                                        <Tooltip title="Collaborator">
                                        <div>
                                            <CollaboratorComponent
                                            noteID={key.id}
                                                collaborators={key.collaborators}>
                                            </CollaboratorComponent>
                                        </div>
                                        </Tooltip>
                                        <Tooltip title="Color">
                                        <div>
                                            <ColorPalette
                                                PropsToColorpallete={this.handleColorChange}
                                                noteID={key.id}
                                            // reload={this.handleReload}
                                            >
                                            </ColorPalette>
                                        </div>
                                        </Tooltip>
                                        <Tooltip title="Archive">
                                        <div
                                            onClick={() => this.handleArchive(key.id, true)}>
                                            <Archive></Archive>
                                        </div>
                                        </Tooltip>
                                            <Tooltip title="addImage">
                                            <ImageUpload  sendImageProps={this.sendImageProps}>
                                            </ImageUpload>
                                            </Tooltip>
                                            <Tooltip title="More">
                                        <div>
                                            <MoreOptions
                                                PropsToDelete={this.handleTrash}
                                                noteID={key.id} 
                                                propsToEditor={()=>this.HandleEditor(key.id)}
                                               
                                                ></MoreOptions>
                                        </div>
                                        </Tooltip>
                                        </MuiThemeProvider>
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
                                                          
                                                             
dangerouslySetInnerHTML={{ __html:key.questionAndAnswerNotes[key.questionAndAnswerNotes.length-1].message.toString().substring(3).slice(0,-4)}}>
                                                               
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
                        <Dialog open={this.state.open}
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
                                                                <span> {key.collaborators.firstName.toString().substring(0, 1) + key.collaborators.lastName.toString().substring(0, 1)}
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
                                                            <div className="rem-Chip">
                                                                <Chip
                                                                    // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                                                                    label={key.reminder.toString().substring(0, 24)}
                                                                    onChange={this.handlereminder}
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
                                            <br></br>
                                            <div className="noteDisplay">
                                            
   
{
    (key.noteLabels.length > 0) ?
    key.noteLabels.map((printLabel) => {
        return(
            (printLabel.isDeleted===false)&&

        <MuiThemeProvider theme={thm}>
            <div>
                <Chip
                    // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                    label={printLabel.label}
                    onDelete={() => this.handleDeleteLabel(key.id,printLabel.id,printLabel.label)}
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
                                        <div className="FullNote button-11">
                                           
                                            <div className="popupbuttonsGN">
                                            <Tooltip title="Reminder">
                                                <Reminder
                                                    toolsPropsToReminder={this.handlereminder}
                                                    noteID={key.id}>
                                                </Reminder>
                                                </Tooltip>
                                                <Tooltip title="Collaborator">
                                        <div>
                                            <CollaboratorComponent
                                            noteID={key.id}
                                                collaborators={key.collaborators}>
                                            </CollaboratorComponent>
                                        </div>
                                        </Tooltip>
                                            <Tooltip title="Color">
                                                <ColorPalette
                                                    PropsToColorpallete={this.handleColorChange}
                                                    noteID={key.id}
                                                >
                                                </ColorPalette>
                                                </Tooltip>
                                                <Tooltip title="Archive">
                                            <IconButton
                                                onClick={() => this.handleArchive(key.id, true)}
                                            >  <Archive></Archive>
                                            </IconButton>
                                            </Tooltip>
                                            <Tooltip title="addImage">
                                            <ImageUpload  sendImageProps={this.sendImageProps}>
                                            </ImageUpload>
                                            </Tooltip>
                                            <Tooltip title="More">
                                                <MoreOptions
                                                    PropsToDelete={this.handleTrash}
                                                    noteID={key.id}
                                                    propsToEditor={()=>this.HandleEditor(key.id)}
                                                
                                                  ></MoreOptions>
                                                  </Tooltip>
                                        </div>
                                        <div>
                                        <Tooltip title="Close">
                                            <IconButton
                                                onClick={this.handleupdate}><b>Close</b>
                                            </IconButton>
                                            </Tooltip>
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
                                                          
                                                             
dangerouslySetInnerHTML={{ __html:key.questionAndAnswerNotes[key.questionAndAnswerNotes.length-1].message.toString().substring(3).slice(0,-4)}}>
                                                               
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
                  
            )
    })
    return(
            (this.props.isNotes === true) ?
    <div className="allcards" >
        {notearr}
    </div>
    :
    null
        ||
        ((this.props.isReminder === true) && (this.props.isArchive === false) && (this.props.isTrash === false)) ?
        <div>
            <ReminderComponent
                handleArchive={this.handleArchive}
                note={this.state.note}
                reminder={this.state.reminder}
            />
        </div>
        :
        null
            ||
            ((this.props.isReminder === false) && (this.props.isArchive === true) && (this.props.isTrash === false)) ?
            <div>
                <ArchiveComponent
                    handleArchive={this.handleArchive}
                    note={this.state.note}
                />
            </div>
            :
            null
                ||
                ((this.props.isReminder === false) && (this.props.isArchive === false) && (this.props.isTrash === true)) ?
                <div >
                    <TrashComponent
                        note={this.state.note}
                        handleTrash={this.handleTrash}
                    >
                    </TrashComponent>
                </div>
                :
                null
        )
    }
}
export default withRouter(Getnotes)
