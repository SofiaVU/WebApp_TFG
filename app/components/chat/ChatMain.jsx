import React from 'react';
import './../assets/css/style.css';
import ChatWindow from './ChatWindow';

export default class ChatMain extends React.Component {

    constructor(props) {
        super(props);
        this._sendMessage = this._sendMessage.bind(this);
    }

    _sendMessage(msg) {
        this.props.send(msg);
    }

    render() {

        //console.log(this.props.messages);

        return (
            <div id="chatMainWrapper">
                <ChatWindow send={this._sendMessage} messages={this.props.messages}/>
            </div>
        );

    }
}