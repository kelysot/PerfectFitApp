import React, {useState} from 'react';
import styled from 'styled-components';

//TODO: According to the type use the colors wgo relevant to place
let data ="";

function TopUserCard({mainProfile ,index}) {

  data = dataToCard(index);

  return (
    <CardStyle style={{backgroundColor:`${data.background}`}}>
        <div className={data.lineClassName}></div>
        <h2 className="place">{index+1}</h2>
        <h3>{mainProfile}</h3>
        {data.icon ? 
          <span className={"material-icons-sharp"} style={{color:`${data.iconColor}`}}>workspace_premium</span>
          : ""
        }
    </CardStyle>
  )
};

const CardStyle = styled.div`
    display: flex;
    align-items: center;
    border-radius:8px;
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

    h2{
      font-size: 25px;
      padding-right: 14px;
      color: var(--color-dark-variant);
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
    }
`;

function dataToCard(index){
  switch(index) {
    case 0:
      data = {
        lineClassName: 'lines line1',
        background:'#e4cb912e',
        iconColor:'#d7b25e',
        icon: true
      }
    break;
    case 1:
      data = {
        lineClassName: 'lines line2',
        background:'#a6a6a626',
        iconColor:'#a6a6a6',
        icon: true
      }
    break;
    case 2:
      data = {
        lineClassName: 'lines line3',
        background:'#d9977136',
        iconColor:'#d99771',
        icon: true
      }
    break;
    default:
      data = {
        lineClassName: 'lines',
        background:'#bce1f459',
        icon: false
      }
  }
  return data;
}

export default TopUserCard;