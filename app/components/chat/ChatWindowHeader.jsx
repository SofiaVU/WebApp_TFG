import React from 'react';
import './../assets/css/style.css';

export default class ChatWindowHeader extends React.Component {
    render() {

        return (
            <div id="chatHeader">
              <span className="chatHeaderTitle">
                Chat with:
                <span className="chatHeaderName"> John Doe</span>
            </span>
            </div>

        )

    }
}