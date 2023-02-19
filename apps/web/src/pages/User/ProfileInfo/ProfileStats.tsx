import React from 'react';

function ProfileStats() {
  const arrOfStats = [
    {
      id: '1',
      stats: '250k+',
      title: 'Projects',
    },
    {
      id: '2',
      stats: '50+',
      title: 'Likes',
    },
    {
      id: '3',
      stats: '3000+',
      title: 'Followers',
    },
  ];

  return (
    <div className='flex flex-row gap-20'>
      {arrOfStats.map(({ id, stats, title }) => (
        <div key={id} className='flex flex-col gap-0'>
          <h4 className='text-[28px] font-bold'>{stats}</h4>
          <p className='text-[22px] font-normal'>{title}</p>
        </div>
      ))}
    </div>
  );
}

export default ProfileStats;
