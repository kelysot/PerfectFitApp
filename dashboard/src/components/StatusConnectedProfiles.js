import React from 'react';
import styled from "styled-components";
import {CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

function StatusConnectedProfiles() {
  return (
    <StatusConnectedProfilesStyle>
        <TopStyle>
            <h3 className="title">Status Of Connected Profiles</h3>
        </TopStyle>
        <BottomStyle>
          <div className="chart">
            <CircularProgressbar 
            value={70} text= {"70%"} 
            strokeWidth={1.7} 
            styles={buildStyles({
            pathColor: `rgb(255 136 136 / 60%)`,
            textColor: '#f88'})}/>
          </div>
          <p>Of The Profiles Are Conected Now</p>
          <div className="summery">
            <div className="item">
              <div className="itemTitle">
                <span className="material-icons-sharp">person_outline</span>
                <div className="title">Total</div>
              </div>
             <div className="resultAmount">40</div>
            </div>
            <div className="item">
              <div className="itemTitle">
                <span className="material-icons-sharp">male</span>
                <div className="title">Male</div>
              </div>
             <div className="resultAmount">17</div>
            </div>
            <div className="item">
              <div className="itemTitle">
                <span className="material-icons-sharp">female</span>
                <div className="title">Female</div>
              </div>
             <div className="resultAmount">23</div>
            </div>
          </div>
        </BottomStyle>
    </StatusConnectedProfilesStyle>
  )
};

const StatusConnectedProfilesStyle = styled.div`
    background-color: #ffffffe8;
    border-radius: 8px;
    box-shadow: 0px -12px 15px rgb(0 0 0 / 10%);
    padding: 10px;
    flex:4;
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
`;

export default StatusConnectedProfiles;