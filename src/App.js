import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import React from "react";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import NavBar from "./components/NavBar";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:productID" element={<Product />}></Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/:cartID" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
