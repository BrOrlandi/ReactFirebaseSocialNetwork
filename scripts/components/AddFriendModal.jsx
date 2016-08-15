import React from 'react';
import firebase from 'firebase';


class AddFriendModal extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            userResult: null
        };
    }

    searchUser= (e)=>{
        e.preventDefault();
        var search = this.refs.searchUser.value;
        //this.refs.searchUser.value = '',
        firebase.database().ref("/users").orderByChild("email").equalTo(search)
            .once('value',(snapshot)=>{
            this.setState({userResult: snapshot.val()});
        });
    }


    openModal = () =>{
        $("#AddFriendModal").openModal({
            ready: ()=> {
                this.refs.searchUser.focus();
            },
            complete: this.closeModal
        });
    }

    closeModal = () =>{
        this.setState({userResult:null});
        this.refs.searchUser.value = '';
    }


    createFriendRequest = (userId)=>{
        console.log(userId);
    }

    render(){
        if(this.state.userResult){
            var keys = Object.keys(this.state.userResult);
            var result = keys.map((key)=>{
                var button;
                button = <button className="waves-effect waves-light btn light-blue darken-4 col s12" onClick={this.createFriendRequest.bind(this,key)}><i className="material-icons left">add</i>Add friend</button>;
                var user = this.state.userResult[key];
                return <li className="collection-item friendRequest" key={key}>{user.displayName} - {button}</li>;
            });
        }

        return (<div ref="AddFriendModal" id="AddFriendModal" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>Add Friends</h4>
          {/* <FriendRequestList list={this.state.friendRequests}/> */}
          <form  onSubmit={this.searchUser}>
              <div className="input-field">
                  <input placeholder="Search user by e-mail..." id="searchUser" ref="searchUser" type="text" />
              </div>
              <div className="center">
                <button type="submit" className="waves-effect waves-light btn light-blue darken-4"><i className="material-icons left">search</i>Search</button>
              </div>
          </form>
          <ul className="collection with-header">
                {result}
          </ul>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Close</a>
        </div>
          </div>
        );
    }
};

export default AddFriendModal;
