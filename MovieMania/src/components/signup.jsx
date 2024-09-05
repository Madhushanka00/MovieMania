import * as React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import Movieroll from "../../public/movieroll.svg";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Perform any form validation or API calls here
    navigate("/home");
  };

  return (
    <div className="bg-gray-800 px-8 py-8 rounded-2xl border-2 border-gray-700">
      <h1 className="text-3xl font-semibold text-white">Create an Account</h1>
      <p className="font-base text-sm text-gray-400 mt-3">
        Join MovieMania! Please fill in your details to create an account.
      </p>
      <div className="mt-5">
        <div className="mb-4">
          <label className="text-base font-semibold text-white">
            Full Name
          </label>
          <input
            className="w-full border-2 border-gray-700 rounded-xl p-2 mt-1 bg-gray-900 text-white"
            placeholder="Enter your full name"
          />
        </div>
        <div className="mb-4">
          <label className="text-base font-semibold text-white">Email</label>
          <input
            className="w-full border-2 border-gray-700 rounded-xl p-2 mt-1 bg-gray-900 text-white"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="text-base font-semibold text-white">Password</label>
          <input
            className="w-full border-2 border-gray-700 rounded-xl p-2 mt-1 bg-gray-900 text-white"
            placeholder="Enter your password"
            type="password"
          />
        </div>
        <div className="mb-4">
          <label className="text-base font-semibold text-white">
            Confirm Password
          </label>
          <input
            className="w-full border-2 border-gray-700 rounded-xl p-2 mt-1 bg-gray-900 text-white"
            placeholder="Confirm your password"
            type="password"
          />
        </div>
        <div className="mt-6 flex flex-col gap-y-2">
          <button
            onClick={handleSignUp}
            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 bg-violet-500 text-white text-lg font-bold rounded-xl"
          >
            Sign up
          </button>
          <button className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all flex border-2 border-gray-700 py-2 rounded-xl items-center justify-center gap-6 bg-gray-800 text-white">
            <GoogleIcon />
            Sign up with Google
          </button>
        </div>
        <div className="my-4 flex justify-center items-center">
          <p className="text-sm font-medium text-gray-400">
            Already have an account?
          </p>
          <button
            className="text-violet-500 text-sm font-medium ml-2"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
