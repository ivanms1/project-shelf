import React from 'react';
import Member from '../Member';
import { StyledMembers } from './styles';

interface MembersProps {}

// fetch from DB later with NextJS functions? Or, just leave this array here?
const members = [
  {
    id: 1,
    name: 'Simon',
    profile: 'simonhlee97',
  },
  {
    id: 2,
    name: 'Ivan',
    profile: 'ivan',
  },
  {
    id: 3,
    name: 'Joe',
    profile: 'joe',
  },
];

const Members = ({}: MembersProps) => {
  return (
    <>
      <StyledMembers>
        <h2>Core Team</h2>
        <ul>
          {members.map((member) => (
            <Member name={member.name} profile={member.profile} />
          ))}
        </ul>
      </StyledMembers>
    </>
  );
};

export default Members;
