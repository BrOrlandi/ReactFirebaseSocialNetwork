import React from 'react';

import firebase from 'firebase';

import Friend from './Friend';

import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';

class FriendList extends React.Component {

    constructor(props) {
        super(props)
        this.state ={
            activeConversation: {}
        }
    }

    componentWillMount(){
        var ref = firebase.database().ref('/friendships/'+SocialNetwork.getUser().uid).orderByChild("lastDate");
        this.bindAsArray(ref,"friends");
    }

    selectConversation(friend){
        if(friend['.key'] !== this.state.activeConversation['.key']){ // don't reload the same conversation
            this.setState({activeConversation: friend});
            this.props.onSelectConversation(friend);

            // update url hash when new friend is selected
            var location = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');
            if(location[0] !== friend['.key'])
                window.history.pushState({},'','#'+friend['.key']);
        }
    }

    componentWillReceiveProps(props){ // if receive a friend via props, select it
        if(props.friend){
            this.selectConversation(props.friend);
        }
    }

    render(){
        var friends = this.state.friends.map((f)=>{
            var friendId = f['.key'];
            var conversationId = f.conversation;
            var active = conversationId == this.state.activeConversation.conversation;
            return <Friend key={friendId} onClick={this.selectConversation.bind(this, f)} uid={friendId} active={active}/>;
        });
        return(
            <div className="friendList">
                {friends}
            </div>
        );
    }
}

reactMixin(FriendList.prototype, ReactFireMixin);

export default FriendList;
