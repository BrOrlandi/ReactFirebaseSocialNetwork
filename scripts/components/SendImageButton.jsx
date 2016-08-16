import React from 'react';

export default class SendImageButton extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            ...props
        };
    }

    componentWillReceiveProps(props){
        this.setState({...props});
    }

    sendImage = (event)=>{
        event.preventDefault();
        var file = event.target.files[0];

        // Clear the selection in the file picker input.
        this.refs.mediaCapture.value = '';

        // Check if the file is an image.
        if (!file.type.match('image.*')) {
          Materialize.toast("You can only share images", 4000,"red darken-2");
          return;
        }
        SocialNetwork.sendImage(file, this.state.friend);
    }

    clickImage = (e)=>{
        e.preventDefault();
        this.refs.mediaCapture.click();
    }

    componentDidMount(){
        this.refs.mediaCapture.addEventListener('change', this.sendImage);
    }


    render(){
        if(this.state.friend){
            return(
                <div>
                  <input ref="mediaCapture" type="file" accept="image/*,capture=camera" style={{display:'none'}}/>
                  <button title="Send an image" onClick={this.clickImage} className="btn-flat waves-effect waves-light sendMessage">
                    <i className="material-icons md-40">image</i>
                  </button>
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }
}
