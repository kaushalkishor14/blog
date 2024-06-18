import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Logo, Input } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, seterror] = useState("");

  const login = async (data) => {
    seterror("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      seterror(error.message);
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg *:bg-gray-100 rounded-lg p-10 
            border border-black/10
            `}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2
          className="text-center text-2xl 
           font-bold leading-tight "
        >
          Sign in to ypur account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&appos;t have account
          <Link
            to="/signup"
            className="font-medium text-primary
            transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
