import React from 'react';
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import styled from "styled-components";

//TODO: Add Chart to right + get data from server  

function SingleCategory({nameOfAdmin}) {
  return (
    <SingleCategoryStyle>
       <SideBar/>
        <div className='singleContainer'>
          <TopBar  nameOfAdmin={nameOfAdmin} />
          <div className='singleCategoryContainer'>
            <div className='top'>
              <div className='left'>
                <div className='editButton'>Edit</div>
                <h1 className='title'>Information</h1>
                <div className='item'>
                  <img src='https://cdn.pixabay.com/photo/2022/02/16/18/10/fox-7017260_960_720.jpg' alt=''></img>
                  <div className='details'>
                    <h3 className='category-title'>Category Title</h3>
                    <div className='detailsItem'>
                      <span className="item-key">Category Gender:</span>
                      <span className="item-value">Male</span>
                    </div>
                    <div className='detailsItem'>
                      <span className="item-key">Total Posts:</span>
                      <span className="item-value">1</span>
                    </div>
                    <div className='detailsItem'>
                      <span className="item-key">Percent Of Total Posts:</span>
                      <span className="item-value">25%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='right'>

              </div>
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

  .title{
    font-size:16px;
    color: #8a93ec;
    margin-bottom: 20px;
  }

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
        box-shadow: 5px -5px 8px rgb(0 0 0 / 12%);
        border-radius:15px;
        background-color:#ffffffe8;
        padding: 20px;
        position: relative;
        min-width: 25rem;

        .editButton{
          position: absolute;
          right: 0;
          top: 0;
          font-size: 14px;
          padding: 6px;
          color: #1B3D70;
          font-weight: bold;
          background-color: #C7D8F2;
          border-radius:0px 5px 0px 5px;
          cursor: pointer;
        }

        .item{
          display: flex;
          gap: 20px;
          align-items: center;
          img{
            height: 100px;
            width: 100px;
            object-fit: cover;
            border-radius: 50%;
          }

          .details{
            .category-title{
              margin: 10px 0px 12px 0px;
              color: var(--color-dark-variant);
              font-size:25px;
            }

            .detailsItem{
              margin-bottom: 10px;

              .item-key{
                font-weight: bold;
                color: gray;
                font-size: 16px;
                margin-right: 5px;
              }

              .item-value{
                font-size: 16px;
                color: gray;
              }
            }
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