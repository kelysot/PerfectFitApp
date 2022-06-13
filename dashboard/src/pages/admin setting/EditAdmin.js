import React,{useEffect,useState} from 'react';
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';

function EditAdmin() {

  const[admin,setAdmin] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`/admin/getAdminData` , {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
       }
    })
      .then((res) => res.json())
        .then((data) => {
          setAdmin(data.data);
        })
  },[])
  
  function submit(e){
    e.preventDefault();
    axios
      .patch(`/admin/editAdmin`, admin ,{
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')        
        }
      })
        .then(() =>  navigate(`/home`))
        .catch(err => {
          console.error(err);
      });
  }

  function handle(e) { 
    const newData = {...admin};
    newData[e.target.id] = e.target.value;
    setAdmin(newData);
  }

  return (
    <EditAdminStyle>
        <SideBar/>
        <div className='editAdminContainer'>
          <TopBar />
            <div className="top">
                <h1>Edit Admin</h1>
            </div>
            {admin && (<>
              <div className='bottom'>
                <div className='left'>
                  <img src={!admin.image ? "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" : admin.image}></img>
                </div>
                <div className='right'>
                  <h3>Edit Admin</h3>
                  <form onSubmit={(e)=>submit(e)}>
                    <div className="formInput">
                      <label>Name:</label>
                      <input 
                        type="text"
                        onChange={(e)=>handle(e)}
                        id="name" 
                        autoComplete='off' 
                        value={admin.name}>
                      </input>
                    </div>
                    <div className="formInput">
                      <label>Email:</label>
                      <input 
                        type="text"
                        onChange={(e)=>handle(e)}
                        id="email" 
                        autoComplete='off' 
                        value={admin.email}>
                      </input>
                    </div>
                    <div className="formInput">
                      <label>Image:</label>
                      <input 
                        type="text"
                        onChange={(e)=>handle(e)}
                        id="image" 
                        autoComplete='off' 
                        value={admin.image}>
                      </input>
                    </div>
                    <button>Save</button>
                  </form>
                </div>
              </div>
            </>)}
      </div>
    </EditAdminStyle>
  )
};

const EditAdminStyle = styled.div`
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

  .editAdminContainer{
    flex:6 ;
    background-color: #f8f0e8a6;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;

    .top{
      box-shadow: 0px 0px 15px 1px rgb(0 0 0 / 18%);
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
      margin: auto;
      margin-top: 30px;
      width: 90%;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ffffffe8;
      box-shadow: -6px -15px 20px rgb(0 0 0 / 12%);
      border-radius: 15px;
      padding: 1.5rem;

      .left {
        img{
          height: 22rem;
          width: 22rem;
          object-fit: cover;
          border-radius: 20px;

          @media screen and (max-width: 1280px) {
            width: 20rem;
            height: 20rem;
          }
        }
      }

      .right{
        height: 20rem;
        width: 25rem;
        text-align: center;
        background: #f3efefa1;
        box-shadow: 0px 0px 15px 1px rgb(0 0 0 / 18%);
        border-radius: 18px;
        padding: 1rem;

        @media screen and (max-width: 1280px) {
          width: 24rem;
          height: 20rem;
        }

        h3{
          font-size: 30px;
          display: flex;
          justify-content: center;
          color: var(--color-primary-purple);
          margin-bottom: 1rem;
        }

        .formInput{
          font-size: 18px;
          margin: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;

          label{
            font-weight: bold;
            color: var(--color-dark-variant);
          }

          input{
            width: 15rem;
            border-radius: 6px;
            padding: 6px;
            border: none;
            font-size: 15px;

            /* @media screen and (max-width: 1280px) {
              width: 15rem;
            } */
          }
        }

        button{
          padding: 0.5rem 1rem;
          font-size: 16px;
          width: 35%;
          border-radius: 8px;
          outline: none;
          border: none;
          background-color: #3e98c766;
          color: var(--color-dark-variant);
          font-weight: bold;
          cursor: pointer;
          transition: all 0.4s ease;

          &:hover{
            color: white;
          }
        }
      }
    }
  }
`
export default EditAdmin;