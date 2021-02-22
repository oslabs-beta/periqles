import * as React from 'react'

const LogoSection = (): JSX.Element => {

  return (
    <div className="LogoSection">
      <img id="periqles-logo"
      className="marketing-logo" 
      src="../../public/assets/periqles-logo.png" alt="periqles"/>
      <h2 className="pitch" id="short-pitch">
        Painless forms for GraphQL.
      </h2>
    </div>
  );
};

export default LogoSection;
