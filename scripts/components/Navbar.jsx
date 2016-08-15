import React from 'react';

import logo from '../../assets/images/logo-semcomp-branco.svg';

import defaultPic from '../../assets/images/profile-placeholder.png';
import AddFriendModal from './AddFriendModal';

export default class Navbar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            currentUser: props.currentUser,
            userCheck: false
        };
    }

    componentWillReceiveProps(props){
        this.setState(props);
    }

    signIn(){
        SocialNetwork.signIn();
    }

    signOut(){
        SocialNetwork.signOut();
    }

    addFriend = ()=>{
        this.refs.addFriendModal.openModal();
    }

    render(){
        var user = this.state.currentUser;
        var items = [];
        if(user){
            var photo = user.photoURL ? user.photoURL : defaultPic;
            items.push(<a href="#" onClick={this.addFriend}><i className="material-icons left">person_add</i>Add Friends</a>);
            items.push(<img className="responsive-img circle navbarPic" src={photo} />);
            items.push(<a href="#">{user.displayName}</a>);
            items.push(<a className="navButton" href="#" onClick={this.signOut}>SIGN OUT</a>);
        }
        else if(this.state.userCheck){ // this prevent showing the Signin button before the User session is loaded.
            items.push(<a href="#" onClick={this.signIn}><i className="material-icons left">account_circle</i>SIGN IN</a>);
        }

        var menu = items.map((el, i)=>{
            return <li key={i} >{el}</li>;
        });

        return (
            <div>
            <nav className="navbar-fixed light-blue darken-4">
                <div className="nav-wrapper">
                    <div className="col s12">
                        <a href="#" className="brand-logo">
                             <img height="64px" src={logo} />
                                Semcomp Social
                        </a>
                        <ul className="right hide-on-med-and-down">
                            {menu}
                        </ul>
                    </div>
                </div>
            </nav>
            <AddFriendModal ref="addFriendModal"/>
            </div>
        )
    }
};
