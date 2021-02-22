import * as React from 'react';
import ReactDOM from 'react-dom';
import UserProfile from './components/UserProfile';
var rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.render(React.createElement(React.StrictMode, null,
        React.createElement(UserProfile, null)), rootElement);
}
