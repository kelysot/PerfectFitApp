import React , {useState,useEffect} from 'react'
import styled from "styled-components";
import Table from '../../components/Table';
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";

function Categories() {
  
  const[categoriesData,setCategoriesData] = useState(null)

  useEffect(()=>{
    fetch("/dashboard/categories" , {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
       }
    }) 
      .then((res) => res.json())
        .then((data) => {
          setCategoriesData(data.data);
        })
  },[])

  return (
    <CategoryStyle>
        <SideBar/>
        <div className="categoryContainer">
          <TopBar />
          <div className="categoriesList">
            <Table categoriesData={categoriesData} addNew={true} action={'categories'} columns={columns} title={'Categories List'} height={56} link={'/categories/newCategory'}/>
          </div>
        </div>
    </CategoryStyle>
  )
}

const columns = [
  { field: 'id', headerName: 'ID', width: 60 },
  { field: 'options' , headerName: 'Image', width: 80,
    renderCell: (params) => {
      return (
        <div className="image">
            <img src={params.row.image} alt="categoryImage"></img>
        </div>
      )
    }
  },
  { field: 'name', headerName: 'Category Name', width: 150},
  { field: 'gender', headerName: 'Category Gender', width: 160},
  { field: 'numOfPosts', headerName: 'Total Post', type: 'number', width: 110},
  { field: 'percent', headerName: 'Percent Of Total Post', width: 180},
  { field: 'status', headerName: 'Status', width: 90}
];

const CategoryStyle = styled.div`
  display:flex;
  box-shadow:-15px 20px 20px rgb(0 0 0 / 12%);
  width: 100%;
  min-height: 40rem;
  border-radius:15px;

  @media screen and (max-width: 1400px) {
    width: 94%;
    min-height: 34rem;
    height: 40rem;
  }

  @media screen and (max-width: 1280px) {
    width: 90%;
    min-height: 34rem;
    height: 34rem;
  }

  .categoryContainer{
    flex:6 ;
    background-color: #f8f0e8a6;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;

    .categoriesList{
      padding: 20px; 
      padding-top: 30px;
      display:flex;
      align-items: center;
    }
  }
`

export default Categories