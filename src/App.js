import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingNavbar from "./components/LandingNavbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";
import Katha from "./pages/Katha";
import EditKatha from "./pages/EditKatha";
import Bill from "./pages/Bill";
import StoreProfile from "./pages/dashboard/StoreProfile";



function App() {



  return (

    <BrowserRouter>
      {/* header  */}
      <LandingNavbar />
      {/* bridge  */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<StoreProfile />} />
        <Route path="/katha/:kathaid" element={<Katha />} />
        <Route path="/edit/katha/:kathaid" element={<EditKatha />} />
        <Route path="/kathahistory/bill/:billid" element={<Bill/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {/* footer  */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
