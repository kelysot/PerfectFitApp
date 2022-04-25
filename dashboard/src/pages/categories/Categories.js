import React , {useState,useEffect} from 'react'
import styled from "styled-components";
import Table from '../../components/Table';
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";

function Categories({nameOfAdmin}) {
  
  const[categoriesData,setCategoriesData] = useState(null)

  useEffect(()=>{
    fetch("/dashboard/categories" , {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
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
          <TopBar  nameOfAdmin={nameOfAdmin} />
          <div className="categoriesList">
            <Table categoriesData={categoriesData} action={true} columns={columns} title={'Categories List'} height={56} link={'/categories/newCategory'}/>
          </div>
        </div>
    </CategoryStyle>
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
  { field: 'name', headerName: 'Category Name', width: 150},
  { field: 'gender', headerName: 'Category Gender', width: 160},
  { field: 'numOfPosts', headerName: 'Total Post', type: 'number', width: 130},
  { field: 'percent', headerName: 'Percent Of Total Post', width: 180}
];

const CategoryStyle = styled.div`
  display:flex;
  box-shadow:-15px 20px 20px rgb(0 0 0 / 12%);
  width: 100%;
  min-height: 41rem;
  border-radius:15px;

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