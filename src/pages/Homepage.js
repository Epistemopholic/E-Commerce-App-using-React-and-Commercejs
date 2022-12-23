import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Slider from "../components/Slider";
import { commerce } from "../lib/commerce";
import Loading from "../components/Loading";
function Homepage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    await commerce.products.list().then((products) => {
      setProducts(products.data);
      setLoading(true);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <Slider />
      {loading ? <ProductCard products={products} /> : <Loading />}
    </>
  );
}

export default Homepage;
