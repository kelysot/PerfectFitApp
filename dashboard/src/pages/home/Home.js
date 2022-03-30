import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import CardDetails from "../../components/CardDetails";

function Home() {

    // const [numOfUsers, setNumOfUsers] = React.useState(0);
    // const [numOfProfiles, setNumOfProfiles] = React.useState(0)
    // const [numOfPosts, setNumOfPosts] = React.useState(0)
    const[nameOfAdmin,setNameOfAdmin] = useState("");
  
    useEffect(() => {
      fetch("/dashboard",{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
        .then((res) => res.json())
        .then((data) => {
          setNameOfAdmin(data.adminName);
            // setNumOfUsers(data.numOfUsers)
            // setNumOfProfiles(data.numOfProfiles)
            // setNumOfPosts(data.numOfPosts)
          })
    },[])

  return (
    <HomeStyle>
        <Sidebar />
        <div className="homeContainer">
          <TopBar nameOfAdmin={nameOfAdmin}/>
          <div className="cardsDetails">
            <CardDetails type="onlineUsers"/>
            <CardDetails type="newProfiles"/>
            <CardDetails type="totalUsers"/>
            <CardDetails type="totalPosts"/>
          </div>
        </div>
    </HomeStyle>
  )
}

const HomeStyle = styled.div`
  display:flex;
  box-shadow:-15px 20px 20px rgb(0 0 0 / 12%);
  border-radius:15px;
  .homeContainer{
    flex:6 ;
    background-color: #f8f0e8a6;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;

    .cardsDetails{
      display: flex;
      padding: 20px; 
      gap: 20px;
      justify-content: space-around;
      padding-top: 30px;
    }
  }
`

export default Home;