import React from 'react';
import styled from "styled-components";
import TopProfileCard from "./TopProfileCard";

function TopProfilesChart({topProfiles}) {
  return (
    <TopUserChartStyle>
        <TopStyle>
          <h3 className="title">Top Profiles</h3>
        </TopStyle>
        <BottomStyle>
          {topProfiles && topProfiles.map((profile,index) =>(
            <TopProfileCard profile={profile} key = {index} index = {index}/>
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
    min-width: 12rem;
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

export default TopProfilesChart;