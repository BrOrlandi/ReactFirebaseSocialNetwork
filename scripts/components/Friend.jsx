import React from 'react';
import classNames from 'classnames';

import firebase from 'firebase';

import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';

import defaultPic from '../../assets/images/profile-placeholder.png';

class Friend extends React.Component {

    constructor(props) {
        super(props)
        this.state ={
        }
    }

    componentWillMount(){
        var ref = firebase.database().ref('/users/'+this.props.uid);
        this.bindAsObject(ref,"friend");
    }

    render(){
        
        if(this.state.friend){ // load user after mount
            var friend = this.state.friend;
            var photo = friend.photoURL ? friend.photoURL : defaultPic;

            var render = <img onClick={this.props.onClick}
                src={photo}
                // Tooltip
                ref={(el)=>{
                    if(el && !el.dataset.tooltipId)
                        $(el).tooltip({delay: 50});
                }}
                className={classNames('circle', 'responsive-img','cursorPointer', {'active': this.props.active})}
                data-position="right" data-tooltip={friend.displayName}
                />;
        }
        return(
            <div className="friend">
                {render}
            </div>
        );
    }
}


reactMixin(Friend.prototype, ReactFireMixin);

export default Friend;
