import React, { Component } from 'react'

export default class Not_Found extends Component {
    render() {
        return (
            <div className="not_found">
                <div className="not404">
                    <span style={{ color: "blue" }}>F</span>
                    <span style={{ color: "red" }}>U</span>
                    <span style={{ color: "yellow" }}>N</span>
                    <span style={{ color: "blue" }}>D</span>
                    <span style={{ color: "green" }}>O</span>
                    <span style={{ color: "red" }}>O</span>
                </div>
                <div className="data_404"> <b>ERR_404</b> : PAGE NOT FOUND</div>
            </div>
        )
    }
}
