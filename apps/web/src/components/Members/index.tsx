import React from 'react';
import Member from '../Member';
import { StyledMembers, FlexContainer } from './styles';

// tslint:disable-next-line:no-empty-interface
interface MembersProps {}

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
    name: 'Joe',
    username: 'jm066',
  },
];

const Members = ({}: MembersProps) => {
  return (
    <>
      <StyledMembers>
        <h2>Core Team</h2>
        <FlexContainer>
          {members.map((member) => (
            <Member name={member.name} username={member.username} {...member} />
          ))}
        </FlexContainer>
      </StyledMembers>
    </>
  );
};

export default Members;
