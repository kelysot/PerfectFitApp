import React , {useEffect,useState} from 'react';
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import styled from "styled-components";

function SingleProfile({nameOfAdmin}) {

  const[profileData,setProfileData] = useState("");
  useEffect(() => {
    let location = window.location.href;
    let userName = location.split("/").slice(-1).pop();
    fetch(`/profile/getProfile/${userName} `, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGYxMWUzMWFlNWUzZGE1NmM3YTliOSIsImlhdCI6MTY1MTg0MDQzNywiZXhwIjoxNjUxOTI2ODM3fQ.Gi3_Tm2zDO7Kzis5w5KTZR8EDprYmre9RYCfEY7dM-g'
       }
    }) 
      .then((res) => res.json())
        .then((data) => {
          setProfileData(data);
        })
  },[]);

  return (
    <SingleProfileStyle>
        <SideBar/>
        <div className='singleContainer'>
            <TopBar  nameOfAdmin={nameOfAdmin} />
            <div className='cards'>
              { profileData &&(<>
                <div className='details-card'>
                <div className='image-box'>
                  <img src={profileData.pictureUrl}></img>
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
              </>)}
              <div className='right'>Graph</div>
            </div>
        </div>
    </SingleProfileStyle>
  )
};

const SingleProfileStyle = styled.div`
  display:flex;
  box-shadow:-15px 20px 20px rgb(0 0 0 / 12%);
  width: 100%;
  min-height: 41rem;
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

            .image-box{
              position: absolute;
              left: 50%;
              transform:  translateX(-50%);
              top: -50px;
              width: 200px;
              height: 180px;
              background: #fff;
              border-radius: 20px;
              box-shadow: 0  15px 50px rgba(0,0,0,0.35);
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
            width: 350px;
            height: 440px;
            background: #fff;
            box-shadow: 0 35px 80px rgba(0,0,0,0.15);
            border-radius: 20px;
          }
        }
    }
`

export default SingleProfile;