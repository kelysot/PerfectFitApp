import React from 'react';
import styled from "styled-components";

function TopUserChart() {
  return (
    <TopUserChartStyle>
        <TopStyle className="top">
            <h3 className="title">Top Users</h3>
        </TopStyle>
        <BottomStyle className="bottom">

        </BottomStyle>
    </TopUserChartStyle>
  )
};

const TopUserChartStyle = styled.div`
    background-color: #ffffffe8;
    border-radius: 8px;
    box-shadow: 0px -12px 15px rgb(0 0 0 / 10%);
    padding: 10px;
    height: 55vh; // ??
    flex: 3;
`;

const TopStyle = styled.div`
    font-weight: bold;
    font-size: 14px;
    color: var(--color-dark-variant);
`;

const BottomStyle = styled.div`
`;

export default TopUserChart;