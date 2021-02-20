import * as React from 'react'

const LinksSection = (): JSX.Element => {

  return (
    <div className="LogoSection">
      <a href="">
        <img className="MarketingLogo" src="/public/assets/npm-logo-black.svg" alt="NPM" />
      </a>
      <a href="https:\/\/github.com/oslabs-beta/periqles">
        <img className = "MarketingLogo" src="/public/assets/Github-Mark-64px.png" alt="Github" />
      </a>
    
      // <div className="PitchArea">
      <p className = "MarketingPitch" >
        Periqles is great! Periqles is awesome! Give periqles a try today!
      </p>
      // </div>
    </div>
  );
};

export default LinksSection;
