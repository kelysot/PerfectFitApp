import React from 'react';
import styled from "styled-components";
import {CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

function StatusConnectedProfiles({chartConnectData , percentage}) {
  return (
    <StatusConnectedProfilesStyle>
        <TopStyle>
            <h3 className="title">Status Of Connected Profiles</h3>
        </TopStyle>
        <BottomStyle>
            <div className="chart">
              <CircularProgressbar 
              value={percentage ? percentage : 0 } text= {`${percentage ? percentage : 0}%`} 
              strokeWidth={1.7} 
              styles={buildStyles({
                pathColor: `rgb(255 136 136 / 60%)`,
                textColor: '#f88'})} />
            </div>
          { chartConnectData && (<>
            <p>Of The Profiles Are Connected Now</p>
            <div className="summery">
              <div className="item">
                <div className="itemTitle">
                  <span className="material-icons-sharp">person_outline</span>
                  <div className="title">Total</div>
                </div>
              <div className="resultAmount">{chartConnectData.total}</div>
              </div>
            <div className="item">
              <div className="itemTitle">
                <span className="material-icons-sharp">male</span>
                <div className="title">Male</div>
              </div>
             <div className="resultAmount">{chartConnectData.sumOfMale}</div>
            </div>
            <div className="item">
              <div className="itemTitle">
                <span className="material-icons-sharp">female</span>
                <div className="title">Female</div>
              </div>
             <div className="resultAmount">{chartConnectData.sumOfFemale}</div>
            </div>
          </div>
          </>) }
        </BottomStyle>
    </StatusConnectedProfilesStyle>
  )
};

const StatusConnectedProfilesStyle = styled.div`
    background-color: #ffffffe8;
    border-radius: 8px;
    box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.18);
    padding: 10px;
    flex:3;
    min-width: 20rem ;

    @media screen and (max-width: 1540px) {
      height: 24rem;
    }

    @media screen and (max-width: 1280px) {
      height: 19rem;
    }
`;

const TopStyle = styled.div`
    font-weight: bold;
    font-size: 14px;
    color: var(--color-dark-variant);
`;

const BottomStyle = styled.div`

  display: flex ;
  justify-content: center ;
  align-items: center ;
  flex-direction: column ;
  padding: 20px ;

  @media screen and (max-width: 1400px) {
    padding: 0px;
  }

  p{
    padding-bottom: 40px;
    padding-top: 15px;
  }
  .chart{
    width : 200px;
    height: 200px ;
    margin:20px ;
  }

  .summery{
    width:90% ;
    display: flex ;
    justify-content:space-between ;
    align-items: center ;
    .item{
      text-align:center ;
      .itemTitle{
        font-size:16px ;
        display: flex ;
        align-items:center ;
        gap: 5px;
        span{
          color:rgb(255 136 136 / 60%) ;
          font-size:20px ;
        }
      }
      .resultAmount{
        align-items:center ;
        font-size:24px ;
        margin-top:10px ;
        justify-content: center;
        color:var(--color-dark-variant) ;
      }
    }
  }

  @media screen and (max-width: 1540px) {
    .chart{
      width : 170px;
      height: 170px ;
      margin-bottom: 10px ;
    }
    p{
      padding-bottom: 20px;
      padding-top: 12px;
    }
  }

  @media (max-width: 1280px){
    .chart{
      width : 120px;
      height: 120px ;
      margin-bottom:5px ;
    }
    p{
      padding-bottom: 20px;
      padding-top: 12px;
    }
  }
  
`;

export default StatusConnectedProfiles;