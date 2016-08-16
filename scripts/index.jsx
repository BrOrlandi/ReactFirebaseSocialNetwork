var $ = window.jQuery = require('jquery');
require('materialize-css/bin/materialize.js');

import ReactDOM from 'react-dom';
import React from 'react';

import firebase from 'firebase';
import SocialNetwork from 'SocialNetwork';

import Navbar from './components/Navbar';
import Chat from './components/Chat';

window.SocialNetwork = SocialNetwork;

class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            currentUser: null,
            userCheck: false  // if user was checked
        };

        firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
    }

    onAuthStateChanged(user){
        this.setState({currentUser: user,userCheck: true});
    }

    render(){
        // pass the user to the navbar
        return (
            <div>
                <Navbar {...this.state}  />
                <Chat {...this.state} hash={this.props.hash}/>
            </div>
        );
    }
};

function handleNewHash() {
  var location = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');
  var application = <App hash={location[0]} />; // pass the hash as parameter
  ReactDOM.render(application, document.getElementById('react-body'));
}

// Handle the initial route and browser navigation events
handleNewHash();
window.addEventListener('hashchange', handleNewHash, false);
