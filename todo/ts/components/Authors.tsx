import * as React from 'react';
import AuthorCard from './AuthorCard';

const Authors = (): JSX.Element => {
  const authors = [
    {
      // img: '../../public/assets/cameron.jpeg',
      img: '/public/assets/cameron.jpeg',
      name: 'Cameron Baumgartner',
      link: 'https://github.com/cameronbaumgartner',
    },
    {
      img: '../../public/assets/cameron.jpeg',
      name: 'Ian Garrett',
      link: 'https://github.com/eeeeean',
    },
    {
      img: '../../public/assets/cameron.jpeg',
      name: 'Kelly Porter',
      link: 'https://github.com/kporter101',
    },
    {
      img: '../../public/assets/cameron.jpeg',
      name: 'Joe Toledano',
      link: 'https://github.com/JosephToledano',
    },
  ];

  return (
    <div className="Authors">
      {authors.map((author, index) => <AuthorCard key={index} author={author}/>)}
    </div>
  );
};

export default Authors;