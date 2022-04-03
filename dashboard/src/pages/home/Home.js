import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import CardDetails from "../../components/CardDetails";
import TopProfilesChart from "../../components/TopProfilesChart";
import PostUploadChart from '../../components/PostUploadChart';
import PopularCategoriesChart from "../../components/PopularCategoriesChart";

function Home() {

    const[nameOfAdmin,setNameOfAdmin] = useState("");
    const [topProfiles,setTopProfiles]=useState(null);
  
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
          })


      fetch("/dashboard/topProfiles" , {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }) 
        .then((res) => res.json())
          .then((data) => {
            setTopProfiles(data.topProfiles)
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
          <div className="charts">
            <TopProfilesChart topProfiles={topProfiles} />
            <PostUploadChart />
            <PopularCategoriesChart />
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

    .cardsDetails , .charts{
      display: flex;
      padding: 20px; 
      gap: 20px;
      justify-content: space-around;
      padding-top: 30px;
    }

    .charts{
      height: 55vh;
      padding-top: 10px ;
    }
    
  }
`

export default Home;