import React from 'react';
import styled from 'styled-components';

let data;

function CardDetails({type,dataCard}) {
  
  data = dataToCard(type,data,dataCard);
  
  return (
    <CardStyle>
      {dataCard && (<>
          <LeftStyled>
            <span className="title">{data.title}</span>
            <span className="counter">{data.counter}</span>
            <span className="message">Compared to last week</span>
          </LeftStyled>
          <RightStyled>
            <div className={dataCard.direction === "up" ? "percentage positive" : dataCard.direction === "down" ? "percentage negative" : "percentage flat"}>
              {data.percent}
              <span className="material-icons-sharp">  {dataCard.direction === "up" ? "trending_up" : dataCard.direction === "down" ? "trending_down" : "trending_flat"}</span>
            </div>
            <span className="material-icons-sharp" id="icon">{data.icon}</span>
          </RightStyled>
        </>)}
    </CardStyle>
  )
};

function dataToCard(type,data,dataCard) {
  switch(type){
    case "onlineUsers":
      data={
        title:"Online Profiles",
        counter: dataCard.direction === 'up'? `+${dataCard.result}` :  dataCard.direction === 'down'? dataCard.result : `+${dataCard.result}`,
        percent: `${dataCard.resultPercent}%`,
        icon:"person_outline",
      };
      break;
      case "newProfiles":
      data={
        title:"New Profiles",
        counter: dataCard.direction === 'up'? `+${dataCard.result}` : dataCard.direction === 'down' ? dataCard.result : `+${dataCard.result}`,
        percent: `${dataCard.resultPercent}%`,
        icon:"account_circle",
      };
      break;
      case "totalUsers":
      data={
        title:"Total Users",
        counter: dataCard.direction === 'up'? `+${dataCard.result}` : dataCard.direction === "down" ? dataCard.result : `+${dataCard.result}`,
        percent: `${dataCard.resultPercent}%`,
        icon:"group",
      };
      break;
      case "totalPosts":
      data={
        title:"Total Posts",
        counter: dataCard.direction === 'up'? `+${dataCard.result}` : dataCard.direction === 'down' ? dataCard.result : `+${dataCard.result}`,
        percent: `${dataCard.resultPercent}%`,
        icon:"post_add",
      };
      break;
    default:
      break;
  }
  return data;
} 

const CardStyle = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding: 10px;
  background-color: #ffffffe8;
  border-radius: 8px;
  box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.18);
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
    &.flat{
      color:var(--color-flatIcon-blue);
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