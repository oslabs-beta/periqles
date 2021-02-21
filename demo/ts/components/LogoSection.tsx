import * as React from 'react'

const LogoSection = (): JSX.Element => {

  return (
    <div className="LogoSection">
      <h2 className="pitch" id="short-pitch">
        Periqles is great!
      </h2>
      <img className="periqles-logo marketing-logo" src="../../public/assets/periqles-logo/png" alt="periqles" />
    </div>
  );
};

export default LogoSection;
