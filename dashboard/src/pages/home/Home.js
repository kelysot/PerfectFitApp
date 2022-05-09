import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import CardDetails from "../../components/CardDetails";
import TopProfilesChart from "../../components/TopProfilesChart";
import TopCategoriesChart from '../../components/TopCategoriesChart';
import StatusConnectedProfiles from "../../components/StatusConnectedProfiles";

function Home({nameOfAdmin}) {
    
  const[topProfiles,setTopProfiles]=useState(null);
  const[chartConnectData,setChartConnectData] = useState(null);
  const[percentage,setPercentage] = useState(0);
  const[categoriesData,setCategoriesData] = useState(null);
  
  useEffect(() => {
    loadData(setTopProfiles,setChartConnectData,setPercentage,setCategoriesData)          
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
            <TopCategoriesChart categoriesData={categoriesData} />
            <StatusConnectedProfiles percentage={percentage} chartConnectData={chartConnectData} />
          </div>
        </div>
    </HomeStyle>
  )
}

const HomeStyle = styled.div`
  display:flex;
  box-shadow:-15px 20px 20px rgb(0 0 0 / 12%);
  width: 100%;
  border-radius:15px;
  min-height: 40rem;
  overflow: hidden;

  @media screen and (max-width: 1400px) {
    width: 95%;
    min-height: 38rem;
  }

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
      padding-top: 10px ;
    }
    
  }
  
`

function loadData(setTopProfiles,setChartConnectData,setPercentage,setCategoriesData){

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

  fetch("/dashboard/percentage",{
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      }
  })
    .then((res) => res.json())
      .then((data) => {
        setChartConnectData(data.data);
        setPercentage(data.percentageOfConnect);
      })

  fetch("/dashboard/topCategories",{
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      }
  })
  .then((res) => res.json())
    .then((data) => {
      setCategoriesData(data.data)
    })
}

export default Home;