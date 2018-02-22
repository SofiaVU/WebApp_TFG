import {combineReducers} from 'redux';

let initialState = {
    chat: {},
    modules: {
        chat: true
    },
    currentChat: null,
    myUserId: null,
    onlineUsers: [],
    userTyping: {
        typing: false,
        chat: null
    },
    remoteUsersTyping: {}
}


function chatUpdate(state = initialState.chat, action) {
    switch (action.type) {
        case 'NEW_MESSAGE':
            let newChat = JSON.parse(JSON.stringify(state));

            //Reading chat ID from the first message
            if (newChat[action.msg.chat] === undefined) {
                newChat[action.msg.chat] = [action.msg];
            } else {
                newChat[action.msg.chat].push(action.msg);
            }

            return newChat;

        case 'UPDATE_CHAT_HISTORY':
            let chatUpdate = JSON.parse(JSON.stringify(state));

            //Reading chat ID from the first message
            chatUpdate[action.chat[0].chat] = action.chat;

            return chatUpdate;

        default:
            return state;

    }
}

function renderModules(state = initialState.modules, action) {
    switch (action.type) {
        case 'RENDER_MODULES':
            return action.modules;
        default:
            return state;

    }
}

function setUserId(state = initialState.myUserId, action) {
    switch (action.type) {
        case 'SET_USER_ID':
            return action.id;
        default:
            return state;

    }
}


function setCurrentChat(state = initialState.currentChat, action) {
    switch (action.type) {
        case 'SET_CURRENT_CHAT':
            return action.chatId;
        default:
            return state;

    }
}


function setOnlineUsers(state = initialState.onlineUsers, action) {

    switch (action.type) {
        case 'SET_ONLINE_USERS':

            let newState = JSON.parse(JSON.stringify(state));

            newState = action.users;


            return newState;


        default:
            return state;

    }
}

function isUserTyping(state = initialState.userTyping, action) {
    switch (action.type) {
        case 'USER_TYPING':

            let newState = JSON.parse(JSON.stringify(state));

            newState.chat = action.chat;
            newState.typing = action.typing;

            return newState;
        default:
            return state;

    }
}

function remoteUsersTyping(state = initialState.remoteUsersTyping, action) {

    switch (action.type) {
        case 'REMOTE_USER_TYPING':

            //console.log(action);

            let newState = JSON.parse(JSON.stringify(state));

            newState[action.chat] = {
                chat: action.userId,
                typing: action.typing

            }

            return newState;

        default:
            return state;

    }

}

let GlobalState = combineReducers({
    chat: chatUpdate,
    modules: renderModules,
    userId: setUserId,
    currentChat: setCurrentChat,
    onlineUsers: setOnlineUsers,
    userTyping: isUserTyping,
    remoteUsersTyping: remoteUsersTyping
});

export default GlobalState;