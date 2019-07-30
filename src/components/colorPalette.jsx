import React, { Component } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Popper, Paper } from '@material-ui/core';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
// import Getnotes from '../components/getNotes'
const hexcodesAndNames = [{ name: "salmon", hexcode: "#FA8072" },
{ name: "peachpuff", hexcode: "#FFDAB9" },
{ name: "darkseagreen", hexcode: "#8FBC8F" },
{ name: "mediumaquamarine", hexcode: "#66CDAA" },
{ name: "steelblue", hexcode: "#4682B4" },
{ name: "mediumpurple", hexcode: "#9370DB" },
{ name: "silver", hexcode: "#C0C0C0" },
{ name: "rosybrown", hexcode: "#BC8F8F" },
{ name: "gray", hexcode: "#808080" },
{ name: "cadetblue", hexcode: "#5F9EA0" },
{ name: "khaki", hexcode: "#F0E68C" },
{ name: "lightcoral", hexcode: "#F08080" }
]
const thm = createMuiTheme({
    overrides: {
        button: {
            MuiButtonBase: {
                root: {
                    MuiIconButton: {
                        root: {
                            colorTooltip: {
                                colorpallete: {
                                    width: 40,
                                    height: 40,
                                }
                            },
                        }
                    }
                }
            }
        },
        MuiPaper: {
            root: {
                MuiPaper: {
                    elevation1: {
                        MuiCard: {
                            root: {
                                colorPalleteCard: {
                                    MuiPaper: {
                                        rounded: {
                                            width: 148,
                                            height: 111,
                                            "border-radius": 11,
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});
class ColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
        this.handleToggle = this.handleToggle.bind(this);
        //   this.handlecreate=this.handlecreate.bind(this);
        this.handleColor = this.handleColor.bind(this);
    }
    closePopper = () => {
        this.setState({
            open: false
        })
    }
    handleColor(evt) {
        try {
            console.log("Colors: ", this.props.noteID)
            this.props.PropsToColorpallete(evt.target.value, this.props.noteID);
            console.log(evt.target.value);
        } catch (err) {
            console.log("error in handle color event");
        }
    }
    // handleProps = (evt) => {
    //     this.props.handlePropsColor(evt.target.value)
    //     console.log(evt.target.value);
    // }
    handleToggle = (evt) => {
        this.setState({ open: !this.state.open })
    }
    render() {
        const changeColor = hexcodesAndNames.map((colorkey) =>
            <Tooltip title={colorkey.name} className="colorTooltip"><IconButton style={{ backgroundColor: colorkey.hexcode, "margin": "2px", }}
                value={colorkey.hexcode}
                onClick={this.handleColor}
                className="colorpallete"
            >
            </IconButton>
            </Tooltip>
        );
        return (
            <MuiThemeProvider theme={thm}>
                <PopupState variant="popper" >
                    {popupState => (
                        <div>
                            <div variant="contained" {...bindToggle(popupState)}>
                                <img src={require('../assets/images/changeColor.png')}
                                    alt="change color"
                                    onClick={this.handleToggle}
                                />
                            </div>
                            <Popper  {...bindPopper(popupState)} transition className="colorPopper" style={{ zIndex: "9999" }}>
                                {this.state.open ?
                                    <Paper
                                        className="colorPalleteCard"
                                        onMouseLeave={this.closePopper}>
                                        {changeColor}
                                    </Paper>
                                    : null}
                            </Popper>
                        </div>
                    )}
                </PopupState>
            </MuiThemeProvider>
        )
    }
}
export default ColorPalette;
