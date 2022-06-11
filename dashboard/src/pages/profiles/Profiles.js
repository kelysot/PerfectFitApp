import React , {useState,useEffect} from 'react';
import Table from '../../components/Table';
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import styled from 'styled-components';

function Profiles() {

  const[profilesList,setProfilesList] = useState("");

  useEffect(() => {
    fetch(`/profile/` , {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then((res) => res.json())
        .then((data) => {
          setProfilesList(data.data);
        })
  },[])

  return (
    <ProfilesStyle>
        <SideBar/>
        <div className="profileContainer">
          <TopBar />
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
            <img src={`/uploadsAdmin/${params.row.image.split('/')[1]}`}></img>
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