import React from 'react';

import classNames from 'classnames';

import firebase from 'firebase';

export default class Message extends React.Component {

    render(){
        var messageClass;

        // Checking the receipt to apply the propers css class
        if(this.props.from == SocialNetwork.getUser().uid){
            messageClass = 'userMessage';
        }
        else{
            messageClass = 'othersMessage';
        }

        var formatDate = (date)=>{
            var h = date.getHours();
            var m = date.getMinutes();
            if(m < 10){
                m = "0"+m;
            }
            return h+":"+m;
        }

        return(
            <div className={"chatMessage "+messageClass}>
                {/* Message content (div ensures that the display mode is block) */}
                <div>
                    {this.props.message}
                </div>
                {/* Timestamp (div ensures that the display mode is block again) */}
                <div className="timestamp">{formatDate(new Date(this.props.date))}</div>
            </div>
        );
    }
}
