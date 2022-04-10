import React from 'react'
import styled from "styled-components";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";

//TODO: work on style and pass relevant data 

function Categories({ nameOfAdmin}) {
  return (
    <CategoryStyle>
        <SideBar/>
        <div className="categoryContainer">
          <TopBar  nameOfAdmin={nameOfAdmin} />
          {/* <div className="cardsDetails">
          </div>
          <div className="charts">
          </div> */}
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

    .cardsDetails , .charts{
      display: flex;
      padding: 20px; 
      gap: 20px;
      justify-content: space-around;
      padding-top: 30px;
    }

    .charts{
      padding-top: 10px ;
    }
    
  }
  
`

export default Categories