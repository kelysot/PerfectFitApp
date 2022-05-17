import React ,{useEffect,useState} from 'react';
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import styled from "styled-components";

function Setting() {

  const[admin,setAdmin] = useState("");

  useEffect(() => {
    fetch(`/admin/getAdminData` , {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODE3OTlmNDc5YTUyM2FmZjIzNDYyNyIsImlhdCI6MTY1Mjc2ODU4MywiZXhwIjoxNjUyODU0OTgzfQ.SUDTWGOEUUQQUFc-qs9aQ6_K9e0CJTmBGj_sBb1-6MM'
       }
    })
      .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setAdmin(data.data);
        })
  },[])

  return (
    <SettingStyle>
      {admin && (<>
        <SideBar/>
          <div className='settingContainer'>
              <TopBar />
              <div className="top">
                <h1>Setting</h1>
              </div>
              <div className='bottom'>
                <div className='left'>
                  <div className='image-box'>
                    <img src={admin.image}></img>
                  </div>
                </div>
                <div className='right'>
                  right
                </div>
              </div>
          </div>
        </>)}
    </SettingStyle>
  )
};

const SettingStyle = styled.div`
  display:flex;
  box-shadow:-15px 20px 20px rgb(0 0 0 / 12%);
  width: 100%;
  min-height: 40rem;
  border-radius:15px;

  .settingContainer{
    flex:6 ;
    background-color: #f8f0e8a6;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    
    .top{
      box-shadow: 0px 0px 15px 1px rgb(0 0 0 / 18%);
      border-radius:12px;
      background-color: #ffffffe8;
      padding: 0.8rem;
      width: 90%;
      align-items: center;
      margin: auto;
      margin-top: 1.3rem;
    
      h1{
        font-size: 18px;
        color: var(--color-dark-variant);
      }
    }

    .bottom{
      display: flex;
      background: #ffffffe8;
      width: 90%;
      margin: auto;
      border-radius: 16px;
      margin-top: 2rem;
      box-shadow: 0px 0px 15px 1px rgb(0 0 0 / 18%);
      justify-content: space-between;
      align-items: center;

      .image-box {
        display: flex;
        align-items: center;
        padding: 1.5rem;
        
        img{
          height: 22rem;
          width: 22rem;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 8px 8px 8px rgb(0 0 0 / 20%);
        }
      }
    }
  }
`

export default Setting;