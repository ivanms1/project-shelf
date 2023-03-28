import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function Index({ fillColor }) {
  console.log({ fillColor });
  const data = [
    {
      name: 'Sunday',
      project: 1,
    },
    {
      name: 'Monday',
      project: 20,
    },
    {
      name: 'Tuesday',
      project: 10,
    },
    {
      name: 'Wednesday',
      project: 5,
    },
    {
      name: 'Thursday',
      project: 18,
    },
    {
      name: 'Friday',
      project: 3,
    },
    {
      name: 'Saturday',
      project: 7,
    },
  ];

  return (
    <div className='h-[100%] w-[100%]'>
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: -30,
            bottom: 0,
          }}
        >
          {fillColor && (
            <defs>
              <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='20%' stopColor={fillColor} stopOpacity={0.7} />
                <stop offset='100%' stopColor='#FFFFFF' stopOpacity={0.6} />
              </linearGradient>
            </defs>
          )}

          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Area
            type='monotone'
            dataKey='project'
            stroke={fillColor}
            fill='url(#colorUv)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Index;
