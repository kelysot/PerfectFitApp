import React , {useEffect , useState} from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis} from 'recharts';
import Table from '../../components/Table';
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import styled from "styled-components";

function SingleCategory({nameOfAdmin}) {

  const[singleCategory ,setSingleCategory ] = useState("");
  const[location,setLocation] = useState("");
  const [amounts, setAmounts] = useState("");
  const[subCategoryData,setSubCategoryData] = useState("");

  useEffect(() => {
    let location = window.location.href;
    let categoryData = location.split("/").slice(-1).pop();
    setLocation(categoryData);
    fetch(`/dashboard/categories/${categoryData}` , {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
      .then((res) => res.json())
        .then((data) => {
          setSingleCategory(data.singleCategory);
          setAmounts(data.amounts);
        })

        fetch(`/dashboard/categories/${categoryData}/subCategoryData` , {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        })
          .then((res) => res.json())
            .then((data) => {
              setSubCategoryData(data.subCategoriesData)
            })
  },[])
  
  return (
    <SingleCategoryStyle>
       <SideBar/>
        <div className='singleContainer'>
          <TopBar  nameOfAdmin={nameOfAdmin} />
          {(singleCategory && subCategoryData) && (<>
          <div className='singleCategoryContainer'>
            <div className='top'>
              <div className='left'>
                <Link to={`/categories/editCategory/${singleCategory.name}&${singleCategory.gender}`} className="link">
                  <div className='editButton'>Edit</div>
                </Link>
                <h1 className='title'>Information</h1>
                <div className='item'>
                  <img src={singleCategory.pictureUrl} alt=''></img>
                  <div className='details'>
                    <h3 className='category-title'>{singleCategory.name}</h3>
                    <div className='detailsItem'>
                      <span className="item-key">Category Gender:</span>
                      <span className="item-value">{singleCategory.gender}</span>
                    </div>
                    <div className='detailsItem'>
                      <span className="item-key">Total Posts:</span>
                      <span className="item-value">{amounts.numOfPosts}</span>
                    </div>
                    <div className='detailsItem'>
                      <span className="item-key">Percent Of Total Posts:</span>
                      <span className="item-value">{amounts.percent !== "NaN%" ? amounts.percent : "0%"}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='right'>
                <h1 className='title'>Comparison between a parallel category  &amp; Top profiles in the category</h1>
                <div className='charts'>
                  <BarChart width={320} height={180} data={amounts.parallelCategory}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} padding={{ top: 20, bottom: 2}} />
                    <Bar dataKey="count" fill="#9665C1" />
                  </BarChart>
                  <BarChart width={400} height={180} data={amounts.topProfilesChart}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false}  padding={{ top: 20, bottom: 2}} />
                    <Bar dataKey="count" fill="#9665C1" />
                  </BarChart>
                </div>
              </div>
            </div>
            <div className='bottom'>
              <Table categoriesData={subCategoryData} addNew={true} action={'subCategories'} columns={columns} title={'SubCategory List'} height={26} link={`/categories/newSubCategory/${location}`}/>
            </div>
          </div>
          </>)}
        </div>
    </SingleCategoryStyle>
  )
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'options' , headerName: 'Image',
    renderCell: (params) => {
      return (
        <div className="image">
            <img src={params.row.image} alt="categoryImage"></img>
        </div>
      )
    }
  },
  { field: 'name', headerName: 'SubCategory Name', width: 200},
  { field: 'gender', headerName: 'SubCategory Gender', width: 200}
];

const SingleCategoryStyle = styled.div`
  display:flex;
  box-shadow:-15px 20px 20px rgb(0 0 0 / 12%);
  width: 100%;
  min-height: 40rem;
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