import React from 'react';
import styled from 'styled-components';

function CardDetails({type}) {
  let data;

  switch(type){
    case "onlineUsers":
      data={
        title:"Online Users",
        counter:"1",
        icon:"person_outline",
      };
      break;
      case "newProfiles":
      data={
        title:"New Profiles",
        counter:"2",
        icon:"account_circle",
      };
      break;
      case "totalUsers":
      data={
        title:"Total Users",
        counter:"3",
        icon:"group",
      };
      break;
      case "totalPosts":
      data={
        title:"Total Posts",
        counter:"4",
        icon:"post_add",
      };
      break;
    default:
      break;
  }



  return (
    <CardStyle>
        <LeftStyled>
          <span className="title">{data.title}</span>
          <span className="counter">{data.counter}</span>
          <span className="message">Compared to last week</span>
        </LeftStyled>
        <RightStyled>
          <div className="percentage negative">
            20%
            <span className="material-icons-sharp">trending_down</span>
          </div>
          <span className="material-icons-sharp" id="icon">{data.icon}</span>
        </RightStyled>
    </CardStyle>
  )
};


const CardStyle = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding: 10px;
  background-color: #ffffffe8;
  border-radius: 8px;
  box-shadow: 0px -12px 15px rgb(0 0 0 / 10%);
  height:100px; //?
`;

const LeftStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title{
    font-weight: bold;
    font-size: 14px;
    color: var(--color-dark-variant);
  }

  .counter{
    font-size: 28px;
    font-weight: 300;
    padding-left:5px;
  }

  .message{
    font-size: 12px;
  }
`;

const RightStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .percentage{
    display: flex;
    align-items:center;
    font-size: 16px;
    font-weight:bold;
    gap:4px;

    &.positive{
      color:var(--color-upIcon-green);
    }
    &.negative{
      color:var(--color-downIcon-red);
    }
  }
  #icon{
    padding:5px;
    font-size: 22px;
    color: var(--color-dark-variant);
    display: flex;
    justify-content: end;
  }

`;
export default CardDetails;