import React from 'react';
import styled from "styled-components";
import TopUserCard from "../components/TopUserCard";

//TODO: change the list to the profiles not users

function TopUserChart({topUsers}) {
  return (
    <TopUserChartStyle>
        <TopStyle>
          <h3 className="title">Top Users</h3>
        </TopStyle>
        <BottomStyle>
          {topUsers && topUsers.map((user,index) =>(
            <TopUserCard mainProfile = {user.profilesId[0]} key = {index} index = {index}/>
          ))}
        </BottomStyle>
    </TopUserChartStyle>
  )
};

const TopUserChartStyle = styled.div`
    background-color: #ffffffe8;
    border-radius: 8px;
    padding: 10px;
    flex: 3;
    overflow: auto;
`;

const TopStyle = styled.div`
    font-weight: bold;
    font-size: 14px;
    color: var(--color-dark-variant);
    margin-bottom:2.5rem ;
`;

const BottomStyle = styled.div`
  position: relative;
  display:flex;
  flex-direction: column;
`;

export default TopUserChart;