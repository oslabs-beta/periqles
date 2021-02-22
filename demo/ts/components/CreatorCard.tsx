/* eslint-disable flowtype/object-type-delimiter */
import * as React from 'react';

interface AuthorCardProps {
  key: number;
  author: {
    img: string;
    name: string;
    link: string;
  }
}

const CreatorCard = ({author}: AuthorCardProps): JSX.Element => {
  const {img, name, link} = author;

  return (
    <p className="AuthorCard">
      {/* <img className="author-img" 
      src={img} 
      alt={name}
      width="75"
      height="75"></img> */}
      <a href={link} className="author-link">{name}</a>
    </p>
  );
};

export default CreatorCard;