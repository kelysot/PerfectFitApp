import React from 'react';
import Table from '../../components/Table';
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import styled from 'styled-components';

//TODO: get data from sever to categoriesData

function Users({nameOfAdmin}) {
  return (
    <UsersStyle>
        <SideBar/>
        <div className="profileContainer">
          <TopBar  nameOfAdmin={nameOfAdmin} />
          <div className="profilesList">
            <Table categoriesData={[]} action={true} columns={columns} title={'Profiles List'} height={56} link={''}/>
          </div>
        </div>
    </UsersStyle>
  )
};

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'options' , headerName: 'Image',
      renderCell: (params) => {
        return (
          <div className="image">
              <img src={'#'} alt="categoryImage"></img>
          </div>
        )
      }
    },
    { field: 'name', headerName: 'First Name', width: 150},
    { field: 'family', headerName: 'Family Name', width: 150},
    { field: 'userName', headerName: 'User Name', width: 150},
    { field: 'gender', headerName: 'Gender', width: 160},
    { field: 'birthday', headerName: 'Birthday', width: 160},
    { field: 'email;', headerName: 'Email', width: 160},
  ];

const UsersStyle = styled.div`
  display:flex;
  box-shadow:-15px 20px 20px rgb(0 0 0 / 12%);
  width: 100%;
  min-height: 41rem;
  border-radius:15px;

  .profileContainer{
    flex:6 ;
    background-color: #f8f0e8a6;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;

    .profilesList{
      padding: 20px; 
      padding-top: 30px;
      display:flex;
      align-items: center;
    }
  }
`

export default Users;