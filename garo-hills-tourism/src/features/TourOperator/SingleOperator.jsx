import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeOperator } from "../../redux/slice/operatorSlice";
import Button from "../../ui/Button";
import UpdateOperator from "./UpdateOperator";

export default function SingleOperator({ place, error, isLoading, status }) {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  const truncateTitle =
    place.title.length > 20 ? `${place.title.slice(0, 20)}...` : place.title;
  const truncatedName =
    place.name.length > 20 ? `${place.name.slice(0, 20)}...` : place.name;
  const truncatedEmail =
    place.email.length > 20 ? `${place.email.slice(0, 20)}...` : place.email;
  const truncatedAddress =
    place.address.length > 20
      ? `${place.address.slice(0, 20)}...`
      : place.address;

  function handelDelete() {
    dispatch(removeOperator(place._id));
    console.log(isLoading, status, error);
  }

  return (
    <>
      <li className="grid grid-cols-[1.4fr_1.4fr_1.4fr_1fr_1fr] place-items-center items-center rounded-md border border-stone-200 bg-stone-50">
        <div>{truncateTitle}</div>
        <div>{truncatedName}</div>
        <div>{truncatedEmail}</div>
        <div>{truncatedAddress}</div>
        <div>
          <Button onClick={handelDelete} color="danger">
            Delete
          </Button>
          <Button color="primary" onClick={() => setShowForm(!showForm)}>
            Edit
          </Button>
        </div>
      </li>
      {showForm && (
        <div className="rounded-md border border-stone-200 bg-stone-50 px-2 py-1">
          <UpdateOperator placeToEdit={place} />
        </div>
      )}
    </>
  );
}
