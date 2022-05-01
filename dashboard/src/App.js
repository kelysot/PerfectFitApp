import React, {useState,useEffect,useContext} from "react"
import GlobalStyleDark from '../src/style/dark';
import GlobalStyle from './components/GlobalStyle'
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Categories from "./pages/categories/Categories"; 
import NewCategory from "./pages/new category/NewCategory";
import NewSubCategory from "./pages/newSubCategory/NewSubCategory";
import SingleCategory from "./pages/single category/SingleCategory";
import Edit from "./pages/edit/Edit";
import {Routes,Route} from "react-router-dom";
import styled from "styled-components";
import {DarkModeContext} from '../src/context/darkModeContext';
import Profiles from "./pages/profiles/Profiles";

function App() {

  const[nameOfAdmin,setNameOfAdmin] = useState("");
  const {darkMode} = useContext(DarkModeContext);

  useEffect(() => {
      fetch("/dashboard",{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((res) => res.json())
      .then((data) => {
        setNameOfAdmin(data.adminName);
        })
  },[])

  return (
    <AppStyle className={ darkMode ? "App dark" : 'App'}>
      <GlobalStyle />
      <GlobalStyleDark />
      <Routes path="/">
        <Route index element={<Login/>} ></Route>
        <Route path="home" element={<Home nameOfAdmin={nameOfAdmin} />}></Route>
        <Route path="categories">
          <Route index element={<Categories  nameOfAdmin={nameOfAdmin} />}></Route>
          <Route path=":categoryId" element={<SingleCategory nameOfAdmin={nameOfAdmin} />}></Route>
          <Route path="newCategory" element={<NewCategory nameOfAdmin={nameOfAdmin}/>}></Route>
          <Route path="editCategory/:id" element={<Edit nameOfAdmin={nameOfAdmin} />}></Route>
          <Route path="newSubCategory/:id" element={<NewSubCategory nameOfAdmin={nameOfAdmin} />}></Route>
          <Route path="editSubCategory/:id" element={<Edit nameOfAdmin={nameOfAdmin} />}></Route>
        </Route>
        <Route path="users">
          <Route index element={<Profiles nameOfAdmin={nameOfAdmin} />}></Route>
        </Route>
      </Routes>
    </AppStyle>
    //TODO: option to add more routes for example to users
  );
}

const AppStyle = styled.div`
    padding: 3rem;
    background: linear-gradient(to right,#f3af6ba6 0%,#cc66ffa3  100%);
    min-height:100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default App;
