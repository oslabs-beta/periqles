import * as React from 'react';
import ReactDOM from 'react-dom';
import UserProfile from './components/UserProfile';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <UserProfile />
    </React.StrictMode>,
    rootElement,
  );
}
