import React, { Component } from "react";
import EditorComponent from '../components/wysiwygEditor'
import { withRouter } from 'react-router-dom';
// import Trialpopup from "../components/trialpopup";
class Editor extends Component {
    render() {
        console.log("npoteId checking==>in editor++>>",this.props.location.state)
        return (
           
            
            <div>            
               
                <div>
                    <EditorComponent
                      noteId={this.props.location.state}
                      ></EditorComponent>
                </div>
            </div>
        )
    }
}
export default withRouter(Editor);