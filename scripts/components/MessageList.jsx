import React from 'react';

import firebase from 'firebase';

import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';

import Message from './Message';

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
        if(this.state.messages){
            this.unbind("messages");
        }
        this.setState({friend: props.friend});
        this.readMessages(props);
    }

    render(){
        if(!!this.state.messages){
            var messages = this.state.messages.map((m)=>{
                return <Message key={m['.key']} {...m}/>
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
