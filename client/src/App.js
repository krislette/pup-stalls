import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./components/signup";
import LogIn from "./components/login";

import Dashboard from "./components/dashboard";
import Home from "./components/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LogIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>

          <Route path='/' element={<Dashboard/>}>
            <Route path='' element={<Home/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;