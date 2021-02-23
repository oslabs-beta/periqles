import * as React from 'react'

const LinksSection = (): JSX.Element => {

  return (
    <div className="LinksSection">
      <h3 className="pitch" id="long-pitch">
        Periqles is a component library for Relay and Apollo that makes collecting user input easy, fast, and DRY. 
        <br/>
        <br/>Periqles abstracts away the dirty work of form creation — with override switches built in for the design-conscious developer — so you can be free to focus on business logic.
      </h3>
      <div className="repo-logos">
        <a href="">
          <img className="marketing-logo" 
          src="../../public/assets/npm-logo-black.png" 
          alt="NPM" 
          width="100"/>
        </a>
        <a href="https:\/\/github.com/oslabs-beta/periqles">
          <img className="marketing-logo" 
          src="../../public/assets/Github-Mark-64px.png" 
          alt="Github" 
          width="75"/>
        </a>
      </div>
    </div>
  );
};

export default LinksSection;
