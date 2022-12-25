import React, { useEffect, useState } from "react";
import { commerce } from "../lib/commerce";
import Loading from "../components/Loading";
import CartTable from "../components/CartTable";

function Cart() {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    await commerce.cart.retrieve().then((products) => {
      setProducts(products);
      setLoading(true);
    });
  };

  const removeFromCart = async (getID) => {
    await commerce.cart.remove(getID).then((products) => {
      setProducts(products);
    });
  };
  const updateCart = async (ID, quantity) => {
    await commerce.cart.update(ID, { quantity }).then((products) => {
      setProducts(products);
    });
  };
  useEffect(() => {
    fetchProducts();
  }, [product]);
  return (
    <>
      {loading ? (
        <CartTable
          product={product}
          getID={removeFromCart}
          getIQ={updateCart}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Cart;
