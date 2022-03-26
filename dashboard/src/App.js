import React from "react"
import GlobalStyle from './components/GlobalStyle'
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Categories from "./pages/categories/Categories"; 
import NewCategory from "./pages/new category/NewCategory";
import SingleCategory from "./pages/single category/SingleCategory";
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Routes path="/">
        <Route index element={<Home/>}></Route>
        <Route path="/login" element={<Login/>} ></Route>
        <Route path="categories">
          <Route index element={<Categories/>}></Route>
          <Route path=":categoryId" element={<SingleCategory/>}></Route>
          <Route path="newCategory" element={<NewCategory/>}></Route>
        </Route>
      </Routes>
      //TODO: option to add more routes for example to users
    </div>
  );
}

export default App;
