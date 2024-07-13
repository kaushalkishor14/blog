import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function SignUp() {
 
  const signup = async (data) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();
  
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg 
        bg-gray-100 rounded-md border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight ">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have a account
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200
        hover:underline"
          >
            Sign in
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter  ypur email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/.test(value) ||
                    "Email addrsss must be a valid",
                },
              })}
            />

            <Input
            label="password"
            type="password"
            placeholder="Enter your password"
             {...register("password",{
              required:true,
             })}
            />

            <Button type="submit" className="w-full">Signup</Button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default SignUp;
