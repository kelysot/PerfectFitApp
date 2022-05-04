import React from 'react';
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import styled from "styled-components";

function SingleProfile({nameOfAdmin}) {
  return (
    <SingleProfileStyle>
        <SideBar/>
        <div className='singleContainer'>
            <TopBar  nameOfAdmin={nameOfAdmin} />
            <div className='cards'>
              <div className='details-card'>Details Cared</div>
              <div className='right'>Graph</div>
            </div>
        </div>
    </SingleProfileStyle>
  )
};

const SingleProfileStyle = styled.div`
  display:flex;
  box-shadow:-15px 20px 20px rgb(0 0 0 / 12%);
  width: 100%;
  min-height: 41rem;
  border-radius:15px;

  .singleContainer{
        flex:6 ;
        background-color: #f8f0e8a6;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px; 
        
        .cards{
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 75vh;

          .details-card{
            width: 350px;
            height: 450px;
            background: #fff;
            box-shadow: 0 35px 80px rgba(0,0,0,0.15);
            border-radius: 20px;
          }
  
          .right {
            width: 350px;
            height: 450px;
            background: #fff;
            box-shadow: 0 35px 80px rgba(0,0,0,0.15);
            border-radius: 20px;
          }
        }
    }
`

export default SingleProfile;