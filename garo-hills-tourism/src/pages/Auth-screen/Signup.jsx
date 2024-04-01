import React from "react";
import authImage from "../../assets/Auth.jpg";
import SignupForm from "../../features/Auth/SignupForm";

export default function Signup() {
  return (
    <div className="to mx-7 h-screen bg-yellow-400 bg-gradient-to-br from-yellow-200">
      <div className="flex h-full items-center justify-center">
        <div
          className="h-[70%] w-[80%] rounded-sm bg-cover shadow-2xl"
          style={{ backgroundImage: `url(${authImage})` }}
        >
          <div className="auth h-full w-full bg-yellow-50/80 lg:w-[60%]">
            <div className="h-full py-10 md:px-10">
              <header className=" bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-center text-2xl font-extrabold uppercase tracking-wider text-transparent">
                Sign Up
              </header>
              <div className="flex h-full items-center justify-center p-9">
                <SignupForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
