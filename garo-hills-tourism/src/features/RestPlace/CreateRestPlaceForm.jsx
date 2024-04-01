import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import { addNewRestPlace, clearStatus } from "../../redux/slice/restplaceSlice";

export default function CreateRestPlaceForm() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const { isLoading, isError, status } = useSelector(
    (state) => state.restplace
  );
  console.log(isLoading, isError, status);

  function onSubmit(data) {
    dispatch(
      addNewRestPlace({
        ...data,
        image: data.image[0],
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
        <FormRow label="Nearby Attraction" error={errors?.category?.message}>
          <Input
            type="text"
            id="nearby"
            register={{
              ...register("nearby", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow>

        {/****************** location *****************************/}

        <FormRow label="Address" error={errors?.location?.message}>
          <Input
            type="text"
            id="address"
            register={{
              ...register("address", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow>

        {/****************** Image *****************************/}

        <FormRow label="Image" error={errors?.image?.message}>
          <FileInput
            id="image"
            register={{
              ...register("image"),
            }}
          />
        </FormRow>
        <FormRow>
          <Button type="reset" color="danger">
            Reset
          </Button>
          <Button color="primary">Create new Rest Place</Button>
        </FormRow>
      </form>
    </div>
  );
}
