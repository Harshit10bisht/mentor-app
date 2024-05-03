// import react from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Main/Dashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element = { <Login/> } />
          <Route path="/login" element = { <Login/> } />
          <Route path="/signup" element = { <Signup/> } />
          <Route path="/dashboard" element = { <Dashboard/> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;