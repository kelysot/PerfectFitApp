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

`;

export default NewCategory;