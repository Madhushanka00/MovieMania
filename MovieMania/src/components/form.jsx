import * as React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import Movieroll from "../../public/movieroll.svg";
import { useNavigate } from "react-router-dom";

export default function Form({ setIsLogin }) {
  const navigate = useNavigate();
  const handleSignIn = () => {
    // Perform any form validation or API calls here

    // After successful sign-in, navigate to the home page
    navigate("/home");
  };

  const gotoSignup = () => {
    setIsLogin(false);
  };

  return (
    <div className="bg-gray-800 px-10 py-10 rounded-3xl border-2 border-gray-700">
      <h1 className="text-4xl font-semibold text-white">Welcome Back</h1>
      <p className="font-base text-sm text-gray-400 mt-4">
        Welcome Back to MovieMania! Please enter your details.
      </p>
      <div className="mt-6">
        <div>
          <label className="text-base font-semibold text-white">Email</label>
          <input
            className="w-full border-2 border-gray-700 rounded-xl p-3 mt-1 bg-gray-900 text-white"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="text-base font-semibold text-white">Password</label>
          <input
            className="w-full border-2 border-gray-700 rounded-xl p-3 mt-1 bg-gray-900 text-white"
            placeholder="Enter your password"
            type="password"
          />
        </div>
        <div className="flex justify-between mt-8 items-center">
          <div>
            <input
              type="checkbox"
              id="remember"
              className="accent-violet-500"
            />
            <label
              className="ml-2 font-medium text-sm text-gray-400"
              htmlFor="remember"
            >
              Remember me
            </label>
          </div>
          <button className="font-medium text-sm text-violet-500">
            Forgot password
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-y-3">
          <button
            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 bg-violet-500 text-white text-lg font-bold rounded-xl"
            onClick={handleSignIn}
          >
            Sign in
          </button>
          <button className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all flex border-2 border-gray-700 py-2 rounded-xl items-center justify-center gap-6 bg-gray-800 text-white">
            <GoogleIcon />
            Sign in with Google
          </button>
        </div>
        <div className="my-4 flex justify-center items-center">
          <p className="text-sm font-medium text-gray-400">
            Don't have an account?
          </p>
          <button
            className="text-violet-500 text-sm font-medium ml-2"
            onClick={gotoSignup}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
