import React from 'react';


class AddFriendModal extends React.Component{

    openModal = () =>{
        $("#AddFriendModal").openModal({
            ready: ()=> {
                console.log("modal open");
            }
        });
    }


    render(){

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
                {/* Search user result */}
                <li className="collection-item friendRequest">User name
                    <button className="waves-effect waves-light btn light-blue darken-4 col s12" ><i className="material-icons left">add</i>Add friend</button>
                </li>

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
