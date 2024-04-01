import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthInputField from "../../ui/AuthInputField";
import FormError from "../../ui/FormError";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slice/UserSlice";
import toast from "react-hot-toast";

export default function LoginForm() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const dispatch = useDispatch();
  const { data, isLoading, errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (!isLoading && JSON.stringify(data) !== "{}" && !errorMessage.message) {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } else if (!!errorMessage.message) {
      toast.error("Enter valid credentials");
    }
  }, [data, isLoading, errorMessage, navigate]);

  const onError = (error) => {
    console.log(error);
  };

  return (
    <form
      className="w-full md:pr-20"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
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
      <button className="rounded-2xl bg-gradient-to-tr from-green-400 to-green-600 px-4 py-2 text-green-50 shadow-lg">
        Login
      </button>
      <div className="mt-5 text-center text-sm">
        Do not have an account?
        <div className="text-green-500">
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </form>
  );
}
