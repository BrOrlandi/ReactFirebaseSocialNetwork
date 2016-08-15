import React from 'react';

import logo from '../../assets/images/logo-semcomp-branco.svg';

export default class Navbar extends React.Component {

    signIn(){
        console.log("SIGN IN");
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
                          <li><a href="#">Bruno Orlandi</a></li>
                          <li><a href="#" onClick={this.signIn}><i className="material-icons left">account_circle</i>SIGN IN</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
};
