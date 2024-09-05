import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import "./index.css";
import Form from "./components/form";
import Signup from "./components/signup";
import Movieroll from "../public/movieroll.svg";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    // <div className="flex w-full h-screen">
    //   <div className="w-full flex items-center justify-center lg:w-1/2">
    //     <Form />
    //   </div>
    //   <div className="hidden relative lg:flex h-full w-1/2 bg-gray-200 items-center justify-center">
    //     <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin "></div>
    //     <img
    //       src={Movieroll}
    //       className="w-60 h-60 absolute filter grayscale animate-spin-slow opacity-50"
    //     />
    //     <div className="w-full h-1/2 bottom-0 absolute bg-white/10 backdrop-blur-lg"></div>
    //   </div>
    // </div>
    <div className="flex w-full h-screen bg-gray-900">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        {isLogin ? (
          <Form setIsLogin={setIsLogin} />
        ) : (
          <Signup setIsLogin={setIsLogin} />
        )}
      </div>
      <div className="hidden relative lg:flex h-full w-1/2 bg-gray-800 items-center justify-center">
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin"></div>
        <img
          src={Movieroll}
          className="w-60 h-60 absolute filter grayscale animate-spin-slow opacity-50"
        />
        <div className="w-full h-1/2 bottom-0 absolute bg-black/10 backdrop-blur-lg"></div>
      </div>
    </div>
  );
}

export default App;
