import React from 'react';

import firebase from 'firebase';

import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';

class MessageList extends React.Component {

    constructor(props) {
        super(props)
        this.state ={
            ...props
        };
    }

    readMessages(props){
        var ref = firebase.database().ref('/messages/'+props.friend.conversation).limitToLast(25);
        this.bindAsArray(ref,"messages");
    }

    componentWillMount(){
        this.readMessages(this.state);
    }

    componentWillReceiveProps(props){
        this.setState({friend: props.friend});
        this.readMessages(props);
    }

    render(){
        console.log(this.state.messages);
        if(!!this.state.messages){
            var messages = this.state.messages.map((m)=>{
                return <div className="chatMessage othersMessage">{m.message}</div>;
            });
        }
        return(
            <div className="messageList" ref="messageList">
                {messages}
            </div>
        );
    }
}

reactMixin(MessageList.prototype, ReactFireMixin);

export default MessageList;
