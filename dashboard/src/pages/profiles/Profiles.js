import React , {useState,useEffect} from 'react';
import Table from '../../components/Table';
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import styled from 'styled-components';

//TODO: get data from sever to categoriesData

function Profiles({nameOfAdmin}) {

  const[profilesList,setProfilesList] = useState("");

  useEffect(() => {
    fetch(`/profile/profilePage/all` , {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGYxMWUzMWFlNWUzZGE1NmM3YTliOSIsImlhdCI6MTY1MTQ0NTM2MiwiZXhwIjoxNjUxNTMxNzYyfQ.yhrX8PYj4MZeNpT996uyMGCY5RnFyNT68Rzg0Y5TEWk'
       }
    })
      .then((res) => res.json())
        .then((data) => {
          console.log(data.data)
          setProfilesList(data.data);
        })
  },[])

  return (
    <ProfilesStyle>
        <SideBar/>
        <div className="profileContainer">
          <TopBar  nameOfAdmin={nameOfAdmin} />
          <div className="profilesList">
            <Table categoriesData={profilesList} addNew={false} action={true} columns={columns} title={'Profiles List'} height={56} link={''}/>
          </div>
        </div>
    </ProfilesStyle>
  )
};

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'options' , headerName: 'Image',
      renderCell: (params) => {
        return (
          <div className="image">
              <img src={params.row.image} alt="categoryImage"></img>
          </div>
        )
      }
    },
    { field: 'firstName', headerName: 'First Name', width: 130},
    { field: 'lastName', headerName: 'Family Name', width: 130},
    { field: 'userName', headerName: 'User Name', width: 120},
    { field: 'gender', headerName: 'Gender', width: 100},
    { field: 'birthday', headerName: 'Birthday', width: 120},
    { field: 'email', headerName: 'Email', width: 160},
  ];

const ProfilesStyle = styled.div`
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

export default Profiles;