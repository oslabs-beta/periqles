import * as React from 'react'

const LinksSection = (): JSX.Element => {

  return (
    <div className="LinksSection">
      <h3 className="pitch" id="long-pitch">
        Periqles is great! Periqles is awesome! Give periqles a try today!
      </h3>
      <div className="repo-logos">
        <a href="">
          <img className="marketing-logo" 
          src="../../public/assets/npm-logo-black.png" 
          alt="NPM" 
          width="75"
          height="50"/>
        </a>
        <a href="https:\/\/github.com/oslabs-beta/periqles">
          <img className="marketing-logo" 
          src="../../public/assets/Github-Mark-64px.png" 
          alt="Github" 
          width="75"
          height="75"/>
        </a>
      </div>
    </div>
  );
};

export default LinksSection;
