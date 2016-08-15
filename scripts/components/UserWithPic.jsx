import React from 'react';
import firebase from 'firebase';
import defaultPic from '../../assets/images/profile-placeholder.png';

class UserWithPic extends React.Component {

    constructor(props){
        super(props);

        this.state ={
            user: null
        }
    }

    componentWillMount(){
        this.setState({user: this.props.user});
    }

    render(){
        var user = this.state.user;
        if(!user){
            return <div/>
        }
        var photo = user.photoURL ? user.photoURL : defaultPic;
        return(
            <div className="row">
                <div className="col s12 m6">
                    <div className="col s12 m6">
                        <img className="responsive-img circle userPic" src={photo} alt={user.displayName}/>
                    </div>
                    <p className="col s12 m6 height-fix">{user.displayName}</p>
                </div>
                <a href="#!" className="secondary-content col s12 m6  height-fix">{this.props.children}</a>
            </div>
        );
    }
}

export default UserWithPic;
