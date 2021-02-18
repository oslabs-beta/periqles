import * as React from 'react';
import ReactDOM from 'react-dom';
import UserProfile from './components/UserProfile';
import Authors from './components/Authors';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <UserProfile />
      <Authors />
    </React.StrictMode>,
    rootElement,
  );
}
