import React , {useState,useEffect} from 'react';
import styled from "styled-components";
import axios from 'axios';

function EditForm({title,name,image,id,gender}) {
  const[edit,setEdit] = useState({
    name: name,
    pictureUrl: image,
    gender: "",
    subCategory: ""
  });

  useEffect(() => {
    setEdit((prevState) => ({
      ...prevState,
      pictureUrl: image,
      name : name
    }));
  },[name,image]);

  function handle(e) { 
    const newData = {...edit};
    newData[e.target.id] = e.target.value;
    setEdit(newData);
  }

  function submit(e){
    e.preventDefault();
    axios
      .patch(`/category/${id}`, edit ,{
        headers : {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNmI4OGE0N2U5MTQ3Mjk4NjIxMGIyYiIsImlhdCI6MTY1MTIxNDUwMCwiZXhwIjoxNjUxMzAwOTAwfQ.sjv8hCboY7uJ_uzH0dgqw_MbT1A0BDsTGk6E8Us_gdM'
        }
      })
        .then(() =>  window.location.href = `/categories/${edit.name}&${gender}`)
        .catch(err => {
          console.error(err);
      });
  }

  return (
    <EditFormStyle>
        <div className="top">
            <h1>{title}</h1>
        </div>
        <div className="bottom">
        {(title && name && image) && (<>
            <div className="left">
              <img src={edit.pictureUrl ? edit.pictureUrl : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}></img>
            </div>
            <div className="right">
              <form onSubmit={(e)=>submit(e)}>
                <div className="formInput">
                  <label>Name</label>
                  <input type="text" onChange={(e)=>handle(e)} id="name" autoComplete='off' value={edit.name}></input>
                </div>
                <div className="formInput">
                  <label>Image</label>
                  <input type="text" onChange={(e)=>handle(e)} id="pictureUrl" autoComplete='off' value={edit.pictureUrl}></input>
                </div>
                <button>Save</button>
              </form>
            </div>
            </>)}
          </div>
    </EditFormStyle>
  )
};

const EditFormStyle = styled.div`
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

export default EditForm;