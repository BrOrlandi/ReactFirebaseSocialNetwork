import React from 'react';

import firebase from 'firebase';

import Friend from './Friend';

import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';

import defaultPic from '../../assets/images/profile-placeholder.png';

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

        var checkNotification = function() {
          if (Notification.permission === 'default') {
            Notification.requestPermission(function() {
              console.log('Notification request permission.');
            });
            }
        };

        checkNotification();
        if(Notification.permission === 'granted'){
            ref.on('child_changed',(snapshot)=>{
                if(!window.window_focus){
                    firebase.database().ref('/users/'+snapshot.key).once('value').then((snapshot)=>{
                        var friend = snapshot.val();
                        var notification = new Notification('Semcomp Social',{
                            tag: snapshot.key,
                            body: "New message from "+friend.displayName,
                            icon: friend.photoURL ? friend.photoURL : defaultPic
                        });
                    });
                }

            })
        }
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
