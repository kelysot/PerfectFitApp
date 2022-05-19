import React from 'react';
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import styled from "styled-components";

function EditAdmin() {
  return (
    <EditAdminStyle>
        <SideBar/>
        <div className='editAdminContainer'>
          <TopBar />
            <div className="top">
                <h1>Edit Admin</h1>
            </div>
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
  }
`
export default EditAdmin;