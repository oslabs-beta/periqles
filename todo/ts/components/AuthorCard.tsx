/* eslint-disable flowtype/object-type-delimiter */
import * as React from 'react';

interface AuthorCardProps {
  img: string;
  name: string;
  link: string;
}

const AuthorCard = ({author}: AuthorCardProps): JSX.Element => {
  const {img, name, link} = author;

  return (
    <p className="AuthorCard">
      <img src={img} className="author-img"></img>
      {/* <span className="author-name">{name}</span> */}
      <a href={link} className="author-link">{name}</a>
    </p>
  );
};

export default AuthorCard;