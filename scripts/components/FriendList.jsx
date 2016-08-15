import React from 'react';

import firebase from 'firebase';

// import Friend from './Friend';

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
        }
    }

    render(){
        var friends = this.state.friends.map((f)=>{
            var friendId = f['.key'];
            var conversationId = f.conversation;
            var active = conversationId == this.state.activeConversation.conversation;
            // return <Friend key={friendId} onClick={this.selectConversation.bind(this, f)} uid={friendId} active={active}/>
            return <div onClick={this.selectConversation.bind(this, f)}>{friendId}</div>
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
