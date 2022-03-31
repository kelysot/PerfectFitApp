import React from 'react';
import styled from "styled-components";

function PopularCategoriesChart() {
  return (
    <PopularCategoriesChartStyle>
        <TopStyle>
            <h3 className="title">Popular Categories</h3>
        </TopStyle>
        <BottomStyle>

        </BottomStyle>
    </PopularCategoriesChartStyle>
  )
};

const PopularCategoriesChartStyle = styled.div`
    background-color: #ffffffe8;
    border-radius: 8px;
    box-shadow: 0px -12px 15px rgb(0 0 0 / 10%);
    padding: 10px;
    /* height: 55vh; // ?? */
    flex:4;
`;

const TopStyle = styled.div`
    font-weight: bold;
    font-size: 14px;
    color: var(--color-dark-variant);
`;

const BottomStyle = styled.div`
`;

export default PopularCategoriesChart;