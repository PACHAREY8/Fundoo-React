import React, { Component } from 'react'
import { Input } from '@material-ui/core';
const url = "http://34.213.106.173/"
export default class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl:""
          
        }
        // this.handleUpload=this.handleUpload.bind(this)
    }
   async handleUpload(event) {
       
        console.log("image select", (event.target.files[0]));
        var value=url+event.target.files[0].name
       await this.setState({
        imageUrl:value
        })
        console.log("props image",this.state.imageUrl)
        
        this.props.sendImageProps(this.state.imageUrl)
        
    }
    render() {
        return (
            <div>
                    <div>
                        <label
                            for="image"
                        >
                            <img  src={require('../assets/images/addImage.png')}
                            alt="AddImage"></img>
                        </label>
                        <Input type="file"
                            id="image"
                          
                            onChange={(event)=>this.handleUpload(event)}
                            style={{display:"none"}}>
                        </Input>
                    </div>
                </div>
        )
    }
}
