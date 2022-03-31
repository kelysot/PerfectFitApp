import React from 'react';
import styled from "styled-components";

function Login() {
  return (
    <LoginStyle>
      <ContainerStyle>
        <h1>Perfect<span>Fit</span></h1>
        <h2>Log In</h2>
        <InputStyle type="text" id="userName" placeholder="User Name" autocomplete="off" />
        <InputStyle type="text" id="password" placeholder="Password" autocomplete="off"/>
        <ButtonStyle>Log In</ButtonStyle>
      </ContainerStyle>
    </LoginStyle>
  )

  
}

const LoginStyle = styled.div`
   display:flex;
  box-shadow:-15px 20px 20px rgb(0 0 0 / 12%);
  border-radius:15px;
`;

const ContainerStyle = styled.div`
   flex:6 ;
    background-color: #f8f0e8a6;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    min-height:50px;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction:column ;
    color:var(--color-iconCard-purple);
    h1{
    font-size:2.5rem;
    padding-top:1rem;
    color: var(--color-primary-purple);
    span{
      color: #f3af6b;
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

`;
const ButtonStyle = styled.div`
  padding: 0.5rem;
  margin:15px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.5s all ease;
  border-radius: 10px;
  border: 1px solid;
  background: #f8f0e8a6;
  color:var(--color-primary-purple) ;
  border: 1px solid var(--color-primary-purple) ;

  :hover {
    background: var(--color-primary-purple) ;
    color:#f8f0e8a6 ;
    border: 1px solid #f8f0e8a6 ;
  }
`

export default Login;