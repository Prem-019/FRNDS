import './App.css';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" exact element={<SignIn />} />
        <Route path="/signin" exact element={<SignIn />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/admin" exact element={<Admin />} />
        {/* <Route path="register" exact element={<Register />} /> */}
        {/* <Route path="events" exact element={<Events />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
