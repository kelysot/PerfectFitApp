import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar';
import styled from "styled-components";

function NewCategory() {
  let navigate = useNavigate();
  const [categoryGender, setCategoryGender] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [newSubCategory, setNewSubCategory] = useState({
    name: "",
    pictureUrl: "",
    gender: "",
    posts: []
  });

  useEffect(() => {
    let location = window.location.href;
    let categoryData = location.split("/").slice(-1).pop();
    fetch(`/dashboard/categories/getId/${categoryData}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setCategoryId(data.categoryId);
        setCategoryGender(data.categoryGender);
        setCategoryName(data.categoryName);
        setNewSubCategory((prevState) => ({
          ...prevState,
          gender: data.categoryGender
        }));

      })
  }, []);

  function handle(e) {
    const newData = { ...newSubCategory };
    newData[e.target.id] = e.target.value;
    setNewSubCategory(newData);
  }
  
  function submit(e) {
    e.preventDefault();
    if(newSubCategory.pictureUrl === "")
      newSubCategory.pictureUrl = "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
    axios
      .post(`/subCategory/${categoryId}`, newSubCategory, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')        }
      })
      .then(() => navigate(`/categories/${categoryName}&${categoryGender}`))
      .catch(err => {
        console.error(err);
      });
  }
  return (
    <NewCategoryStyle>
      <SideBar />
      <div className="newCategoryContainer">
        <TopBar />
        <div className="top">
          <h1>{categoryName} &gt; {categoryGender} &gt; New SubCategory</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={newSubCategory.pictureUrl ? newSubCategory.pictureUrl : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}></img>
          </div>
          <div className="right">
            <form onSubmit={(e) => submit(e)}>
              <div className="formInput">
                <label>SubCategory Name</label>
                <input type="text" autoComplete='off' onChange={(e) => handle(e)} id="name" value={newSubCategory.name} placeholder="Name"></input>
              </div>
              <div className="formInput">
                <label>SubCategory Image </label>
                <input type="text" autoComplete='off' onChange={(e) => handle(e)} id="pictureUrl" value={newSubCategory.pictureUrl} placeholder="www.image.com"></input>
              </div>
              <div className="formInput">
                <label>SubCategory gender </label>
                <input type="text" id="gender" disabled placeholder={categoryGender}></input>
              </div>
              <button>Save</button>
            </form>
          </div>
        </div>
      </div>
    </NewCategoryStyle>
  )
}

const NewCategoryStyle = styled.div`
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

  .bottom{
    margin: 20px 60px;
    padding: 10px;
    display: flex;
    background-color: #ffffffe8;
    box-shadow: -6px -15px 20px rgb(0 0 0 / 12%);
    border-radius: 15px;
    
    .left{
      flex: 1;
      display: flex;
      justify-content: center;
      
      img{
        height: 200px;
        width: 200px;
        border-radius: 50%;
        object-fit: cover;
        margin: auto;
      }
    }

    .right{
      flex: 2;

      form{
        display: flex;
        flex-wrap: wrap;
        gap: 25px;
        flex-direction: column;
        width: 70%;
        margin: auto;
        padding: 0.8rem;
        justify-content: space-around;

        .formInput{
          width: 50%;

          label{
            display: flex;
            align-items: center;
            gap: 15px;
            font-size: 18px;
            padding: 0.5rem 0rem;
            color: var(--color-dark-variant);

            span{
              cursor: pointer;
              color: var(--color-dark-variant);
            }
          }

          input, select {
            width: 100%;
            font-size: 16px;
            padding: 5px;
            border: none;
            border-bottom: 1px solid var(--color-dark-variant);
          }
        }

        button{
          width: 30%;
          padding: 10px;
          border: none;
          color: white;
          font-weight: bold;
          cursor: pointer;
          margin-top: 0.5rem 0.8rem;
          background-color: var(--color-primary-purple);
          border-radius: 8px;
          transition: all 0.3s ease-in-out;
        }

        button:hover{
          transform: scale(1.04);
        }
      }
    }
  }

`;

export default NewCategory;