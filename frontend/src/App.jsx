import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";
import ProductDetail from "./components/product/ProductDetail";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/me/profile" element={<Profile />} />
            <Route path="/me/update_profile" element={<UpdateProfile />} />
          </Routes>
        </div>

        <Footer />
      </div>
      <Toaster position="top-center" />
    </Router>
  );
}

export default App;
