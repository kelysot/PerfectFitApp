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
            <h1>Single Profile</h1>
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
    }
`

export default SingleProfile;