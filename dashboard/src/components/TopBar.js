import React from 'react';
import styled from 'styled-components';

function TopBar() {
  return (
    <TopBarStyle>
        <WrapperStyle>
           <div className="search">
               <input className="search" placeholder="Search..."></input>
               <span class="material-icons-sharp">search</span>
           </div>
           <div className="adminDetails">
               <img src="https://cdn.pixabay.com/photo/2020/04/15/16/58/smile-5047506_960_720.jpg"></img>
               <h3>Admin Name</h3>
           </div>
        </WrapperStyle>
    </TopBarStyle>
  )
};

const TopBarStyle = styled.div`
    background-color: #f8f0e8;
    border-top-right-radius: 15px;
    height: 11%;
    display: flex;
`;

const WrapperStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content:space-around;
    width: 100%;

    .search{
        align-items: center;
        justify-content:center;
        outline: none;
        display: flex;
        width: 18rem;
        border-radius: 8px;
        padding: 0.2rem 0.5rem;
        border: none;
        font-size:1rem;
        background-color:white;

        span{
            color: var(--color-primary-purple);
            cursor: pointer;
            transition: all 300ms ease;

            &:hover{
                transform: scale(1.2) ;
            }
        }
    }

    .adminDetails{
        align-items: center;
        justify-content:center;
        display: flex;
        color: var(--color-dark-variant);
        gap:1rem;

        img{
            height:58px;
            width:58px;
            border-radius:50%;
            object-fit: cover;
            border: 0.5px solid var(--color-dark-variant);
        }
    }
`; 

export default TopBar;