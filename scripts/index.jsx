var $ = window.jQuery = require('jquery');
require('materialize-css/bin/materialize.js');

import ReactDOM from 'react-dom';
import React from 'react';

import firebase from 'firebase';
import SocialNetwork from 'SocialNetwork';

import Navbar from './components/Navbar';
import Chat from './components/Chat';


class App extends React.Component {

    render(){
        // pass the user to the navbar
        return (
            <div>
                <Navbar />
                <Chat />
            </div>
        );
    }
};
ReactDOM.render(<App/>, document.getElementById('react-body'));
