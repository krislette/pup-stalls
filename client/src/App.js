import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

import Items from "./components/Items";
import AddItem from "./components/AddItem";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path='/' element={<Dashboard />}>
            <Route path='' element={<Home />}></Route>
            <Route path="/items" element={<Items />}></Route>
            <Route path="/add-item" element={<AddItem />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;