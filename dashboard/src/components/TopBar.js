import React , {useContext,useState,useEffect} from 'react';
import styled from 'styled-components';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {DarkModeContext} from '../../src/context/darkModeContext';

function TopBar() {

    const {dispatch} = useContext(DarkModeContext);
    const[nameAndImageAdmin,setNameAndImageAdmin] = useState("");
    const[search,setSearch] = useState("");
    const [searchType, setSearchType] = useState("");
    const [genderType, setGenderType] = useState("");
      
    const handleChangeType = (e) => {
        setSearchType(e.target.value);
    };

    const handleChangeGender = (e) => {
        setGenderType(e.target.value);
    };

    useEffect(() => {
        fetch("/admin/getAdminData",{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
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
        setSearch(e.target.value);
    };
    
    const searchHandler = () => {
        if(searchType !== 'profile'){
            fetch(`/dashboard/search/${search}/${searchType}/${genderType}`,{
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              })
              .then((res) => res.json())
                .then((data) => {
                    window.location.href = data.data;
              })
        }else{
            fetch(`/dashboard/search/${search}/${searchType}`,{
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              })
              .then((res) => res.json())
                .then((data) => {
                    window.location.href = data.data;
              })
        }

        console.log(search);
        setSearch("");
        setGenderType("");
        setSearchType("");
    };  
    return (
        <TopBarStyle>
            <WrapperStyle>
                <div className="search-select">
                    <div className="search">
                        <input className="search" value={search} onChange={inputHandler} placeholder="Search..."></input>
                        <span className="material-icons-sharp" onClick={searchHandler}>search</span>
                    </div>
                    <div className="select-box">
                        <FormControl sx={{minWidth: 150 }} size="small">
                            <Select
                            value={searchType}
                            onChange={handleChangeType}
                            displayEmpty
                            >
                            <MenuItem  value="">
                                <em>Choose type</em>
                            </MenuItem>
                            <MenuItem value={"category"}>Category</MenuItem>
                            <MenuItem value={"subCategory"}>SubCategory</MenuItem>
                            <MenuItem value={"profile"}>Profile</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="select-box">
                        <FormControl sx={{minWidth: 150 }} size="small">
                            <Select
                            value={genderType}
                            onChange={handleChangeGender}
                            displayEmpty
                            >
                            <MenuItem  value="">
                                <em>Choose gender</em>
                            </MenuItem>
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
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
    
    .search-select{
        display: flex;
        gap: 6px;
    }

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

    .css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root{
        border-radius: 8px;
    }

    .css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input{
        padding: 5px;
        background-color: white;
        color: var(--color-dark-variant);
        font-family: 'Nunito',sans-serif;
    }

    .css-1d3z3hw-MuiOutlinedInput-notchedOutline{
        border: none;
    }

    .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root.Mui-selected{
        color: var(--color-dark-variant);
    }
`; 

export default TopBar;