import React from 'react';
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import styled from "styled-components";

function SingleCategory({nameOfAdmin}) {
  return (
    <SingleCategoryStyle>
       <SideBar/>
        <div className='singleContainer'>
          <TopBar  nameOfAdmin={nameOfAdmin} />
          <div className='singleCategoryContainer'>
            <div className='top'>
              <div className='left'>
                <h1 className='title'>Information</h1>
                <div className='item'>
                  <img src='https://cdn.pixabay.com/photo/2022/02/16/18/10/fox-7017260_960_720.jpg' alt=''></img>
                  Details
                </div>
              </div>
              <div className='right'></div>
            </div>
            <div className='bottom'></div>
          </div>
        </div>
    </SingleCategoryStyle>
  )
}

const SingleCategoryStyle = styled.div`
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

    .singleCategoryContainer{
      padding: 20px; 
      padding-top: 30px;
      display:flex;
      align-items: center;
    }

    .top{
      display: flex;
      padding: 20px;

      .left{
        flex: 1;
        box-shadow:-15px 20px 20px rgb(0 0 0 / 12%);
        border-radius:15px;
        background-color:#ffffffe8;
        padding: 20px;

        .item{
          display: flex;
          gap: 20px;
          img{
            height: 100px;
            width: 100px;
            object-fit: cover;
            border-radius: 50%;
          }
        }
      }

      .right{
        flex: 2;
      }
    }

  }
`

export default SingleCategory;