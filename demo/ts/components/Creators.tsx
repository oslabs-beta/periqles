import * as React from 'react';
import AuthorCard from './CreatorCard';

const Creators = (): JSX.Element => {
  const authors = [
    {
      img: '../../public/assets/cameron.jpeg',
      name: 'Cameron Baumgartner',
      link: 'https://github.com/cameronbaumgartner',
    },
    {
      img: '../../public/assets/ian.jpeg',
      name: 'Ian Garrett',
      link: 'https://github.com/eeeeean',
    },
    {
      img: '../../public/assets/kelly.jpeg',
      name: 'Kelly Porter',
      link: 'https://github.com/kporter101',
    },
    {
      img: '../../public/assets/joe.jpeg',
      name: 'Joe Toledano',
      link: 'https://github.com/JosephToledano',
    },
  ];

  return (
    <footer>
      <h2>Creators</h2>
      <div className="creators">
        {authors.map((author, index) => <AuthorCard key={index} author={author}/>)}
      </div>
    </footer>
  );
};

export default Creators;