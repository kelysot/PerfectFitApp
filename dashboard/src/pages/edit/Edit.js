import React ,{useState,useEffect} from 'react';
import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar';
import styled from "styled-components";
import EditForm from '../../components/EditForm';

function Edit() {
    const[location,setLocation] = useState("");
    const[editCategory,setEditCategory] = useState({
        title: 'Edit Category',
        image: "",
        name: "",
        id:"",
        gender: ""
    });
    const[editSubCategory,setEditSubCategory] = useState({
        title: 'Edit SubCategory',
        image: "",
        name: "",
        id:"",
        gender: ""
    });

    useEffect(() => {
        let location = window.location.href;
        let categoryData = location.split("/").slice(-1).pop();
        if(location.includes('editCategory')){
            setLocation(editCategory.title);
            fetch(`/category/getByGenderAndName/${categoryData}` , {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
              })
                .then((res) => res.json())
                  .then((data) => {
                    setEditCategory((prevState) => ({
                        ...prevState,
                        image: data.category.pictureUrl,
                        name : data.category.name,
                        id: data.category._id,
                        gender : data.category.gender
                      }));
                  })
        }else if(location.includes('editSubCategory')){
            setLocation(editSubCategory.title);
            fetch(`/subCategory/edit/getSubCategoriesByNameAndGender/${categoryData}` , {
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODE3OTlmNDc5YTUyM2FmZjIzNDYyNyIsImlhdCI6MTY1Mjc2ODU4MywiZXhwIjoxNjUyODU0OTgzfQ.SUDTWGOEUUQQUFc-qs9aQ6_K9e0CJTmBGj_sBb1-6MM'
               }
            })
              .then((res) => res.json())
                .then((data) => {
                  setEditSubCategory((prevState) => ({
                    ...prevState,
                    image: data.subCategory.pictureUrl,
                    name : data.subCategory.name,
                    id: data.subCategory._id,
                    gender : data.subCategory.gender
                  }));
                })
      }
    },[])

    return (
        <EditStyle>
        <SideBar/>
            <div className="newCategoryContainer">
                <TopBar />
                <EditForm 
                  title={location} 
                  name={location === 'Edit Category' ? editCategory.name : editSubCategory.name} 
                  image={location === 'Edit Category' ? editCategory.image : editSubCategory.image} 
                  id={location === 'Edit Category' ? editCategory.id : editSubCategory.id} 
                  gender={location === 'Edit Category' ? editCategory.gender : editSubCategory.gender}
                />
            </div>
        </EditStyle>
    )
};

const EditStyle = styled.div`
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

  .top{
        box-shadow: -6px -15px 20px rgb(0 0 0 / 12%);
        border-radius:12px;
        background-color: #ffffffe8;
        padding: 0.8rem;
        width: 90%;
        align-items: center;
        margin: auto;
        margin-top: 1.3rem;
    
        h1{
        font-size: 18px;
        color: var(--color-dark-variant);
        }
    }
`;

export default Edit;