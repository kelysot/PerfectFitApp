import React from 'react'
import styled from 'styled-components';

//TODO: add image to the logo div
function SideBar() {
  return (
    <SideBarStyle>
        <TopStyle>
          <img src=""></img>
          <h2>Perfect<span>Fit</span></h2>
        </TopStyle>
        <CenterStyle>
          <ul>
            <li>
              <span class="material-icons-sharp">dashboard</span>
              <h3>Dashboard</h3>
            </li>
            <li>
              <span class="material-icons-sharp">category</span>
              <h3>Categories</h3>
            </li>
            <li>
            <span class="material-icons-sharp">person</span>
              <h3>Profile</h3>
            </li>
            <li>
              <span class="material-icons-sharp">settings</span>
              <h3>Setting</h3>
            </li>
            <li>
            <span class="material-icons-sharp">logout</span>
              <h3>Log Out</h3>
            </li>
          </ul>
        </CenterStyle>
        <div className="bottom">user and themes</div>
    </SideBarStyle>
  )
}

const TopStyle = styled.div`
  color: #896584;
  min-height:50px;
  display:flex;
  align-items: center;
  justify-content: center;
  h2{
    font-size:2.5rem;
    padding-top:1rem;
    span{
      color: #f3af6b;
    }
  }
`;

const SideBarStyle = styled.div`
  flex:1.2;
  min-height:82vh;
  background-color: #f8f0e8;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  box-shadow: 0px 0px 15px rgb(0 0 0 / 36%);
`;

const CenterStyle = styled.div`
  ul{
    list-style: none;

  }
  li{
    display:flex;
    gap: 0.8rem;
    min-height:0.5rem;
    align-items: center;
    padding:1rem;
    cursor: pointer;

    &:hover{
      background-color:#475ba1;
    }
  }
`;

export default SideBar