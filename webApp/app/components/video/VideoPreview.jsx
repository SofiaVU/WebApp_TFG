import React from 'react';

let querystring = require('querystring');

export default class VideoPreview extends React.Component {

    constructor(props) {
        super(props);
        this._setCurrentVideo = this._setCurrentVideo.bind(this);
    }

    _setCurrentVideo() {
        this.props.setCurrentVideo(this.props.video);
    }

    render() {

        let params = {
            access_token: this.props.user.token,
            id: this.props.video.id,
        };

        let name = querystring.stringify(params);

        return (
            <div className={"videoPreview"} onClick={this._setCurrentVideo}>
                <div className={"videoImg"}><i className="material-icons">play_circle_outline</i></div>
                <div className={""}>{this.props.video.name}</div>
                <div className={"smallTextAuthorWrapper"}><span
                    className={"smallTextAuthor"}>Uploaded by:</span> {this.props.video.user.username}</div>
                {this.props.user.admin &&
                <div className={"smallTextAuthorWrapper"}><a href={"http://localhost:8000/delete?" + name}> Delete</a>
                </div>}


            </div>
        );

    }
}
