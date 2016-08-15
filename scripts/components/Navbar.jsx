import React from 'react';

import logo from '../../assets/images/logo-semcomp-branco.svg';

import defaultPic from '../../assets/images/profile-placeholder.png';

export default class Navbar extends React.Component {

    signIn(){
        SocialNetwork.signIn();
    }

    signOut(){
        SocialNetwork.signOut();
    }

    addFriend(){
        console.log("ADD FRIEND");
    }

    render(){
        return (
            <nav className="navbar-fixed light-blue darken-4">
                <div className="nav-wrapper">
                    <div className="col s12">
                        <a href="#" className="brand-logo">
                             <img height="64px" src={logo} />
                                Semcomp Social
                        </a>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="#" onClick={this.addFriend}><i className="material-icons left">person_add</i>Add Friends</a></li>
                            <li><img className="responsive-img circle navbarPic" src={defaultPic} /></li>
                            <li><a href="#">Bruno Orlandi</a></li>
                            <li><a href="#" onClick={this.signIn}><i className="material-icons left">account_circle</i>SIGN IN</a></li>
                            <li><a className="navButton" href="#" onClick={this.signOut}>SIGN OUT</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
};
