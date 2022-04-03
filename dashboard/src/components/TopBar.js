import React from 'react';
import styled from 'styled-components';

function TopBar({nameOfAdmin}) {
  return (
    <TopBarStyle>
        <WrapperStyle>
           <div className="search">
               <input className="search" placeholder="Search..."></input>
               <span className="material-icons-sharp">search</span>
           </div>
           <div className="adminDetails">
               <img src="https://cdn.pixabay.com/photo/2020/04/15/16/58/smile-5047506_960_720.jpg"></img>
               <h3>{nameOfAdmin}</h3>
           </div>
        </WrapperStyle>
    </TopBarStyle>
  )
};

const TopBarStyle = styled.div`
    padding: 0.5rem;
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