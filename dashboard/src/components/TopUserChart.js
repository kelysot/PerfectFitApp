import React from 'react';
import styled from "styled-components";
import TopUserCard from "../components/TopUserCard";

function TopUserChart() {
  return (
    <TopUserChartStyle>
        <TopStyle>
            <h3 className="title">Top Users</h3>
        </TopStyle>
        <BottomStyle>
          <TopUserCard type="firstPlace"/>
          <TopUserCard  type="secondPlace"/>
          <TopUserCard  type="thirdPlace"/>
          <TopUserCard  type="anotherPlace"/>
        </BottomStyle>
    </TopUserChartStyle>
  )
};

const TopUserChartStyle = styled.div`
    background-color: #ffffffe8;
    border-radius: 8px;
    padding: 10px;
    flex: 3;
`;

const TopStyle = styled.div`
    font-weight: bold;
    font-size: 14px;
    color: var(--color-dark-variant);
    margin-bottom:2.5rem ;
`;

const BottomStyle = styled.div`
`;

export default TopUserChart;