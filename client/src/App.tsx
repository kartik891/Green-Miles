import LoginPage from "./pages/login";
import { Routes, Route } from 'react-router-dom';
import SignUp from "./pages/signUp";
import HomePage from "./pages/home";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
      </Routes>
    </>
  )
}

export default App
