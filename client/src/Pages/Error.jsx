import React from "react";
import error from "../assets/error.png";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="w-screen max-w-3xl mx-auto px-4">
      <div className="mt-20">
        <img src={error} alt="error" />
        <div className="text-center font-bold text-2xl text-balance bg-white pb-20 text-slate-600">
          <p>Oops! Something went wrong.</p>
          <p className="pt-5">
            <Link className="text-primary" to="/">
              Click here
            </Link>{" "}
            to navigate to the home page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;
