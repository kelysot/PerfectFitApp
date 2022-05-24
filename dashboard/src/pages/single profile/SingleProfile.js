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
        'Authorization': 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODgxZDEwNmQ5Nzg2MzA2ZWI0YjMzZiIsImlhdCI6MTY1MzMxOTA0OSwiZXhwIjoxNjUzNDA1NDQ5fQ.ZByBwPUmi63KEuEvbNaFCVzDwS-akhxESuwlsfevFcE'
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
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="60%" outerRadius="90%" data={dataToChart.length < 3 ? data2 : dataToChart}>
                  {dataToChart.length < 3 ?  "" : <PolarGrid />}
                  <PolarAngleAxis dataKey="categoryName" />
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

  .singleContainer{
        flex:6 ;
        background-color: #f8f0e8a6;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px; 
        
        .cards{
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 75vh;

          .details-card{
            width: 350px;
            height: 440px;
            background: #fff;
            box-shadow: 0 35px 80px rgba(0,0,0,0.15);
            border-radius: 20px;
            position: relative;
            overflow: initial;

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
            height: 470px;
            background: #fff;
            box-shadow: 0 35px 80px rgba(0,0,0,0.15);
            border-radius: 20px;
          }
        }
    }
`

export default SingleProfile;