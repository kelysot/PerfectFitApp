import React , {useContext,useState,useEffect} from 'react';
import styled from 'styled-components';
import {DarkModeContext} from '../../src/context/darkModeContext';

function TopBar() {

    const {dispatch} = useContext(DarkModeContext);
    const[nameAndImageAdmin,setNameAndImageAdmin] = useState("");
    const[search,setSearch] = useState("");

    useEffect(() => {
        fetch("/admin/getAdminData",{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then((res) => res.json())
          .then((data) => {
            setNameAndImageAdmin({
              image: data.data.image
            });
        })
    },[])

    const inputHandler = (e) => {
        const newInput = {...search};
        newInput[0] = e.target.value;
        setSearch(newInput);
    };

    const searchHandler = () => {
        console.log(search);
    };  

    return (
        <TopBarStyle>
            <WrapperStyle>
            <div className="search">
                <input className="search" onChange={inputHandler} placeholder="Search..."></input>
                <span className="material-icons-sharp" onClick={searchHandler}>search</span>
            </div>
            <div className="mode">
                <span className="material-icons-sharp" id="light" onClick={() => dispatch({type: 'LIGHT'})} >light_mode</span>
                <span className="material-icons-sharp" id="dark" onClick={() => dispatch({type: 'DARK'})} >dark_mode</span>
            </div>
            <div className="adminDetails">
                <img src={nameAndImageAdmin.image !== 'undefined' ? nameAndImageAdmin.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb75aLAsHQuVvgofGiZw0yCiEDZz_LRBNmPw&usqp=CAU'}></img>
                <h3>Admin Dashboard</h3>
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

    .mode{
        display: flex;
        align-items: center;
        gap: 25px;

        #light {
            color: #d4c930;
            font-size: 35px;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover{
                transform: scale(1.2) ;
            }
        }

        #dark {
            color: var(--color-dark-variant);
            font-size: 35px;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover{
                transform: scale(1.2) ;
            }
        }
    }
`; 

export default TopBar;