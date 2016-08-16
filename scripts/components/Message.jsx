import React from 'react';

import classNames from 'classnames';

import firebase from 'firebase';

export default class Message extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        };
    }

    checkImage(props){
        // load firebase image
        if(props.imageUrl && props.imageUrl !== true){
            if (props.imageUrl.startsWith('gs://')) {
              firebase.storage().refFromURL(props.imageUrl).getMetadata().then((metadata)=>{
                this.setState({image: metadata.downloadURLs[0]});
              });
          }else{
              this.setState({image: props.imageUrl});
          }
        }
    }

    componentWillMount(){
        this.checkImage(this.props);
    }

    componentWillReceiveProps(props){
        this.checkImage(props);
    }


    render(){
        var messageClass;

        // Checking the receipt to apply the propers css class
        if(this.props.from == SocialNetwork.getUser().uid){
            messageClass = 'userMessage';
        }
        else{
            messageClass = 'othersMessage';
        }

        var formatDate = (date)=>{
            var h = date.getHours();
            var m = date.getMinutes();
            if(m < 10){
                m = "0"+m;
            }
            return h+":"+m;
        }

        var message;
        if(this.props.message){
            message = <div>{this.props.message}</div>;
        }else if(this.props.imageUrl){
            if(this.state.image){
                message = <img src={this.state.image} onLoad={this.props.updateScroll}/>;
            }else{
                message = <div className="loading-spinner"></div>
            }
        }

        return(
            <div className={"chatMessage "+messageClass}>
                {/* Message content (div ensures that the display mode is block) */}
                {message}
                {/* Timestamp (div ensures that the display mode is block again) */}
                <div className="timestamp">{formatDate(new Date(this.props.date))}</div>
            </div>
        );
    }
}
