import React from "react";
import Button from "react-bootstrap/Button";
import { AiOutlineDelete } from "react-icons/ai";

function CartTableData({ data, getID_2, getIQ_2 }) {
  // we can pass parent-to-child with extra calling function
  // or without extra function via directly calling getID_2={data.id}
  const removeFromCart_2 = () => {
    getID_2(data.id);
  };

  let incButton = () => {
    getIQ_2(data.id, data.quantity + 1);
  };
  let decButton = () => {
    getIQ_2(data.id, data.quantity - 1);
  };
  return (
    <>
      <td>
        <img
          src={data.image.url}
          height="80px"
          width="80px"
          className="rounded"
          alt={data.name}
        />
        <span className="px-2 align-middle">{data.name}</span>
      </td>
      <td className="align-middle">{data.price.formatted_with_code}</td>
      <td className="align-middle">
        <div className="quantity-control">
          <Button
            onClick={decButton}
            className="quantity-btn btn shadow-lg rounded btn-primary-new"
          >
            -
          </Button>
          <input
            type="number"
            value={data.quantity}
            className="quantity-input"
            disabled={true}
          ></input>
          <Button
            onClick={incButton}
            className="quantity-btn btn shadow-lg rounded btn-primary-new"
          >
            +
          </Button>
        </div>
      </td>
      <td className="align-middle">{data.line_total.formatted_with_code}</td>
      <td className="align-middle">
        <Button onClick={removeFromCart_2} className="btn-primary-new bg-white">
          <AiOutlineDelete size={20} />
        </Button>
      </td>
    </>
  );
}

export default CartTableData;
