import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import CardDetails from "../../components/CardDetails";
import TopProfilesChart from "../../components/TopProfilesChart";
import TopCategoriesChart from '../../components/TopCategoriesChart';
import StatusConnectedProfiles from "../../components/StatusConnectedProfiles";

function Home() {
  
  const[topProfiles,setTopProfiles]=useState(null);
  const[chartConnectData,setChartConnectData] = useState(null);
  const[percentage,setPercentage] = useState(0);
  const[categoriesData,setCategoriesData] = useState(null);
  const[updateData,setUpdateData] = useState(null);
  
  useEffect(() => {
    loadData(setTopProfiles,setChartConnectData,setPercentage,setCategoriesData,setUpdateData)          
  },[])

  return (
    <HomeStyle>
        <Sidebar />
        <div className="homeContainer">
          <TopBar />
          {updateData && (<>
            <div className="cardsDetails">
              <CardDetails type="onlineUsers" dataCard={updateData.loginProfile}/>
              <CardDetails type="newProfiles" dataCard={updateData.newProfiles}/>
              <CardDetails type="totalUsers" dataCard={updateData.totalUsers}/>
              <CardDetails type="totalPosts" dataCard={updateData.totalPosts}/>
            </div>
            <div className="charts">
              <TopProfilesChart topProfiles={topProfiles} />
              <TopCategoriesChart categoriesData={categoriesData} />
              <StatusConnectedProfiles percentage={percentage} chartConnectData={chartConnectData} />
            </div>
          </>)}
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

  @media screen and (max-width: 1280px) {
    width: 92%;
    min-height: 34rem;
    height: 34rem;
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

function loadData(setTopProfiles,setChartConnectData,setPercentage,setCategoriesData,setUpdateData){

  fetch("/dashboard/topProfiles" , {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
     }
  }) 
    .then((res) => res.json())
      .then((data) => {
        setTopProfiles(data.topProfiles)
      })

  fetch("/dashboard/percentage",{
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
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
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
  })
  .then((res) => res.json())
    .then((data) => {
      setCategoriesData(data.data)
    })

  fetch("/admin/updateData" , {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
  }) 
    .then((res) => res.json())
      .then((data) => {
        setUpdateData(data.data);
        console.log(data.data);
      })
}

export default Home;