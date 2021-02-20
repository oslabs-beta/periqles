import * as React from 'react';
import ReactDOM from 'react-dom';
import UserProfile from './components/UserProfile';
import Creators from './components/Creators';
import LogoSection from './components/LogoSection';
import LinksSection from './components/LinksSection';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <header>
        {/* header returns user to top of page on click */}
        <h1><a href="#">periqles</a></h1>
      </header>
      <LogoSection />
      <LinksSection />
      <UserProfile />
      <Creators />
    </React.StrictMode>,
    rootElement,
  );
}
