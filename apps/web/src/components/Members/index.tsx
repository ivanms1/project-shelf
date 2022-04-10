import React from 'react';
import Member from '../Member';
import Link from 'next/link';
import { StyledMembers, FlexContainer, Header } from './styles';

// fetch from DB later with NextJS functions? Or, just leave this array here?
const members = [
  {
    id: 1,
    name: 'Simon',
    username: 'simonhlee97',
  },
  {
    id: 2,
    name: 'Ivan',
    username: 'ivanms1',
  },
  {
    id: 3,
    name: 'Mina',
    username: 'jm066',
  },
  {
    id: 4,
    name: 'Jakhongir',
    username: 'jahon93',
  },
  {
    id: 5,
    name: 'Joe',
    username: 'joemcgee4151986',
  },
];

const Members = () => {
  return (
    <StyledMembers>
      <Header>PROJECT SHELF Contributors</Header>
      <FlexContainer>
        {members.map((member) => (
          <Member key={member?.id} {...member} />
        ))}
      </FlexContainer>
      <section>
        <Link href='https://github.com/project-shelf/project-shelf'>
          <a>To contribute or to learn more about Project Shelf</a>
        </Link>
      </section>
    </StyledMembers>
  );
};

export default Members;
