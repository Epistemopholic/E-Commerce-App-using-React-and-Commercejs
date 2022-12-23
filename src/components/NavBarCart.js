import Badge from "react-bootstrap/Badge";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { commerce } from "../lib/commerce";

function NavBarCart() {
  const [product, setProducts] = useState([]);
  const fetchProducts = async () => {
    await commerce.cart.retrieve().then((products) => {
      setProducts(products);
    });
  };
  useEffect(() => {
    fetchProducts();
  }, [product]);
  return (
    <>
      <Link to="/cart" className="nav-link-new nav-link-ltr-new">
        <HiOutlineShoppingCart size={25} />
        <Badge
          pill
          bg="primary-new"
          className="position-absolute top-1 start-100 translate-middle badge rounded-pill text-black"
        >
          {product.total_items}
        </Badge>
      </Link>
    </>
  );
}

export default NavBarCart;
