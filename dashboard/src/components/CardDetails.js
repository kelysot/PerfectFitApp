import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

let data;

function CardDetails({type}) {
  
  const [numOfPosts,setNumOfPosts]=useState(null);
  const [numOfUsers,setNumOfUsers]=useState(null);
  const [numOnlineProfiles,setNumOnlineProfiles]=useState(null);
  data = dataToCard(type,data , numOfPosts , numOfUsers ,numOnlineProfiles);
  
  useEffect(() =>{    
      fetch("/dashboard/amounts" ,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then((res) => res.json())
          .then((data) => {
            setNumOfPosts(data.numOfPosts);
            setNumOfUsers(data.numOfUsers);
            setNumOnlineProfiles(data.numOnlineProfiles);
            })
  },[]);

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

function dataToCard(type,data, numOfPosts , numOfUsers ,numOnlineProfiles) {
  //todo : add no change icon "trending_flat" + use the relevet class name + compre to last week
  switch(type){
    case "onlineUsers":
      data={
        title:"Online Profiles",
        counter:numOnlineProfiles ? numOnlineProfiles : "--",
        icon:"person_outline",
      };
      break;
      case "newProfiles":
      data={
        title:"New Profiles",
        counter:"--",
        icon:"account_circle",
      };
      break;
      case "totalUsers":
      data={
        title:"Total Users",
        counter:numOfUsers ? numOfUsers : "--",
        icon:"group",
      };
      break;
      case "totalPosts":
      data={
        title:"Total Posts",
        counter:numOfPosts ? numOfPosts : "--",
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
  box-shadow: 0px -12px 15px rgb(0 0 0 / 10%);
  height:100px; //?
  min-width: 11rem;
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