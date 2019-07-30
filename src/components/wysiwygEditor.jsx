import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { DialogActions, Button, DialogContent, DialogTitle,  Card } from '@material-ui/core';
import { QuesnAnsCreate } from '../services/queansServices';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { getNotes } from '../services/noteServices'
import { withRouter } from 'react-router-dom';
const theme = createMuiTheme({
    overrides: {
        MuiDialog: {
            paper: {
                margin: 303,
                position: 'relative'
            },
            paperWidthSm: {
                width: 914,
                "max- height": "800px",
                "min- height": "373px",
                "border-radius": 19,
                "max-width": 931
            },
            container: {
                413: {
                    outline: "none",
                    "max-height": "800px",
                    "min-height": "300px",
                }
            }
        },
        MuiCard: {
            root: {
                "overflow": "hidden",
                "width": "1122px",
                "margin-left": "324px",
                "margin-top": "180px",
                "height": "420px"
            }
        },
        MuiButton: {
            root: {
                "font-size": "0.875rem",
                "min-width": "64px",
                "box-sizing": "border-box",
                'font-weight': "500",
                "line-height": "2.75",
                "border-radius": "4px",
                'letter-spacing': "0.02857em",
                'width': "183px",
                "margin-right": "21px",
            }
        }
    }
})
class EditorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body: "",
            open: false,
            queAns: [],
            messages: [],
            note: [],
        }
        // this.renderMethode=this.renderMethode.bind(this)
    }
    componentDidMount() {
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
    handleOpen = () => {
        this.setState({ open: !this.state.open })
    }
    handleClose = () => {
        this.setState({ open: false })
    }
    handleChange = (e) => {
        this.setState({
            body: e
        })
        console.log("input Base", this.state.body);
    }
    HandleQueAns = () => {
        this.setState({
            body: this.state.body
        })
        console.log("this.props.noteId",this.props.noteId);
        
        var data = {
            'message': this.state.body,
            'notesId': this.props.noteId
        }
        console.log("data from backend", data);
        QuesnAnsCreate(data)
            .then(response => {
                console.log("response from ques ans", response);
                this.setState({
                    messages: response.data.data.details.message,
                })
                this.getNote()
                console.log("my id...", this.state.messages);
            })
            .catch(err => {
                console.log("Error While posting que and ans", err);
            })
    }
    //    renderMethode(){
    //   
    RedirectToHome = () => {
        this.props.history.push('/dashboard')
    }
    render() {
        console.log("rendermethod message", this.state.messages);
        var allMessages = this.state.note.map((key) => {
            return (
                <div>
                    {(this.props.noteId === key.id) ?
                        <MuiThemeProvider theme={theme}>
                            <Card open={this.state.open}
                                onClose={this.handleClose}
                            // style={{
                            //     minHeight: '80vh',
                            //     maxHeight: '80vh'
                            // }}
                            >
                                <div className="dialogQue">
                                    <div>
                                        <DialogContent className="editorCard">
                                            {(key.questionAndAnswerNotes.length > 0) &&
                                                <div className="que-display" >
                                                    <div><b className="quehead">
                                                        Questions
                                </b>
                                                    </div>
                                                    <br></br>
                                                    <div className="question" >
                                                        <div><i><b>{key.title}</b></i></div>
                                                        <div><i><b>{key.description}</b></i></div>
                                                        <div
dangerouslySetInnerHTML={{ __html:key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].message.toString().substring(4).slice(0, -5)}}>
</div>
                                                    </div>
                                                </div>
                                            }
                                        </DialogContent>
                                    </div>
                                    <MuiThemeProvider theme={theme}>
                                        <div>
                                            <Button onClick={this.RedirectToHome} className="buttonEditorClose">
                                                <b>Close</b>
                                            </Button>
                                        </div>
                                    </MuiThemeProvider>
                                </div>
                                <div>
                                    <DialogTitle className="titleQue">
                                        <b>Have a Questions....ask Here</b>
                                    </DialogTitle>
                                </div>
                                <DialogContent style={{ "fontSize": "large" }}>
                                    <ReactQuill
                                        modules={EditorComponent.modules}
                                        formats={EditorComponent.formats}
                                        placeholder="Type Something....."
                                        value={this.state.body}
                                        onChange={this.handleChange}>
                                    </ReactQuill>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => this.HandleQueAns()} style={{
                                        "margin-right": "29px",
                                        "background-color": "lightsteelblue"
                                    }}>
                                        <b >Ask Question</b>
                                    </Button>
                                </DialogActions>
                            </Card>
                        </MuiThemeProvider>
                        :
                        null
                    }
                </div>
            )
        })
        return (
            <div>
                {allMessages}
            </div>
        )
    }
}
export default withRouter(EditorComponent);
EditorComponent.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block'],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        [{ 'direction': 'rtl' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        ['emoji']
    ]
}
EditorComponent.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image', 'video',
    'code-block', 'emoji'
]
