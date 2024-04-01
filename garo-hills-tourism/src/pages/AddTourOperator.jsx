import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addNewOperator } from "../redux/slice/operatorSlice";
import toast from "react-hot-toast";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { clearStatus } from "../redux/slice/restplaceSlice";

export default function AddTourOperator() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const { isLoading, isError, status } = useSelector((state) => state.operator);
  console.log(isLoading, isError, status);

  function onSubmit(data) {
    dispatch(addNewOperator(data));
    console.log(data);
  }

  useEffect(() => {
    if (!isLoading && !isError && status === "success") {
      toast.success("Operator successfully added");
      reset();
      dispatch(clearStatus());
    } else if (isError) {
      toast.error("Could not add new Operator, something went wrong");
    }
  }, [isLoading, isError, status, reset, dispatch]);

  function onError(error) {
    console.log(error);
  }

  return (
    <div className="px-2 py-2">
      <form
        className="rounded-md border border-slate-300 bg-slate-50 px-6 py-4"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        {/****************** title*****************************/}
        <FormRow label="Title" error={errors?.title?.message}>
          <Input
            type="text"
            id="title"
            register={{
              ...register("title", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow>
        {/****************** Name*****************************/}
        <FormRow label="Name" error={errors?.name?.message}>
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
        {/****************** Phone no *****************************/}
        <FormRow label="Pnone no." error={errors?.contact?.message}>
          <Input
            type="text"
            id="contact"
            register={{
              ...register("contact", {
                required: "This Field is required",
                minLength: {
                  value: 10,
                  message: "Enter a valid number",
                },
              }),
            }}
          />
        </FormRow>

        {/****************** category *****************************/}
        <FormRow label="Email" error={errors?.email?.message}>
          <Input
            type="text"
            id="email"
            register={{
              ...register("email", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow>

        {/****************** fromtura *****************************/}
        <FormRow label="Attraction" error={errors?.attraction?.message}>
          <Input
            type="text"
            id="attraction"
            register={{
              ...register("attraction", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow>

        {/****************** location *****************************/}

        <FormRow label="Address" error={errors?.address?.message}>
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
