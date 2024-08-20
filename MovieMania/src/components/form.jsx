import * as React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import Movieroll from "../../public/movieroll.svg";

export default function Form() {
  return (
    <div className="bg-white px-10 py-10 rounded-3xl border-2 border-gray-200">
      <h1 className="text-4xl font-semibold">Welcome Back</h1>
      <p className="font-base text-sm text-grey-500 mt-4">
        Welcome Back to MovieMania ! Please enter your details.
      </p>
      <div className="mt-6">
        <div>
          <label className="text-base font-semibold">Email</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="text-base font-semibold">Password</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
            placeholder="Enter your password"
            type="password"
          />
        </div>
        <div className="flex justify-between mt-8 items-center">
          <div>
            <input type="checkbox" id="remember" />
            <label className="ml-2 font-medium text-sm" for="remember">
              Remember me
            </label>
          </div>
          <button className="font-medium text-sm text-violet-500">
            Forgot password
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-y-3">
          <button className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all  py-2 bg-violet-500 text-white text-lg font-bold rounded-xl">
            Sign in
          </button>
          <button className=" active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all flex border-2 border-gray-100 py-2 rounded-xl items-center justify-center gap-6">
            <GoogleIcon />
            Sign in with Google
          </button>
        </div>
        <div className="my-4 flex justify-center items-center">
          <p className="text-sm font-medium ">Don't have an account?</p>
          <button className="text-violet-500 text-sm font-medium ml-2">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
