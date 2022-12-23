import React, { useState, useEffect } from "react";
import CheckoutCard from "../components/CheckoutCard";
import { useParams } from "react-router-dom";
import { commerce } from "../lib/commerce";
import Loading from "../components/Loading";

function Checkout() {
  const { cartID } = useParams();
  const [cartToken, setCartToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateToken = async () => {
    await commerce.checkout
      .generateToken(cartID, {
        type: "cart",
      })
      .then((data) => {
        setCartToken(data);
        setLoading(true);
      });
  };
  useEffect(() => {
    generateToken();
    // eslint-disable-next-line
  }, [cartID]);
  return <>{loading ? <CheckoutCard cartToken={cartToken} /> : <Loading />}</>;
}

export default Checkout;
