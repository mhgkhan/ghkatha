import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingNavbar from "./components/LandingNavbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import About from "./pages/About";


  

function App() {
  return (
    <BrowserRouter>
      {/* header  */}
      <LandingNavbar />
      {/* bridge  */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {/* footer  */}
      <footer />
    </BrowserRouter>
  );
}

export default App;
