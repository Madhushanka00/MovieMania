import * as React from "react";
import { useRef, useState, useEffect } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import Movieroll from "../../public/movieroll.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { set } from "mongoose";

export default function Signup({ setIsLogin, userId, setUserId }) {
  const navigate = useNavigate();
  const [validatecode, setValidateCode] = useState(false);

  const userNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  useEffect(() => {
    console.log("validatecode", validatecode);
    validatecode
      ? navigate("/home", { state: { userId } })
      : console.log("error");
  }, [validatecode]);

  const handleSignUp = () => {
    // Perform any form validation or API calls here
    if (
      userNameRef.current.value === "" ||
      emailRef.current.value === "" ||
      passwordRef.current.value === "" ||
      confirmPasswordRef.current.value === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Passwords do not match");
      return;
    }
    fetch(
      `https://dspndkpg-3000.asse.devtunnels.ms/register/${userNameRef.current.value}/${emailRef.current.value}/${passwordRef.current.value}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userNameRef.current.value,
          password: passwordRef.current.value,
          email: emailRef.current.value,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === "User registered successfully") {
          setValidateCode(true);
          setUserId(data.userId);
        } else {
          setValidateCode(false);
          alert("User already exists, try different username");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setValidateCode(false);
      });
    // {
    //   validatecode ? navigate("/home") : console.log("error");
    // }
    // // navigate("/home");
  };
  const gotoSignin = () => {
    setIsLogin(true);
  };

  return (
    <div className="bg-gray-800 px-8 py-8 rounded-2xl border-2 border-gray-700">
      <h1 className="text-3xl font-semibold text-white">Create an Account</h1>
      <p className="font-base text-sm text-gray-400 mt-3">
        Join MovieMania! Please fill in your details to create an account.
      </p>
      <div className="mt-5">
        <div className="mb-4">
          <label className="text-base font-semibold text-white">Username</label>
          <input
            className="w-full border-2 border-gray-700 rounded-xl p-2 mt-1 bg-gray-900 text-white"
            placeholder="Enter your user name"
            ref={userNameRef}
          />
        </div>
        <div className="mb-4">
          <label className="text-base font-semibold text-white">Email</label>
          <input
            className="w-full border-2 border-gray-700 rounded-xl p-2 mt-1 bg-gray-900 text-white"
            placeholder="Enter your email"
            ref={emailRef}
          />
        </div>
        <div className="mb-4">
          <label className="text-base font-semibold text-white">Password</label>
          <input
            className="w-full border-2 border-gray-700 rounded-xl p-2 mt-1 bg-gray-900 text-white"
            placeholder="Enter your password"
            type="password"
            ref={passwordRef}
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
            ref={confirmPasswordRef}
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
            onClick={gotoSignin}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
