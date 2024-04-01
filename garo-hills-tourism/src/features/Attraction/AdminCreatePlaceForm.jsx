import React, { useEffect } from "react";

import Button from "../../ui/Button";

import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";
import {
  addNewAttraction,
  clearStatus,
} from "../../redux/slice/attractionSlice";

export default function AdminCreatePlaceForm() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const { isLoading, isError, status } = useSelector(
    (state) => state.attraction
  );
  console.log(isLoading, isError, status);

  function onSubmit(data) {
    dispatch(
      addNewAttraction({
        ...data,
        headerimage: data.headerimage[0],
        img1: data.img1[0],
      })
    );
    console.log(data);
  }

  useEffect(() => {
    if (!isLoading && !isError && status === "success") {
      toast.success("Place successfully added");
      reset();
      dispatch(clearStatus());
    } else if (isError) {
      toast.error("Could not add new place, something went wrong");
    }
  }, [isLoading, isError, status, reset, dispatch]);

  function onError(error) {
    console.log(error);
  }

  return (
    <div className="px-2 py-2">
      <form
        className=" rounded-md border border-slate-300 bg-slate-50 px-6 py-4"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        {/****************** Name*****************************/}
        <FormRow label="Place Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            register={{
              ...register("name", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow>
        {/****************** Description *****************************/}
        <FormRow label="Description" error={errors?.description?.message}>
          <Input
            type="text"
            id="description"
            rows={3}
            register={{
              ...register("description", {
                required: "This Field is required",
                minLength: {
                  value: 10,
                  message: "The field shoul atleast contain length of 50",
                },
              }),
            }}
          />
        </FormRow>

        {/****************** category *****************************/}
        <FormRow label="Category" error={errors?.category?.message}>
          <Input
            type="text"
            id="category"
            register={{
              ...register("category", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow>

        {/****************** fromtura *****************************/}
        <FormRow label="From Tura" error={errors?.category?.message}>
          <Input
            type="text"
            id="fromtura"
            register={{
              ...register("fromtura", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow>

        {/****************** location *****************************/}

        <FormRow label="Location" error={errors?.location?.message}>
          <Input
            type="text"
            id="location"
            register={{
              ...register("location", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow>

        {/****************** Transportation *****************************/}

        <FormRow label="Transportation" error={errors?.transportation?.message}>
          <Input
            type="text"
            id="tranportation"
            register={{
              ...register("transportation", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow>

        {/****************** nearesttown *****************************/}
        <FormRow label="Nearest Town" error={errors?.transportation?.message}>
          <Input
            type="text"
            id="nearesttown"
            register={{
              ...register("nearesttown", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow>
        {/****************** map *****************************/}
        <FormRow label="Map" error={errors?.map?.message}>
          <Input
            type="text"
            id="map"
            register={{
              ...register("map", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow>
        {/****************** direction *****************************/}
        <FormRow label="Direction" error={errors?.direction?.message}>
          <Input
            type="text"
            id="direction"
            register={{
              ...register("direction", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow>

        {/****************** Header Image *****************************/}

        <FormRow label="Header Image" error={errors?.image?.message}>
          <FileInput
            id="headerimage"
            register={{
              ...register("headerimage", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow>

        {/****************** img1 *****************************/}
        <FormRow label="Image 1" error={errors?.image?.message}>
          <FileInput
            id="img1"
            register={{
              ...register("img1", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow>

        {/* ***************** img2 ****************************
        <FormRow label="Image 2" error={errors?.image?.message}>
          <FileInput
            id="img2"
            register={{
              ...register("img2", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow> */}

        <FormRow>
          <Button type="reset" color="danger">
            Reset
          </Button>
          <Button color="primary">Create new Place</Button>
        </FormRow>
      </form>
    </div>
  );
}
