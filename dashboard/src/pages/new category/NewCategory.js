import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar';
import styled from "styled-components";

function NewCategory() {
  let navigate = useNavigate();
  const [newCategory, setNewCategory] = useState({
    name: "",
    pictureUrl: "",
    gender: "",
    subCategory: []
  })
  
  function handle(e) {
    const newData = { ...newCategory };
    newData[e.target.id] = e.target.value;
    setNewCategory(newData);
  }
  
  function submit(e) {
    e.preventDefault();
    if(newCategory.pictureUrl === "")
      newCategory.pictureUrl = "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
    axios
      .post('/category', newCategory, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(() => navigate(`/categories/${newCategory.name}&${newCategory.gender}`))
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
          <h1>New Category</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={newCategory.pictureUrl ? newCategory.pictureUrl : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}></img>
          </div>
          <div className="right">
            <form onSubmit={(e) => submit(e)}>
              <div className="formInput">
                <label>Category Name</label>
                <input type="text" autoComplete='off' onChange={(e) => handle(e)} id="name" value={newCategory.name} placeholder="Name"></input>
              </div>
              <div className="formInput">
                <label>Category Image </label>
                <input type="text" autoComplete='off' onChange={(e) => handle(e)} id="pictureUrl" value={newCategory.pictureUrl} placeholder="www.image.com"></input>
              </div>
              <div className="formInput">
                <label>Category Gender</label>
                <select onChange={(e) => handle(e)} id="gender" value={newCategory.gender}>
                  <option selected={true}>Choose here</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
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