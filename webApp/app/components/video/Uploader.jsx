import React from 'react';
import $ from 'jquery';

let querystring = require('querystring');

export default class Uploader extends React.Component {

    constructor(props) {
        super(props);
        this._uploadVideo = this._uploadVideo.bind(this);

    }

    _uploadVideo() {
        let form = new FormData();
        let file = document.querySelector('input[type="file"]').files[0];
        let name = $(".styledInput").val();
        form.append("fileToUpload", file);
        form.append("name", name);

        this.props.uploadVideo(form);
    }


    render() {
        let params = {
            access_token: this.props.user.token,
        };

        let user = querystring.stringify(params);

        return (
            <div id={"uploadSection"}>


                <div className={"videoUploadForm"}>
                    <div>
                        <h1>Upload a new video</h1>
                    </div>


                    <div>
                        <div><strong>Name:</strong></div>
                        <input type={"text"} className={"styledInput"} name={"name"}/>
                    </div>
                    <div>
                        <div><strong>Select video:</strong></div>
                        <input type={"file"} id={"videoUploadInput"} name={"fileToUpload"}/>

                    </div>
                    <div>
                        <button action="submit" className={"longButton"} onClick={this._uploadVideo}>Submit</button>

                    </div>




                </div>


            </div>
        );

    }
}
