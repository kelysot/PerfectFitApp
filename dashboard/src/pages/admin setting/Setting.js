import React from 'react';
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import styled from "styled-components";

function Setting() {
  return (
    <SettingStyle>
        <SideBar/>
        <div className='settingContainer'>
            <TopBar />
            <h1>Setting</h1>
        </div>
    </SettingStyle>
  )
};

const SettingStyle = styled.div`
  display:flex;
  box-shadow:-15px 20px 20px rgb(0 0 0 / 12%);
  width: 100%;
  min-height: 40rem;
  border-radius:15px;

  .settingContainer{
        flex:6 ;
        background-color: #f8f0e8a6;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;   
    }
`

export default Setting;