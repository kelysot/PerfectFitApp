import React , {useEffect,useState} from 'react';
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import styled from "styled-components";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

function SingleProfile() {

  const[profileData,setProfileData] = useState("");
  const[dataToChart,setDataToChart] = useState("");

  useEffect(() => {
    let location = window.location.href;
    let userName = location.split("/").slice(-1).pop();
    fetch(`/profile/getProfile/${userName} `, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }) 
      .then((res) => res.json())
        .then((data) => {
          setProfileData(data);
        })

    fetch(`/dashboard/users/${userName}`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }) 
        .then((res) => res.json())
          .then((data) => {
            setDataToChart(data.data);
          })
  },[]);
  return (
    <SingleProfileStyle>
        <SideBar/>
        <div className='singleContainer'>
            <TopBar  />
            <div className='cards'>
            {(profileData && dataToChart) &&(<>
                <div className='details-card'>
                <div className='image-box'>
                  <img src={`/uploadsAdmin/${profileData.pictureUrl.split('/')[1]}`}></img>
                </div>
                <div className='content'>
                  <div className='details'>
                    <h2>{profileData.firstName + " " + profileData.lastName}</h2>
                    <h3>{profileData.userName}</h3>
                    <div className='data'>
                      <h4>{profileData.myPostsListId.length > 0 ? profileData.myPostsListId.length : 0}<br></br><span>Pots</span></h4>
                      <div className='line'></div>
                      <h4>{profileData.followers.length > 0 ? profileData.followers.length : 0}<br></br><span>Followers</span></h4>
                      <div className='line'></div>
                      <h4>{profileData.trackers.length > 0 ? profileData.trackers.length : 0}<br></br><span>Following</span></h4>
                    </div>
                    <div className='basicData'>
                      <div className='data-line'>
                        <span>Gender</span>
                        <span>{profileData.gender}</span>
                      </div>
                      <div className='data-line'>
                        <span>Birthday</span>
                        <span>{profileData.birthday}</span>
                      </div>
                      <div className='data-line'>
                        <span>Email</span>
                        <span>{profileData.userId}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='right'>
              <ResponsiveContainer width="100%" height="100%" aspect={1.4/1}>
                <RadarChart cx="50%" cy="60%" outerRadius="90%" data={dataToChart.length < 3 ? data2 : dataToChart}>
                  {dataToChart.length < 3 ?  "" : <PolarGrid />}
                  <PolarAngleAxis dataKey="categoryName"  tick={{ fontSize: 13 }}/>
                  <PolarRadiusAxis />
                  <Radar name="Mike" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
              </div>
            </>)}
            </div>
        </div>
    </SingleProfileStyle>
  )
};

const data2 = [
  {
    categoryName: "There is not enough information about this profile",
    amount: 0
  }
];

const SingleProfileStyle = styled.div`
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

  .singleContainer{
        flex:6 ;
        background-color: #f8f0e8a6;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px; 
        
        .cards{
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 100%;

          .details-card{
            width: 350px;
            height: 440px;
            background: #fff;
            box-shadow: 0 35px 80px rgba(0,0,0,0.15);
            border-radius: 20px;
            position: relative;
            overflow: initial;
            
            @media screen and (max-width: 1280px) {
              width: 320px;
              height: 380px;
            }

            .image-box{
              position: absolute;
              left: 50%;
              transform:  translateX(-50%);
              top: -50px;
              width: 200px;
              height: 180px;
              background: #fff;
              border-radius: 20px;
              box-shadow: 0 36px 44px rgb(0 0 0 / 15%);
              overflow: hidden;

              @media screen and (max-width: 1280px) {
                width: 140px;
                height: 140px;
              }

              img{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }

          .details-card .content {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            .details{
              padding: 40px;
              text-align: center;
              width: 100%;
              h2{
                font-size: 1.5em;
                font-weight: 600;
                color: #555;
                line-height: 1.2em;
              }
              h3{
                font-size: 1.2em;
                font-weight: 500;
                opacity: 0.5;
              } 
              .data{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 20px 0px;
                .line{
                  height: 40px;
                  width: 2px;
                  background: #e6d7fa;
                }
                span{
                  font-size: 12px;
                  opacity: 0.7;
                }
              }

              .basicData{
                .data-line{
                  display: flex;
                  justify-content: space-between;
                  padding: 0.5rem;
                }
              }
            }
          }

          .right {
            width: 550px;
            height: 430px;
            background: #fff;
            box-shadow: 0 35px 80px rgba(0,0,0,0.15);
            border-radius: 20px;

            @media screen and (max-width: 1280px) {
              width: 500px;
              height: 375px;
            }
          }
        }
    }
`

export default SingleProfile;