import React from "react"; // import java.util.*
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Header from "./components/main/Header";
import FoodFind from "./components/food/FoodFind";
import Detail from "./components/food/Detail";
import Home from "./components/main/Home";
// import java.util.Scanner
/*
     관리 = 해당 Component (JSP)를 찾아주는 역할
             Router
               |
            화면 모음 = Routes
              |
            화면 1개 = Route
 */
function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/food/detail/:no" element={<Detail/>}></Route>
        <Route path="/food/find" element={<FoodFind/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
