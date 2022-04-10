import React , {useState,useEffect} from 'react'
import styled from "styled-components";
import CategoriesTable from '../../components/CategoriesTable';
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
            <CategoriesTable categoriesData={categoriesData} />
            <div className="categoryOptions">
              <h3>Options...</h3>
            </div>
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
      display:flex;
      align-items: center;

      .categoryOptions{
        flex: 1;
      }
    }

  }
`

export default Categories