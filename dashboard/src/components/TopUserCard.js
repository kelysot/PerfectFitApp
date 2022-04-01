import React from 'react';
import styled from 'styled-components';

//TODO: According to the type use the colors wgo relevant to place

function TopUserCard({type}) {
  return (
    <CardStyle>
        <div className="line"></div>
        <h3>Name Of First Place User</h3>
        <span className="material-icons-sharp">workspace_premium</span>
    </CardStyle>
  )
};

const CardStyle = styled.div`
    display: flex;
    margin-top:2rem;
    align-items: center;
    border-radius:8px;
    background:#e4cb912e;
    
    .line{
        flex: 0.3;
        background-color:#E4CB91;
        height: initial;
        padding: 1.5rem 2px;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        margin-right:0.5rem ;
    }

    h3{
        flex:10;
        font-size:16px;
        color: var(--color-dark-variant);
    }

    span{
        flex:2;
        display: flex;
        justify-content: end;
        color:#d7b25e;
    }
`;

export default TopUserCard;