import * as React from 'react'

const LogoSection = (): JSX.Element => {

  return (
    <div className="LogoSection">
      <img className="periqles-logo marketing-logo" 
      src="../../public/assets/periqles-logo.png" alt="periqles" 
      height="225"
      width="250"/>
      <h2 className="pitch" id="short-pitch">
        Periqles is great!
      </h2>
    </div>
  );
};

export default LogoSection;
