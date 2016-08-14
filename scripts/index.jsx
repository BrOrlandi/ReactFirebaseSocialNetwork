var $ = window.jQuery = require('jquery');
require('materialize-css/bin/materialize.js');

import ReactDOM from 'react-dom';
import React from 'react';

// Import firebase


class App extends React.Component {
    render(){
        return (
            <div>
                <h1>Hello React App!</h1>
            </div>
        );
    }
};
ReactDOM.render(<App/>, document.getElementById('react-body'));
