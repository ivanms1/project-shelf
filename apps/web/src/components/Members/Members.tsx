import React from 'react';

import Member from '../Member';

import { flexContainerStyle } from './Members.css';

const Members = () => {
  return (
    <div>
      <div className={flexContainerStyle}>
        {MEMBERS.map((member) => (
          <Member key={member?.id} {...member} />
        ))}
      </div>
    </div>
  );
};

export default Members;

const MEMBERS = [
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
  {
    id: 7,
    name: 'Rohil Pinto',
    username: 'rohilpinto',
  },
];
