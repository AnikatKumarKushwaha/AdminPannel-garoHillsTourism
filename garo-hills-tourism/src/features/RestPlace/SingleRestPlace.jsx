import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeRestPlace } from "../../redux/slice/restplaceSlice";
import Button from "../../ui/Button";
import UpdateRestplace from "./UpdateRestplace";

export default function SingleRestPlace({ place, error, isLoading, status }) {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  const truncatedName =
    place.name.length > 20 ? `${place.name.slice(0, 20)}...` : place.name;
  const truncatedDescription =
    place.description.length > 30
      ? `${place.description.slice(0, 30)}...`
      : place.description;
  const truncatedAddress =
    place.address.length > 30
      ? `${place.address.slice(0, 30)}...`
      : place.address;

  function handelDelete() {
    dispatch(removeRestPlace(place._id));
    console.log(isLoading, status, error);
  }

  return (
    <>
      <li className="grid grid-cols-[0.6fr_1.4fr_2.2fr_1fr_1fr] place-items-center items-center rounded-md border border-stone-200 bg-stone-50">
        <div className="w-15 h-24">
          <img
            className="m-2 h-[80%] rounded-sm"
            src={place.image}
            alt="place_image"
          />
        </div>
        <div>{truncatedName}</div>
        <div>{truncatedDescription}</div>
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
          <UpdateRestplace placeToEdit={place} />
        </div>
      )}
    </>
  );
}
