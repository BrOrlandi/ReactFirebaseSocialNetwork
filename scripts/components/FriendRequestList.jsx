import React from 'react';

import UserWithPic from './UserWithPic';

class FriendRequestList extends React.Component {

    constructor(props){
        super(props);
    }

    accept(uid){
        SocialNetwork.acceptFriendRequest(uid);
    }

    reject(uid){
        SocialNetwork.rejectFriendRequest(uid);
    }

    render(){
        if(this.props.list && this.props.list.length > 0){
            var friendRequests = this.props.list.map((fr)=>{
                var uid = fr['.key'];
                return <li className="collection-item" key={uid} >
                            <UserWithPic uid={uid}>
                                <button className="waves-effect waves-light btn light-blue darken-4 col s6" onClick={this.accept.bind(this,uid)}><i className="material-icons left">check</i>Accept</button>
                                <button className="waves-effect waves-light btn grey col s6" onClick={this.reject.bind(this,uid)}><i className="material-icons left">close</i>Reject</button>
                            </UserWithPic>
                        </li>
            });

            return (<div>
                <ul className="collection with-header">
                    <li className="collection-header"><h5>Friend requests</h5></li>
                    {friendRequests}
                </ul>
            </div>)
        }else{
            return <div></div>;
        }
    }
};

export default FriendRequestList;
