import React from "react";
import { commerce } from "../lib/commerce";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ProductDetails from "../components/ProductDetails";
function Product() {
  const { productID } = useParams();
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [cart, setCart] = useState({});
  const [product, setProducts] = useState([]);

  const fetchProducts = async () => {
    await commerce.products.retrieve(productID).then((products) => {
      setProducts(products);
      setLoading(true);
    });
  };

  // it creates a cart
  const cartHandler = async () => {
    setCart(await commerce.cart.retrieve());
  };
  // adding items to cart using child to parent data props
  const addToCart = async (
    productID,
    productQuantity,
    vareintGroup,
    vareintOpt
  ) => {
    await commerce.cart
      .add(productID, productQuantity, { [vareintGroup]: vareintOpt })
      .then((cartItems) => {
        setCart(cartItems.cart);
      });
  };
  useEffect(() => {
    fetchProducts();
    cartHandler();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <ProductDetails singleProduct={product} onAddToCart={addToCart} />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Product;
