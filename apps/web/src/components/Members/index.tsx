import React from 'react';
import Member from '../Member';
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
  {
    id: 6,
    name: 'Miroz Devkota',
    username: 'revengemiroz',
  },
];

const Members = () => {
  return (
    <StyledMembers>
      <Header>Project-Shelf Contributors</Header>
      <FlexContainer>
        {members.map((member) => (
          <Member key={member?.id} {...member} />
        ))}
      </FlexContainer>
    </StyledMembers>
  );
};

export default Members;
