import React from 'react';
import styled from "styled-components";

function PostUploadChart() {
  return (
    <PostUploadChartStyle>
        <TopStyle>
            <h3 className="title">Posts</h3>
        </TopStyle>
        <BottomStyle>

        </BottomStyle>
    </PostUploadChartStyle>
  )
};

const PostUploadChartStyle = styled.div`
    background-color: #ffffffe8;
    box-shadow: 0px -12px 15px rgb(0 0 0 / 10%);
    border-radius: 8px;
    height: 55vh; // ??
    padding: 10px;
    flex: 6;
`;

const TopStyle = styled.div`
    font-weight: bold;
    font-size: 14px;
    color: var(--color-dark-variant);
`;

const BottomStyle = styled.div`
`;

export default PostUploadChart;