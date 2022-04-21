import React , {useEffect} from 'react';
import { BarChart, Bar, XAxis, YAxis} from 'recharts';
import CategoriesTable from '../../components/CategoriesTable';
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import styled from "styled-components";

//TODO: get data from server  

function SingleCategory({nameOfAdmin}) {
  //TODO: categoryData == categoryName & gender
  useEffect(() => {
    let location = window.location.href;
    let categoryData = location.split("/").slice(-1).pop();

    fetch(`/dashboard/categories/${categoryData}` , {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
      .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
  },[])

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
                <h1 className='title'>Partition  &amp; Top Profiles</h1>
                <div className='charts'>
                  <BarChart width={320} height={180} data={data}>
                    <XAxis dataKey="name" />
                    <YAxis  padding={{ top: 20, bottom: 2}} />
                    <Bar dataKey="uv" fill="#8884d8" />
                  </BarChart>
                  <BarChart width={400} height={180} data={data2}>
                    <XAxis dataKey="name" />
                    <YAxis  padding={{ top: 20, bottom: 2}} />
                    <Bar dataKey="uv" fill="#8884d8" />
                  </BarChart>
                </div>
              </div>
            </div>
            <div className='bottom'>
              <CategoriesTable categoriesData={subCategoriesData} title={'SubCategory List'} height={26} />
            </div>
          </div>
        </div>
    </SingleCategoryStyle>
  )
}

//FIXME: Get the data from server
const data = [
  {
    name: 'Male Posts',
    uv: 10,
  },
  {
    name: 'Female Posts',
    uv: 20,
  }
];
//TODO: best users in this category
const data2 = [
  {
    name: 'Matmoni123',
    uv: 10,
  },
  {
    name: 'Eden',
    uv: 20,
  },
  {
    name: 'Tal',
    uv: 20,
  }
];
//FIXME: Get data from server + get specific columns data
const subCategoriesData = [
  {  id: 0, image: 'https://cdn.shopify.com/s/files/1/0970/4540/produc…-Button-Back-Cotton-Dress-2_256x.jpg?v=1647997123', gender: 'Male', name: 'Shirt', numOfPosts: 1,percent: "25%"}
];

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
      flex-direction: column;
    }

    .top{
      display: flex;
      padding: 0px 0px 22px 0px;
      width: 100%;
      justify-content: space-evenly;

      .left{
        box-shadow: 5px -5px 8px rgb(0 0 0 / 12%);
        border-radius:15px;
        background-color:#ffffffe8;
        position: relative;
        padding: 8px;

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
          padding: inherit;

          img{
            height: 150px;
            width: 150px;
            object-fit: cover;
            border-radius: 50%;
          }

          .details{
            .category-title{
              margin: 10px 0px 30px 0px;
              color: var(--color-dark-variant);
              font-size: 30px;
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
        box-shadow: 5px -5px 8px rgb(0 0 0 / 12%);
        border-radius:15px;
        background-color:#ffffffe8;
        align-items: center;
        padding: 10px;

        .charts{
          display:flex;
        }
      }
    }

    .bottom{
      width: 97.5%;
    }

  }
`

export default SingleCategory;