import React ,{useEffect,useState} from 'react';
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Setting() {

  const[admin,setAdmin] = useState("");
  let navigate = useNavigate();

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
      <SideBar/>
        <div className='settingContainer'>
          <TopBar />
              <div className="top">
                <h1>Setting</h1>
              </div>
            {admin && (<>
              <div className='bottom'>
                <div className='left'>
                  <div className='image-box'>
                    <img src={admin.image}></img>
                  </div>
                </div>
                <div className='right'>
                  <h3>Admin Details</h3>
                  <div className='details'>
                    <div className='detailsItem'>
                      <span className="item-key">Full Name:</span>
                      <span className="item-value">{admin.name}</span>
                    </div>
                    <div className='detailsItem'>
                      <span className="item-key">Email:</span>
                      <span className="item-value">{admin.email}</span>
                    </div>
                    <div className='detailsItem'>
                      <span className="item-key">Last Update:</span>
                      <span className="item-value">{admin.lastUpdate}</span>
                    </div>
                  </div>
                  <button className='btn-edit' onClick={()=> navigate(`/setting/edit`)}>Edit</button>
                </div>
              </div>
            </>)}
      </div>
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
      padding: 1.5rem;

      .image-box {
        display: flex;
        align-items: center;
        
        img{
          height: 22rem;
          width: 22rem;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 8px 8px 8px rgb(0 0 0 / 20%);
        }
      }

      .right{
        height: 20rem;
        width: 25rem;
        text-align: center;
        background: #f3efefa1;
        box-shadow: 0px 0px 15px 1px rgb(0 0 0 / 18%);
        border-radius: 18px;
        padding: 1rem;
        
        h3{
          font-size: 30px;
          display: flex;
          justify-content: center;
          color: var(--color-primary-purple);
          margin-bottom: 1rem;
        }

        .details{
          font-size: 18px;

          .detailsItem{
            margin: 1.5rem;
            display: flex;
            justify-content: space-between;

            .item-key{
              font-weight: bold;
              color: var(--color-dark-variant);
            }
          }
        }

        .btn-edit{
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          font-size: 16px;
          width: 35%;
          border-radius: 8px;
          outline: none;
          border: none;
          background-color: #3e98c766;
          color: var(--color-dark-variant);
          font-weight: bold;
          cursor: pointer;
          transition: all 0.4s ease;

          &:hover{
            color: white;
          }
        }
      }
    }
  }
`

export default Setting;