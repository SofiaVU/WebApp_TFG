import React from 'react';
import '../assets/css/style.css';
import {connect} from 'react-redux';
import ChatContactBar from './chat/ChatContactBar';
import ChatMain from './chat/ChatMain';
import Main from './Main';
import {
    addNewOnlineUser,
    deleteAlerts,
    newMessage,
    setChatHistory,
    setCurrentChat,
    setNews,
    setOnlineUsers,
    setRemoteUsersTyping,
    showChat,
    userTyping,
} from "../../redux/reducers/actions";

import {
    chatRequest,
    getUsersOnline,
    openChat,
    openConnection,
    receivedMessage,
    remoteUserIsTyping,
    sendMessage,
    userIsTyping,
} from "../chatClient";
import Header from "./Header";

class App extends React.Component {

    constructor(props) {
        super(props);

        console.log(this.props.store.getState());

        this._sendMessage = this._sendMessage.bind(this);
        this._openNewChat = this._openNewChat.bind(this);
        this._userTyping = this._userTyping.bind(this);
        this._hideChat = this._hideChat.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this._removeAlerts = this._removeAlerts.bind(this);

        /* let user = prompt("Set user");
        let passw = prompt("Set password");*/

        // this.props.dispatch(setUserId(userId));

        openConnection(this.props.myself.id);

        getUsersOnline((users) => {
            this.props.dispatch(setOnlineUsers(users));

        });

        receivedMessage((msg) => {
            this.props.dispatch(newMessage(msg));

        });

        remoteUserIsTyping(details => {
            this.props.dispatch(setRemoteUsersTyping(details));
        });

    }

    componentDidMount() {
        if (this.props.modules.news) {
            this._getNews();
        }
    }

    _getNews() {
        fetch('http://localhost:5000/api/news?access_token=bb')
            .then((response) => response.json())

            .then((parsedResponse) => {

                let news = parsedResponse.reverse();

                this.props.dispatch(setNews(news));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    _openNewChat(userId) {

        let n1 = Math.min(parseInt(this.props.userId), parseInt(userId));
        let n2 = Math.max(parseInt(this.props.userId), parseInt(userId));

        let room = n1 + "_" + n2;

        openChat(room, fullHistory => {
            this.props.dispatch(setChatHistory(fullHistory));
        });

        this.props.dispatch(setCurrentChat(room));
        this.props.dispatch(showChat(true));

        // console.log(this.props.store.getState());

    }

    _sendMessage(msg) {
        this.props.dispatch(newMessage(msg));
        sendMessage(msg);
    }

    _userTyping(bool, chat) {
        this.props.dispatch(userTyping(bool, chat));

        userIsTyping(bool, chat, this.props.myself.id);
    }

    _hideChat() {
        this.props.dispatch(showChat(false));
    }


    _removeAlerts() {
        console.log("alertttt");
        this.props.dispatch(deleteAlerts());
    }

    _submitNew(data) {

        //console.log(data);

        let url = "http://localhost:5000/api/news?access_token=bb";

        // HTTP request
        let req = new XMLHttpRequest();

        // True == async
        req.open('POST', url, true);

        req.setRequestHeader("Content-type", "application/json");

        req.send(JSON.stringify(data));

        req.onreadystatechange = function () {
            console.log(req.status);
            if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {

            }

        };

    }

    render() {

        return (
            <div id="wrapper">

                <Header myself={this.props.myself}/>

                <div id="contentWrapper">
                    {this.props.modules.chat &&
                    <ChatMain send={this._sendMessage} author={this.props.myself.id}
                              currentChat={this.props.currentChat}
                              messages={this.props.chat[this.props.currentChat]} userTyping={this._userTyping}
                              remoteUsersTyping={this.props.remoteUsersTyping[this.props.currentChat]}
                              hideChat={this._hideChat}/>}

                    <Main modules={this.props.modules} getNews={this._getNews} news={this.props.news}
                          submitNew={this._submitNew} myself={this.props.myself} removeAlerts={this._removeAlerts}
                          alertMessages={this.props.alertMessages}/>

                    <ChatContactBar userId={this.props.myself.id} onlineUsers={this.props.onlineUsers}
                                    openNewChat={this._openNewChat} remoteUsersTyping={this.props.remoteUsersTyping}/>
                </div>

            </div>
        );

    }

}

function mapStateToProps(state) {
    return {
        chat: state.chat,
        modules: state.modules,
        myself: state.myself,
        currentChat: state.currentChat,
        onlineUsers: state.onlineUsers,
        userTyping: state.userTyping,
        remoteUsersTyping: state.remoteUsersTyping,
        news: state.news,
        alertMessages: state.alertMessages
    };
}

export default connect(mapStateToProps)(App);