import React from 'react';

import MessageList from './MessageList';
import MessageForm from './MessageForm';

class MessageBoard extends React.Component {
    render(){
        if(!this.props.friend){
            return (<div className="messages">
                    <div className="card-panel white center-align">
                        Select an conversation on the left.
                    </div>
                </div>);
        }

        return(
            <div className="messages">
                {/* Here goes the messages */}
                <MessageList {...this.props}/>

                {/* Here goes the form to send messages */}
                <MessageForm {...this.props} />
            </div>
        );
    }
}


export default MessageBoard;
