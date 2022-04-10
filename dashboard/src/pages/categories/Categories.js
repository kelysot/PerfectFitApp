import React from 'react'
import styled from "styled-components";
import CategoriesTable from '../../components/CategoriesTable';
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";

//TODO: work on style

function Categories({nameOfAdmin}) {
  return (
    <CategoryStyle>
        <SideBar/>
        <div className="categoryContainer">
          <TopBar  nameOfAdmin={nameOfAdmin} />
          <div className="categoriesList">
            <CategoriesTable />
          </div>
        </div>
    </CategoryStyle>
  )
}

const CategoryStyle = styled.div`
  display:flex;
  box-shadow:-15px 20px 20px rgb(0 0 0 / 12%);
  width: 100%;
  border-radius:15px;

  .categoryContainer{
    flex:6 ;
    background-color: #f8f0e8a6;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;

    .categoriesList{
      padding: 20px; 
      padding-top: 30px;
    }

  }
`

export default Categories