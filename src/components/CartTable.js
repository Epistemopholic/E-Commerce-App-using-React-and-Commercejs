import React from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { BsBagCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import CartTableData from "./CartTableData";
function CartTable({ product, getID, getIQ }) {
  const removeFromCart_1 = (getID_2) => {
    getID(getID_2);
  };

  return (
    <div>
      <Container className="py-4">
        <Table responsive>
          <thead>
            <tr className="shadow-sm bg-primary-new rounded">
              <th>
                <div className="text-uppercase">Product</div>
              </th>
              <th>
                <div className="text-uppercase">Price</div>
              </th>
              <th>
                <div className="text-uppercase">Quantity</div>
              </th>
              <th>
                <div className="text-uppercase">Total</div>
              </th>
              <th>
                <div className="text-uppercase">Actions</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {product.line_items.map((data) => (
              <tr key={data.id}>
                <CartTableData
                  data={data}
                  getID_2={removeFromCart_1}
                  getIQ_2={getIQ}
                />
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="fw-bold d-flex justify-content-between align-items-center bg-light p-2 rounded shadow">
          <div>Total Products: {product.total_items}</div>
          <div>Total Price: {product.subtotal.formatted_with_code}</div>
          <Link
            type="Button"
            to={`/checkout/${product.id}`}
            className="btn btn-sm shadow-sm rounded btn-primary-new d-flex align-items-center"
            style={{ width: "fit-content" }}
          >
            <BsBagCheck size={20} />
            <span className="p-1 d-flex justify-content-end">Checkout</span>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default CartTable;
