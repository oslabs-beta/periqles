import * as 'react'

const LogoSection = (): JSX.Element => {

  return (
    <><div className="LogoSection">
      <img className = "MarketingLogo" src='/public/assets/npm-logo-black.svg' alt="NPM"><a href="" /></img>
      <img className = "MarketingLogo" src='/public/assets/Github-Mark-64px.png' alt="Github"><a href='https://github.com/oslabs-beta/periqles' /></img>
    </div>
      <div className="PitchArea">
        <textarea className = "MarketingPitch" >
        
        </textarea>
      </div></>
  );
};

export default LogoSection;
