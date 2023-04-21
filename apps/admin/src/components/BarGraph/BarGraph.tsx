import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { BAR_GRAPH_DATA } from 'const';
interface BarGraphProps {
  fillColor: string;
}

function BarGraph({ fillColor }: BarGraphProps) {
  return (
    <div className='h-full w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart
          width={500}
          height={300}
          data={BAR_GRAPH_DATA}
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

export default BarGraph;
