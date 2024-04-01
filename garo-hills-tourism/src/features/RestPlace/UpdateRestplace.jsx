import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateRestPlace } from "../../redux/slice/restplaceSlice";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";

export default function UpdateRestplace({ placeToEdit = {} }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: placeToEdit,
  });
  const { errors } = formState;

  const { isLoading, isError } = useSelector((state) => state.restplace);

  function onSubmit(data) {
    if (data.image) {
      if (data.image.length === 0) {
        data.image = placeToEdit.image;
      } else if (data.image.length === 1) {
        data.image = data.image[0];
      }
    }
    dispatch(updateRestPlace(data));
    if (!isLoading && !isError) {
      toast.success("Rest place successfully updated");
      reset();
    } else if (isError) {
      toast.error("Could not update Rest Place, something went wrong");
      return;
    }
  }
  function onError(error) {
    console.log(error);
  }

  return (
    <div className="px-5 py-5">
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
          <Button color="primary">Update place</Button>
        </FormRow>
      </form>
    </div>
  );
}
