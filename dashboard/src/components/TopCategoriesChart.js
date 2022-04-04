import React from 'react';
import styled from "styled-components";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


function TopCategoriesChart() {
  return (
    <TopCategoriesChartStyle>
        <TopStyle>
            <h3 className="title">Top Categories</h3>
        </TopStyle>
        <BottomStyle>
          <ResponsiveContainer width="100%" height="100%">
            
        <AreaChart width={730} height={250} data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="male" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          <Area type="monotone" dataKey="female" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
        </ResponsiveContainer>
        </BottomStyle>
    </TopCategoriesChartStyle>
  )
};

const TopCategoriesChartStyle = styled.div`
    background-color: #ffffffe8;
    box-shadow: 0px -12px 15px rgb(0 0 0 / 10%);
    border-radius: 8px;
    padding: 10px;
    flex: 6;
`;

const TopStyle = styled.div`
    font-weight: bold;
    font-size: 14px;
    color: var(--color-dark-variant);
    margin-bottom:15px ;
`;

const BottomStyle = styled.div`
  width:100% ;
  aspect-ratio: 1.1/1;
`;

const data = [
  {
    name: 'Page A',
    male: 4000,
    female: 2400,
  },
  {
    name: 'Page B',
    male: 3000,
    female: 1398,
  },
  {
    name: 'Page C',
    male: 2000,
    female: 9800,
  },
  {
    name: 'Page D',
    male: 2780,
    female: 3908,
  },
  {
    name: 'Page E',
    male: 1890,
    female: 4800,
  },
  {
    name: 'Page F',
    male: 2390,
    female: 3800,
  },
  {
    name: 'Page G',
    male: 3490,
    female: 4300,
  },
];


export default TopCategoriesChart;