import React from 'react';

import SendImageButton from './SendImageButton';

export default class MessageForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            ...props
        };
    }

    componentWillReceiveProps(props){
        this.setState({...props});
    }

    sendMessage = (e)=>{
        e.preventDefault();
        if(this.refs.messageField.value !== ''){
            SocialNetwork.sendMessage(this.refs.messageField.value, this.state.friend);
            this.refs.messageField.value = "";
        }
    }

    componentDidMount(){
        $(this.refs.messageField).focus();
    }

    componentDidUpdate(){
        $(this.refs.messageField).focus();
    }

    render(){
        if(this.state.friend){
            return(
                <form className="messageForm" onSubmit={this.sendMessage}>
                    <input type="text" ref="messageField" />
                    <button className="btn-flat waves-effect waves-light sendMessage" type="submit">
                        <i className="material-icons md-40">send</i>
                    </button>
                    <SendImageButton friend={this.state.friend}/>
                </form>
            );
        }
        else {
            return (<div></div>);
        }
    }
}
