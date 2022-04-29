import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar';
import styled from "styled-components";
import EditForm from '../../components/EditForm';

//FIXME: Use the same page to edit category and subcategory
function Edit({nameOfAdmin}) {
    const[location,setLocation] = useState("");
    const[editCategory,setEditCategory] = useState({
        title: 'Edit Category',
        image: "",
        name: ""
    });
    const[editSubCategory,setEditSubCategory] = useState({
        title: 'Edit SubCategory',
        image: "",
        name: ""
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
                        name : data.category.name
                      }));
                  })
        }else{
            setLocation(editSubCategory.title);
        }
    },[])

    return (
        <EditStyle>
        <SideBar/>
            <div className="newCategoryContainer">
                <TopBar  nameOfAdmin={nameOfAdmin} />
                <EditForm title={location} name={editCategory.name} image={editCategory.image}/>
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