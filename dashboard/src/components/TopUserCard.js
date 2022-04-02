import React, {useState} from 'react';
import styled from 'styled-components';

//TODO: According to the type use the colors wgo relevant to place

function TopUserCard({mainProfile ,index}) {
  console.log(index);  
  return (
    <CardStyle>
        <div className="lines line1"></div>
        <h3>{mainProfile}</h3>
        <span className="material-icons-sharp">workspace_premium</span>
    </CardStyle>
  )
};

const CardStyle = styled.div`
    display: flex;
    align-items: center;
    border-radius:8px;
    background:#e4cb912e;
    margin:0.3rem 0rem;

    .lines{
        flex: 0.3;
        height: initial;
        padding: 1.5rem 2px;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        margin-right:0.5rem ;
    }
    .line1{
      background-color:#E4CB91;
    }
    .line2{
      background-color:#A6A6A6;
    }
    .line3{
      background-color: #D99771;
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