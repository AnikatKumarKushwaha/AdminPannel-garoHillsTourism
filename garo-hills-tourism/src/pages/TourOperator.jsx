import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOperator } from "../redux/slice/operatorSlice";
import SingleOperator from "../features/TourOperator/SingleOperator";

export default function TourOperator() {
  const dispatch = useDispatch();
  const { data, isLoading, error, status } = useSelector(
    (state) => state.operator
  );

  useEffect(() => {
    dispatch(fetchOperator());
  }, [dispatch]);

  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1 className=" text-2xl font-medium">Places</h1>
          <p>Filter/Sort</p>
        </div>

        <header className="mt-5 overflow-hidden rounded-t-md border border-stone-200 text-lg font-semibold">
          <ul className=" grid grid-cols-[1.4fr_1.4fr_1.4fr_1fr_1fr] place-items-center items-center justify-center gap-y-4 bg-slate-50 px-2 py-2 uppercase tracking-wide text-slate-600">
            <li>Title</li>
            <li>Name</li>
            <li>Email</li>

            <li>Address</li>
            <li>Operations</li>
          </ul>
        </header>

        <ul className=" flex flex-col gap-2">
          {data.map((place) => (
            <SingleOperator
              place={place}
              key={place._id}
              error={error}
              isLoading={isLoading}
              status={status}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
