import React, { Component } from 'react'
import ArchiveComponent from '../components/archiveComponent'
import DashboardComponent from '../components/dashboardComponent';
import { withRouter } from 'react-router-dom';
class Archive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            searchNote: "",
            listview: false,
            trash: "",
            isNotes: true,
            isArchive: false,
            isReminder: false,
            isTrash: false,
            transition: false,
        }
    }
    getSearchNote = (value) => {
        this.setState({ searchNote: value })
    }
    displayNote(newCard) {
        console.log("newcard data....==>", newCard);
        this.noteToCards.current.displayNewCard(newCard);
    }
    listview = (listview) => {
        this.setState({
            listview: !listview
        })
    }
    render() {
        return (
            <div>
                <div  >
                    <DashboardComponent
                        Handletransition={this.Handletransition}
                        getSearchNote={this.getSearchNote}
                        listview={this.listview}
                        dashTrashProps={this.trashPage}
                        NotespropsToDashboardPage={this.NotespropsToDashboardPage}
                    />
                </div>
                <div>
                    <ArchiveComponent
                        listview={this.state.listview}
                        isArchive={this.state.isArchive}
                        isReminder={this.state.isReminder}
                        isTrash={this.state.isTrash}
                        searchNote={this.state.searchNote}
                    ></ArchiveComponent>
                </div>
            </div>
        )
    }
}
export default withRouter(Archive)