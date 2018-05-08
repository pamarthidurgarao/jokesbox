import React, { Component } from 'react';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import Dropzone from 'react-dropzone'
import axios from 'axios'

class Header extends Component {

    constructor(props){
        super(props);
        this.state = {joke:'',user:'',image:""};
        this.saveJoke = this.saveJoke.bind(this);
        this.jokeChange = this.jokeChange.bind(this);
        this.jokeUser = this.jokeUser.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    saveJoke(e){
        e.preventDefault();
        debugger
        console.log(this.state.joke); 
        this.props.addJoke(this.state.joke,this.state.user);
        document.getElementById("closeModal").click();
    }

    handleDrop = files => {
        debugger
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
          // Initial FormData
          const formData = new FormData();
          formData.append("file", file);
          formData.append("tags", `codeinfuse, medium, gist`);
          formData.append("upload_preset", "ka82iy5d"); // Replace the preset name with your own
          formData.append("api_key", "312933656394819"); // Replace API key with your own Cloudinary key
          formData.append("timestamp", (Date.now() / 1000) | 0);
          
          // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
          return axios.post("https://api.cloudinary.com/v1_1/jokesbox/image/upload", formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }).then(response => {
              debugger
            const data = response.data;
            const fileURL = data.secure_url // You should store this URL for future references in your app
            this.setState({image:fileURL});
            console.log(data);
          })
        });
      
        // Once all the files are uploaded 
        // axios.all(uploaders).then(() => {
          // ... perform after upload is successful 
          console(uploaders);
        // });
      }
    //   uploadFile(e) {
    //     debugger
    //     // Push all the axios request promise into a single array
    //       // Initial FormData
    //     //   var file = new File([blob], e.target.value, {
    //     //     lastModified: new Date(0), 
    //     //     type: "image/png"
    //     // });
    //     var gameLocation = e.target.value;
    //     var blob = null;
    //     var xhr = new XMLHttpRequest();
    //     xhr.open("GET", gameLocation, true);
    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState == XMLHttpRequest.DONE) {
    //             var blob = xhr.response;
    //             var file = new File([blob], e.target.value, { type: 'image/png', lastModified: Date.now() });
    //             // snes_readfile(file);
    //             const formData = new FormData();
    //       formData.append("file", file);
    //       formData.append("tags", `codeinfuse, medium, gist`);
    //       formData.append("upload_preset", "ka82iy5d"); // Replace the preset name with your own
    //       formData.append("api_key", "312933656394819"); // Replace API key with your own Cloudinary key
    //       formData.append("timestamp", (Date.now() / 1000) | 0);
          
    //       // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    //       return axios.post("https://api.cloudinary.com/v1_1/jokesbox/image/upload", formData, {
    //         headers: { "X-Requested-With": "XMLHttpRequest" },
    //       }).then(response => {
    //           debugger
    //         const data = response.data;
    //         const fileURL = data.secure_url // You should store this URL for future references in your app
    //         console.log(data);
    //       })
      
    //         }
    //     }
    //     xhr.responseType = "blob";
    //     xhr.send();
          
    //     // Once all the files are uploaded 
    //     // axios.all(uploaders).then(() => {
    //       // ... perform after upload is successful 
    //     // });
    //   }
    jokeChange(e){
        this.setState({ joke: e.target.value });
    }
    jokeUser(e){
        this.setState({ user: e.target.value });
    }

    render() {
       
        return (
            <div>
            <nav className="navbar navbar-light fixed-top shadowNav">
                <a className="navbar-brand">
                    <img src="https://getbootstrap.com//assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt=""/> <span className="appTitle">Jokes Box</span>
                </a>
                <form className="form-inline my-2 my-lg-0">
                    <button type="button" className="btn btn-primary addJoke" data-toggle="modal" data-target="#addJokeModal">Add Joke</button>
                </form>
            </nav>
                        
            <div className="modal fade" id="addJokeModal" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="jokeModalLabel">Add Joke</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <input className="form-control" id="jokeFormControlTextarea1" placeholder="Enter your name" type="text" value={this.state.user} onChange={ this.jokeUser }></input>
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" id="jokeFormControlTextarea1" placeholder="Type Joke here" rows="4" value={this.state.joke} onChange={ this.jokeChange }></textarea>
                        </div>
                        <Dropzone 
                            onDrop={this.handleDrop} 
                            multiple 
                            accept="image/*" 
                            >
                            <p>Drop your files or click here to upload</p>
                        </Dropzone>
                        {/* <div class="custom-file">
                            <input type="file" class="custom-file-input" id="validatedCustomFile" onChange={ this.uploadFile }/>
                            <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                            <div class="invalid-feedback">Example invalid custom file feedback</div>
                        </div> */}
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" id="closeModal" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={this.saveJoke}>Save</button>
                </div>
                </div>
              </div>
            </div>
        </div>
        )
    }
}
export default Header;
