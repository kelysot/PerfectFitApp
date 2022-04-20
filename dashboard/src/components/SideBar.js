import React,{useState}  from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';

//TODO: add image to the logo div + //TODO: add link to go in profile && setting
function SideBar() {

  const menuitems = document.querySelectorAll("li");
  const[currentIndex,setCurrentIndex] = useState(0);

  // menuitems.forEach((item,index) =>{
  //   if(index === 0 && currentIndex === 0)
  //     item.classList.add("active-item");
  // });

  const handlerSelectItem = (index)=>{
    if(index !== currentIndex){
      menuitems.forEach((item)=>{
        item.classList.remove("active-item");
      })
      setCurrentIndex(index);
      menuitems[index].classList.add("active-item");
    }
  };

  return (
    <SideBarStyle>
        <TopStyle>
          <img src=""></img>
          <StyledLinkLogo to="/"><h2>Perfect<span>Fit</span></h2></StyledLinkLogo>
        </TopStyle>
        <CenterStyle>
          <ul>
            <StyledLink to="/"  onClick={()=> handlerSelectItem(0)}>
              <li>
                  <span className="material-icons-sharp">dashboard</span>
                  <h3>Dashboard</h3>
              </li>
            </StyledLink>
              <StyledLink to="/categories" onClick={()=> handlerSelectItem(1)}>
                <li>
                    <span className="material-icons-sharp">category</span>
                    <h3>Categories</h3>
                </li>
              </StyledLink>
            <StyledLink to=""  onClick={()=> handlerSelectItem(2)}>
              <li>
                  <span className="material-icons-sharp">person</span>
                  <h3>Profile</h3>
              </li>
            </StyledLink>
            <StyledLink to=""  onClick={()=> handlerSelectItem(3)}>
              <li>
                  <span className="material-icons-sharp">settings</span>
                  <h3>Setting</h3>
              </li>
              </StyledLink>
            <StyledLink to="/login"  onClick={()=> handlerSelectItem(4)}>
              <li>
                  <span className="material-icons-sharp">logout</span>
                  <h3>Log Out</h3>
              </li>
            </StyledLink>
          </ul>
        </CenterStyle>
        <BottomStyle>
          <div className="color-option"></div>
          <div className="color-option"></div>
        </BottomStyle>
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


  //FIXME: problem when move between pages for now dont show the current page
  /* .active-item{
    transform: translateX(1rem);
    a,h3,span{
      color:var(--color-primary-purple);
    }

    &:before{
      content:"";
      height:1.6rem;
      width:2.5px;
      background-color:var(--color-primary-purple);
    }
  } */

`;

const BottomStyle = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-around;
  padding: 2rem 3.8rem;
  position: absolute;
  bottom: 0;
  gap: 2rem;

  .color-option{
    width: 35px;
    height: 35px;
    border-radius: 30%;
    cursor: pointer;
    border: 1.5px solid var( --color-dark-variant);
    transition: all 0.3s ease;
    
    &:nth-child(1){
      background-color: #f8f0e8;
    }

    &:nth-child(2){
      background-color: #333;
    }

    &:hover{
      transform: scale(1.1);
      border: 1.8px solid var( --color-dark-variant);
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