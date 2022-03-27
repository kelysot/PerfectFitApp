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
  color:  var(--color-primary-purple);
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
  min-width: 14rem;
`;

const CenterStyle = styled.div`
  ul{
    list-style: none;
  }

  li:hover:before{
    content:"";
    height:1.6rem;
    width:2.5px;
    background-color:var(--color-primary-purple) ;
  }

  li{
    display:flex;
    gap: 0.8rem;
    min-height:0.5rem;
    align-items: center;
    padding:1rem;
    cursor: pointer;
    transition: all 300ms ease;

    h3,span{
      color:var(--color-dark-variant);
    }

    &:hover{
      background: linear-gradient(to right,#7380ec5e 0%,#475ba105 100%);
      transform: translateX(1rem);
      h3,span{
        color:var(--color-primary-purple);
      }
    }
  }

`;

export default SideBar