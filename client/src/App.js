import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
