import { Button, Card, CardContent, Avatar } from '@material-ui/core';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getNotes } from '../services/noteServices';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { likeQueAns } from '../services/queansServices';
const url = "http://34.213.106.173/"
const theme = createMuiTheme({
    overrides: {
        MuiCard: {
            root: {
                "overflow": "hidden",
                "width": "900px",
                "margin-left": "389px",
                // "margin-top": "50px",
            }
        },
        MuiButton: {
            root: {
                "min-width": "139px",
                "box-sizing": "border-box",
                "font-weight": "500",
                "line-height": "1.75",
                "border-radius": "4px",
                "letter-spacing": "0.02857em",
                "text-transform": "uppercase",
                "background-color": "lightgray",
            }
        }
    }
})
class QueDisplayComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: [],
            noteId: "",
            like: true,
            parentId: "",
            likecnt: ""
        }
    }
    componentDidMount = () => {
        getNotes()
            .then(response => {
                console.log("Response From Que Page", response);
                this.setState({
                    note: response.data.data.data
                })
                console.log("note in que display component", this.state.note);
            })
            .catch(err => {
                console.log("ERR_IN_QUESTION", err);
            })
    }
    RedirectToHome = (e) => {
        e.preventDefault()
        this.props.history.push('/dashboard')
    }
    handleEditor = (noteId) => {
        this.props.history.push('/editorComponent', noteId)
        // console.log("handle Editor cheking",this.props);
    }
    handleLike = (parentId) => {
        var data = {
            'like': true,
        }
        console.log("like check", this.state.like);
        likeQueAns(data, parentId)
            .then(response => {
                console.log("REPONSE_FROM_LIKE_QUE_ANS", response);
                this.setState({
                    like: !this.state.like,
                })
            })
            .catch(err => {
                console.log("ERR_IN_LIKE_QUE_ANS", err);
            })
    }
    handleUnlike = (parentId) => {
        var data = {
            'like': false,
        }
        console.log("like check", this.state.like);
        likeQueAns(data, parentId)
            .then(response => {
                console.log("REPONSE_FROM_LIKE_QUE_ANS", response);
                this.setState({
                    like: !this.state.like
                })
            })
            .catch(err => {
                console.log("ERR_IN_LIKE_QUE_ANS", err);
            })
    }
    countLike(value) {
        var countlike = 0
            if (value === true) {
                countlike++
    
            }
        
       
        console.log("checking...", countlike);
        return countlike;
    }
    render() {
        var notearr = this.state.note.map((key) => {
            // console.log(key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1]);
            return (
                <div className="mainDiv">
                    {(this.props.noteId === key.id) ?
                        <div>
                            <MuiThemeProvider theme={theme}>
                                <Card >
                                    <CardContent className="FirstQueDiv">
                                        <div className="queTitleDesc">
                                            <div>
                                                {"Title : " + key.title}
                                            </div>
                                            <div>
                                                {"Description : " + key.description}
                                            </div>
                                        </div>
                                        <MuiThemeProvider theme={theme}>
                                            <Button onClick={this.RedirectToHome} className="QuecloseButton ">
                                                <b>Close</b>
                                            </Button>
                                        </MuiThemeProvider>
                                    </CardContent>
                                    {
                                        <div style={{ display: "flex", flexDirection: "column-reverse" }} className="QuesDisplay">
                                            {(key.questionAndAnswerNotes.length > 0) &&
                                                <div className="que-display" >
                                                    <div><b className="quehead">
                                                        Asked Question
                                </b>
                                                    </div>
                                                    <br></br>
                                                    <div className="que"
                                                        dangerouslySetInnerHTML={{ __html: key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].message.toString().substring(3).slice(0, -4) }}>
                                                    </div>
                                                </div>}
                                        </div>
                                    }
                                </Card>
                            </MuiThemeProvider>
                            <MuiThemeProvider>
                                {(key.questionAndAnswerNotes.length > 0) &&
                                    <Card className="secondCard">
                                        <div className="secondCardDiv">
                                            <Avatar style={{
                                                width: "60px", height: "60px"
                                            }} >
                                                <img style={{
                                                    width: "60px", height: "60px"
                                                }}
                                                    src={url + (localStorage.getItem("ProfilePic"))} alt="profile Pic">
                                                </img>
                                            </Avatar>
                                            <div className="alldata">
                                                <div className="mydataQue">
                                                    <div className="lastfirstname">
                                                        <b>{localStorage.getItem('firstName')}</b>
                                                        <b className="lastname">{localStorage.getItem('lastName')}</b>
                                                    </div>
                                                    <date style={{ "margin-left": "4%" }}> {key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].createdDate}</date>
                                                </div>
                                                <br></br>
                                                <div className="ques"
                                                    dangerouslySetInnerHTML={{ __html: key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].message.toString().substring(3).slice(0, -4) }}>
                                                </div>
                                            </div>
                                            <div className="likeDisp">
                                                <div onClick={() => this.handleEditor(key.id)} className="back_Arrow">
                                                    <img src={require('../assets/images/icons8-undo-26.png')} alt="redirect">
                                                    </img>
                                                </div>
                                                {this.state.like ?
                                                    <div onClick={() => this.handleLike(key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].id)}>
                                                        <img src={require('../assets/images/like.png')} alt="like">
                                                        </img>
                                                    </div>
                                                    :
                                                    <div onClick={() => this.handleUnlike(key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].id)}>
                                                        <img src={require('../assets/images/unlike.png')} alt="unlike">
                                                        </img>
                                                    </div>}
                                            </div>
                                                        <span className="likeprint">{key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].like.length} Likes</span>
                                            
                                        </div>
                                    </Card>
                                }
                            </MuiThemeProvider>
                        </div> :
                        null
                    }
                </div>
            )
        })
        return (
            <div className="AllQue">
                {notearr}
            </div>
        )
    }
}
export default withRouter(QueDisplayComponent)
