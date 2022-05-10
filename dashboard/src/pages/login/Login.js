import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

function Login() {

  const[hide,setHide] = useState(true);

  const hideHandler = () => {
    let inputPassword = document.querySelector('#password');
    setHide(!hide);
    if (inputPassword.type === "password") {
      inputPassword.type = "text";
    } else {
      inputPassword.type = "password";
    }
  }

  return (
      <ContainerStyle>
        <h1>Perfect<span>Fit</span></h1>
        <h3>Log In</h3>
        <InputStyle type="text" id="userName" placeholder="User Name" autocomplete="off" />
        <div className="pass-input">
          <InputStyle type="password" id="password" placeholder="Password" />
          <span className="material-icons-sharp" onClick={()=> hideHandler()}>{hide ? 'visibility' : 'visibility_off'}</span>
        </div>
        <ButtonStyle>
          <Link to="/home" className='link'>Log In</Link>
        </ButtonStyle>
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

  border: 1px solid #f8f0e8a6 ;
  margin-top:1rem ;
  
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