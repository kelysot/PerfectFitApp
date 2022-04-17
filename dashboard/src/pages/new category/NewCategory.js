import React from 'react';
import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar';
import styled from "styled-components";

function NewCategory({nameOfAdmin}) {
  return (
    <NewCategoryStyle>
      <SideBar/>
        <div className="newCategoryContainer">
          <TopBar  nameOfAdmin={nameOfAdmin} />
          <div className="top">
            <h1>New Category</h1>
          </div>
          <div className="bottom">
            <div className="left">
              <img src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"></img>
            </div>
            <div className="right">right</div>
          </div>
        </div>
    </NewCategoryStyle>
  )
}

const NewCategoryStyle = styled.div`
  display:flex;
  box-shadow:-15px 20px 20px rgb(0 0 0 / 12%);
  width: 100%;
  min-height: 41rem;
  border-radius:15px;

  .newCategoryContainer{
    flex:6 ;
    background-color: #f8f0e8a6;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  .top{
    box-shadow: -6px -15px 20px rgb(0 0 0 / 12%);
    border-radius:12px;
    background-color: #ffffffe8;
    padding: 0.8rem;
    width: 90%;
    align-items: center;
    margin: auto;
    margin-top: 1.3rem;
    
    h1{
      font-size: 18px;
      color: var(--color-dark-variant);
    }
  }

  .bottom{
    margin: 20px 60px;
    padding: 10px;
    display: flex;
    background-color: #ffffffe8;
    box-shadow: -6px -15px 20px rgb(0 0 0 / 12%);
    border-radius: 15px;
    
    .left{
      flex: 1;
      display: flex;
      
      img{
        height: 200px;
        width: 200px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .right{
      flex: 2;
    }
  }

`;

export default NewCategory;