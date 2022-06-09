import React,{useState}  from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';

function SideBar() {
  return (
    <SideBarStyle>
        <TopStyle>
          <img src=""></img>
          <StyledLinkLogo to="/home"><h2>Perfect<span>Fit</span></h2></StyledLinkLogo>
        </TopStyle>
        <CenterStyle>
          <ul>
            <StyledLink to="/home">
              <li>
                  <span className="material-icons-sharp">dashboard</span>
                  <h3>Dashboard</h3>
              </li>
            </StyledLink>
              <StyledLink to="/categories">
                <li>
                    <span className="material-icons-sharp">category</span>
                    <h3>Categories</h3>
                </li>
              </StyledLink>
            <StyledLink to="/users">
              <li>
                  <span className="material-icons-sharp">person</span>
                  <h3>Profiles</h3>
              </li>
            </StyledLink>
            <StyledLink to="/setting">
              <li>
                  <span className="material-icons-sharp">settings</span>
                  <h3>Setting</h3>
              </li>
              </StyledLink>
            <StyledLink to="/">
              <li>
                  <span className="material-icons-sharp">logout</span>
                  <h3>Log Out</h3>
              </li>
            </StyledLink>
          </ul>
        </CenterStyle>
    </SideBarStyle>
  )
}

const SideBarStyle = styled.div`
  flex:1;
  min-height:82vh;
  background-color: #f8f0e8;
  position :relative;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  min-width: 12.5rem;
`;

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

const CenterStyle = styled.div`
  ul{
    list-style: none;
    padding-top:1.5rem;
    display: flex;
    flex-direction: column;
  }

  a{
    display: flex;
    gap: 0.8rem;
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
    padding:1rem 1.5rem;
    cursor: pointer;
    transition: all 300ms ease;
    width: 100%;
    border-top-left-radius: 18px;
    border-bottom-left-radius: 18px;

    a,h3,span{
      color:var(--color-dark-variant);
      text-decoration:none; ;
    }

    &:hover{
      background: linear-gradient(to right,#7380ec47 0%,#f8f0e800 90%);
      transform: translateX(1rem);
      a,h3,span{
        color:var(--color-primary-purple);
      }
    }
  }
`;

const StyledLinkLogo = styled(Link)`
  text-decoration: none;
  color:  var(--color-primary-purple);

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color:  var(--color-dark-variant);

  &:hover {
    color:var(--color-primary-purple);
  }
`

export default SideBar