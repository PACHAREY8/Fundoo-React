import React, { Component } from 'react';
import ColorPalette from './colorPalette'
import { createNote } from '../services/noteServices'
import { InputBase, IconButton, Card, Button, Tooltip, Chip } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import MoreOptions from '../components/createMoreOption'
import Reminder from '../components/remainder'
import ImageUpload from './imageUpload';
// const url = "http://34.213.106.173/"
const thm = createMuiTheme({
    overrides: {
        MuiPaper: {
            root: {
                width: 385,
            },
            rounded: {
                width: 148,
                height: 111,
                "border-radius": "11px",
            }
        }
    },
});
class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openNote: false,
            title: "",
            description: "",
            color: "",
            newNote: {},
            reminder: "",
            isArchived: false,
            imageUrl: [],
            labelIdList:""
        }
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.sendImageProps = this.sendImageProps.bind(this);
    }
    handleToggle = (e) => {
        try {
            this.setState({
                openNote: !this.state.openNote,
            });
            console.log("handle toggle image while creation", this.state.imageUrl);
            if (this.state.title !== '' || this.state.description !== '' || this.state.color !== '' || this.state.labelIdList !== '') {
                const data = {
                    imageUrl: this.state.imageUrl,
                    title: this.state.title,
                    description: this.state.description,
                    color: this.state.color,
                    reminder: this.state.reminder,
                    isArchived: this.state.isArchived,
                    labelIdList:[this.state.labelIdList]
                }
                console.log("image state checking==>", this.state.imageUrl);
                let formData = new FormData();
                formData.append('imageUrl', this.state.imageUrl)  //formdata object
                formData.append('title', this.state.title);   //append the values with key, value pair
                formData.append('description', this.state.description);
                formData.append('color', this.state.color);
                formData.append('labelIdList', this.state.labelIdList);
                formData.append('reminder', this.state.reminder);
                formData.append('isArchived', this.state.isArchived)
                // console.log("image state checking==>", this.state.imageUrl);
                console.log("create===>", formData);
                createNote(data)
                    .then(result => {
                        this.setState({
                            newNote: result.data.status.details
                        })
                        console.log("Created Note.........", this.state.newNote);
                        this.props.getNewNote(this.state.newNote)
                    })
                    .catch((error) => {
                        alert(error);
                    })
            }
        }
        catch{
            console.log("error in  creation")
        }
    }
    handleNotes = () => {
        this.setState({
            openNote: true,
            title: "",
            description: "",
            color: "",
            labelIdList: "",
            open: false,
            reminder: "",
            imageUrl: ""
        })
    }
    handleTitle = (event) => {
        this.setState({ title: event.target.value })
    }
    handleDescription = (event) => {
        this.setState({ description: event.target.value })
    }
    handlecolor = (value) => {
        this.setState({
            color: value
        })
    }
    // handlereminder = (value) => {
    //     this.setState({ reminder: value })
    // }
    handleArchive = () => {
        this.setState({ isArchived: true });
        console.log("archieve create Check", this.state.isArchived);
    }
    handleDeletereminder = () => {
        this.setState({
            reminder: ''
        })
    }
    handleReminder = (reminderdate) => {
        this.setState({ reminder: reminderdate })
    }
    async sendImageProps(file) {
        await this.setState({
            imageUrl: file.toString()
        })
        console.log("image in create notes", this.state.imageUrl)
    }
    render() {
        console.log("render image in create notes", this.state.imageUrl)
        return (!this.state.openNote ?
            <div className="first-div-Create"
            >
                <Card className="Mainnotes" style={{width: "600px","margin-top": "20%"}} >
                    <div className="Notemainnn">
                        <div>
                            <InputBase className="noteiinput"
                                multiline
                                placeholder="Take a Note....."
                                spellCheck={true}
                                onClick={this.handleNotes}
                            >
                            </InputBase>
                        </div>
                        <div><img src={require('../assets/images/note_add.svg')} alt=" note_add Icon"></img>
                        </div>
                    </div>
                </Card>
            </div>
            :
            <div>
                <Card className="notes card-desc" style={{ backgroundColor: this.state.color,width: "600px","margin-top": "20%" }} >
                    <div className="Notemain">
                        <div>
                            <InputBase className="noteinput"
                                type="text"
                                multiline
                                spellCheck={true}
                                placeholder="Title"
                                value={this.state.title}
                                onChange={this.handleTitle}
                                onfocus=" "
                            >
                            </InputBase>
                        </div>
                        <div>
                            <InputBase className="noteinput"
                                type="text"
                                multiline
                                spellCheck={true}
                                placeholder="Take a Note....."
                                value={this.state.description}
                                onChange={this.handleDescription}
                                onfocus=" ">
                            </InputBase>
                        </div>
                        <div>
                            {
                                (this.state.reminder.length > 0) ?
                                    <MuiThemeProvider theme={thm}>
                                        <div>
                                            <Chip
                                                // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                                                label={this.state.reminder.toString().substring(0, 24)}
                                                onChange={this.handleremainder}
                                                onDelete={() => this.handleDeletereminder()}
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
{/* 
                        <div className="noteDisplay">
                            {
                                (this.noteLabels.length > 0) ?
                                    key.noteLabels.map((printLabel) => {
                                        return (
                                            <MuiThemeProvider theme={thm}>
                                                <div className="chipDisp">
                                                    <Chip
                                                        // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                                                        label={printLabel.label}
                                                        onDelete={() => this.handleDeleteLabel(key.id, printLabel.id, printLabel.label)}
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
                        </div> */}
                        <div>
                            {
                                (this.state.imageUrl.length > 0) &&
                                <div>
                                    <img src={this.state.imageUrl} alt="noteimage"></img>
                                </div>
                            }
                        </div>
                        <div>
                            <div className="button-8">
                                <Tooltip title="Remind Me">
                                    <IconButton>
                                        <Reminder toolsPropsToReminder={this.handleremainder}>
                                            <img src={require('../assets/images/remindMe.png')} alt="Remind Me Icon"></img>
                                        </Reminder>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="colaborator" >
                                    <IconButton>
                                        <img src={require('../assets/images/collaborator.png')} alt="collaborator Icon"></img>
                                    </IconButton>
                                </Tooltip>
                                <MuiThemeProvider> <Tooltip title="color">
                                    <IconButton>
                                        <ColorPalette
                                            PropsToColorpallete={this.handlecolor}
                                            noteID={""}
                                        >
                                        </ColorPalette>
                                    </IconButton>
                                </Tooltip>
                                </MuiThemeProvider>
                                <Tooltip title="Add Image">
                                    <IconButton>
                                        <div>
                                            <ImageUpload sendImageProps={this.sendImageProps}>
                                            </ImageUpload>
                                        </div>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Archive">
                                    <IconButton onClick={this.handleArchive}>
                                        <img src={require('../assets/images/menuArchive.svg')} alt="archivve">
                                        </img>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="More">
                                    
                                        <MoreOptions
                                        >
                                        </MoreOptions>
                                </Tooltip>
                                <Button onClick={this.handleToggle}><b>Close</b></Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}
export default Notes;