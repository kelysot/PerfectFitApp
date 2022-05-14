import React, {useContext} from "react"
import GlobalStyleDark from '../src/style/dark';
import GlobalStyle from './components/GlobalStyle'
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Categories from "./pages/categories/Categories"; 
import NewCategory from "./pages/new category/NewCategory";
import NewSubCategory from "./pages/newSubCategory/NewSubCategory";
import SingleCategory from "./pages/single category/SingleCategory";
import SingleProfile from "./pages/single profile/SingleProfile";
import Edit from "./pages/edit/Edit";
import {Routes,Route} from "react-router-dom";
import styled from "styled-components";
import {DarkModeContext} from '../src/context/darkModeContext';
import {UserAutContext} from '../src/context/userAutContext';
import Profiles from "./pages/profiles/Profiles";
import Setting from "./pages/admin setting/Setting";
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {

  const {darkMode} = useContext(DarkModeContext);
  const {login} = useContext(UserAutContext);

  return (
    <AppStyle className={ darkMode ? "App dark" : 'App'}>
      <GlobalStyle />
      <GlobalStyleDark />        
      <Routes path="/">
        <Route index element={<Login/>}></Route>
        {/* <Route element={<ProtectedRoutes userState={login}/>}> */}
          <Route path="home" element={<Home />}></Route>
          <Route path="categories">
            <Route index element={<Categories />}></Route>
            <Route path=":categoryId" element={<SingleCategory />}></Route>
            <Route path="newCategory" element={<NewCategory />}></Route>
            <Route path="editCategory/:id" element={<Edit />}></Route>
            <Route path="newSubCategory/:id" element={<NewSubCategory  />}></Route>
            <Route path="editSubCategory/:id" element={<Edit />}></Route>
          </Route>
          <Route path="users">
            <Route index element={<Profiles  />}></Route>
            <Route path=":id" element={<SingleProfile />}></Route>
          </Route>
          <Route path="setting" element={<Setting />}></Route>
        {/* </Route> */}
      </Routes>
    </AppStyle>
  );
}

const AppStyle = styled.div`
    padding: 3rem;
    background: linear-gradient(to right,#f3af6ba6 0%,#cc66ffa3  100%);
    min-height:100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1400px) {
      padding: 0.5rem;
   }
`;

export default App;
