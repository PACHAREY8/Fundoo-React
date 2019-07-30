import React, { Component } from 'react'
import QueDisplayComponent from '../components/QueDisplayComponent'
export default class QueDisplay extends Component {
    render() {
        console.log(this.props.location.state);
        
        return (
            <div>
                <QueDisplayComponent
                noteId={this.props.location.state}
                />
            </div>
        )
    }
}
