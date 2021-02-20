import * as React from 'react';
import ReactDOM from 'react-dom';
import UserProfile from './components/UserProfile';
import Authors from './components/Authors';
import LogoSection from './components/LogoSection';
import LinksSection from './components/LinksSection';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <header>
        <h1><a href="">periqles</a></h1>
      </header>
      <LogoSection />
      <LinksSection />
      <UserProfile />
      <footer>
        <Authors />
      </footer>
    </React.StrictMode>,
    rootElement,
  );
}
