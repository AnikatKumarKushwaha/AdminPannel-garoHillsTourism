import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthInputField from "../../ui/AuthInputField";
import FormError from "../../ui/FormError";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slice/UserSlice";

export default function SignupForm() {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, data, isError } = useSelector((state) => state.user);
  const { errors } = formState;

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    console.log(data);
  };
  console.log(data);
  if (!isLoading && JSON.stringify(data) !== "{}") {
    console.log(data);
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/");
  }

  const onError = (error) => {
    console.log(error);
  };
  return (
    <form
      className="w-full md:pr-20"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className="mb-5 flex flex-col gap-2">
        <label className=" text-slate-600">User Name</label>
        <AuthInputField
          type="text"
          id="name"
          placeholder="Enter your name"
          register={{
            ...register("name", {
              required: "Please enter the name",
            }),
          }}
        />
        {errors.name && <FormError>{errors.name.message}</FormError>}
      </div>
      <div className="mb-5 flex flex-col gap-2">
        <label className=" text-slate-600">Email</label>
        <AuthInputField
          type="text"
          id="email"
          placeholder="Enter your email"
          register={{
            ...register("email", {
              required: "Please enter the email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }),
          }}
        />
        {errors.email && <FormError>{errors.email.message}</FormError>}
      </div>
      <div className="mb-5 flex flex-col gap-2">
        <label className="text-slate-600">Password</label>
        <AuthInputField
          type="password"
          id="password"
          placeholder="Enter the password"
          register={{
            ...register("password", {
              required: "Please enter your password",
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                message: "Invalid password",
              },
            }),
          }}
        />
        {errors.password && <FormError>{errors.password.message}</FormError>}
      </div>
      <input type="hidden" id="role" value="user" {...register("role")} />
      <button className="rounded-2xl bg-gradient-to-tr from-green-400 to-green-600 px-4 py-2 text-green-50 shadow-lg">
        Sign up
      </button>
      <div className="mt-5 text-center text-sm">
        Already have an account?
        <div className="text-green-500">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </form>
  );
}
