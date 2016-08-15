import React from 'react';

import FriendList from './FriendList';
import MessagesBoard from './MessagesBoard';

export default class Chat extends React.Component {

    constructor(props) {
        super(props)
        this.state ={
            friend: null
        }
    }


    onSelectConversation = (friend)=>{
        this.setState({ friend});
    }

    render(){
        if(!this.props.userCheck){
            return <div className="container"></div>;
        }
        if(this.props.currentUser){
            return(
                <div className="chatContainer">
                    {/* Friend List... */}
                    <FriendList onSelectConversation={this.onSelectConversation} />

                    {/* All message stuff is handled here */}
                    <MessagesBoard friend={this.state.friend} />
                </div>
            );
        }else{
            return(
            <div className="container">
                <div className="section">
                    <div className="row">
                        <div className="col s12 m4 offset-m4">
                            <div className="card-panel white center-align">
                                <p className="flow-text">Sign in to the Social Network.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
    }
}
