import React , {useState,useContext,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';
import {UserAutContext} from '../../context/userAutContext';

function Login() {

  useEffect(() => {
    localStorage.setItem('token','');
  },[])
  
  let navigate = useNavigate();
  const {dispatch} = useContext(UserAutContext);
  const[error,setError] = useState("");
  const[hide,setHide] = useState(true);
  const[adminDetails,setAdminDetails] = useState({
    email: "",
    password: ""
  });

  const hideHandler = () => {
    let inputPassword = document.querySelector('#password');
    setHide(!hide);
    if (inputPassword.type === "password") {
      inputPassword.type = "text";
    } else {
      inputPassword.type = "password";
    }
  }

  function handle(e) {
    const newData = { ...adminDetails };
    newData[e.target.id] = e.target.value;
    setAdminDetails(newData);
  }

  function submit(e) {
    e.preventDefault();
    
    axios
      .post('/admin/login', adminDetails, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(data => {
        localStorage.setItem('token', data.data.accessToken);
      })
      .then(() => dispatch({type: 'LOGIN'}))
      .then(() => navigate("/home"))
      .catch(err => {
        console.error(err);
        setError("* Email and/or password incorrect");
      });
  }

  return (
      <ContainerStyle>
        <h1>Perfect<span>Fit</span></h1>
        <h3>Log In</h3>
        <form onSubmit={(e) => submit(e)}>
          <InputStyle type="text" id="email" placeholder="User Name" autoComplete='off' onChange={(e) => handle(e)} value={adminDetails.email}/>
          <div className="pass-input">
            <InputStyle type="password" id="password" placeholder="Password"  onChange={(e) => handle(e)} value={adminDetails.password} />
            <span className="material-icons-sharp" onClick={()=> hideHandler()}>{hide ? 'visibility' : 'visibility_off'}</span>
          </div>
          <span id="error">{error}</span>
          <ButtonStyle>Login</ButtonStyle>
        </form>
      </ContainerStyle>
  )
}

const ContainerStyle = styled.div`
  background: #f8f0e8a6;;
  margin: auto;
  width: fit-content;
  padding: 40px 60px;
  border-radius: 15px;
  flex-direction: column;
  display: flex;
  color:var(--color-iconCard-purple);
  margin:auto ;
  align-items: center;
  box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.18);

  form{
    align-items: center;
    display: flex;
    flex-direction: column;

    #error{
      color: var(--color-downIcon-red);
      font-weight: bold;
    }
  }

  h1{
    font-size:2.5rem;
    padding-top:3px;
    color: var(--color-primary-purple);
  }
  span {
    color: #f3af6b;
  }
  h3{
    margin-bottom: 0.7rem;
  }

  .pass-input{
    display: flex;
    align-items: center;
    position: relative;

    span {
      position: absolute;
      right: 18px;
      cursor: pointer;
      color: #7682ec;
    }
  }
  
`;
const InputStyle = styled.input`
  margin: 0.7rem;
  background: #f8f0e8a6;
  border: none;
  border-radius:5px ;
  border-bottom: 1px solid;
  border-bottom-color: var(--color-primary-purple);
  font-size: 18px;
  padding: 0.5rem;
  width:18rem ;
`;

const ButtonStyle = styled.button`
  padding: 0.5rem 2rem ;
  font-size: 16px;
  font-weight:bolder ;
  cursor: pointer;
  transition: 0.5s all ease;
  border-radius: 10px;
  border: 1px solid;
  background: var(--color-primary-purple) ;
  color:#f8f0e8a6;
  border: 1px solid #f8f0e8a6 ;
  margin: 1rem 0rem 0.2rem 0rem;
  
  :hover {
    border: 1px solid var(--color-primary-purple) ;
    transform: scale(1.03) ;
  }

  .link{
    text-decoration: none;
    color:#f8f0e8a6;
  }
`

export default Login;