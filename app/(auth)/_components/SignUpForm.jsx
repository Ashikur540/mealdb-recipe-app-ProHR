"use client"

import { syncLocalCartToDB } from "@/actions/cart.actions";
import { SocialLoginButton } from "@/components/SocialLoginBtn";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";



const SignUpForm = () => {
    const router= useRouter()
    const { registerUser, setAuthLoading, authLoading } = useAuth()
    const [formError, setFormError] = useState({
        emailError: "",
        passwordError: "",
        phoneError: "",
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormError({
            emailError: "",
            passwordError: "",
            phoneError: ""
        })
        const email = event.target.email?.value
        const password = event.target.password?.value
        const phoneNumber = event.target.phone?.value
        const name = event.target.name?.value
        if (password.length < 6) {
            setFormError(prev => ({
                ...prev,
                passwordError: "Password must be minimum 6 Characters long!"
            }));
            return;
        }
        await handleRegister({ email, name, password, phoneNumber })
        event.target.reset();

    };


    const handleRegister = async ({ email, password, name, phoneNumber }) => {
        const localCart = JSON.parse(localStorage.getItem("meal-cart")) || [];
        registerUser(email, password, name, phoneNumber)
            .then(async result => {
                const user = result?.user;
                console.log("✨ ~ file: SignUpForm.jsx:54 ~ handleRegister ~ user:", user)
                setAuthLoading(false);
                if (user?.email && localCart?.length > 0) {
                    await syncLocalCartToDB(user?.email, localCart)
                }
                toast.success("User Register Successfully");
                router.push("/")

            })
            .catch(error => {
                toast.error(error.message)
                setAuthLoading(false)
                // console.log(error.message)
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <input
                    type="text"
                    className="w-full bg-indigo-50  min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-yellow-600"
                    id="name"
                    required
                    placeholder="Enter Full Name"
                />
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    className="w-full bg-indigo-50  min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-yellow-600"
                    id="email"
                    required
                    placeholder="Enter Email Address"
                />
            </div>
            <div className="mb-4">
                <input
                    type="tel"
                    className="w-full bg-indigo-50  min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-yellow-600"
                    id="phone"
                    required
                    placeholder="Enter phone number"
                />
            </div>
            <div className="mb-4">
                <input
                    type="password"
                    className={`w-full bg-indigo-50  min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-yellow-600 ${formError?.passwordError?.length ? 'border-red-500' : undefined}`}
                    id="password"
                    required
                    placeholder="Enter Password"
                />
                {formError.passwordError && <p className="text-red-400">{formError.passwordError}</p>}
            </div>
            <button className="bg-yellow-400 text-yellow-800 font-semibold py-3 px-6 rounded w-full">
                {authLoading ? "Loading..." : "Sign in"}
            </button>
            <button className="hover:text-blue-600 py-2 px-4 rounded-lg w-full">
                Forget your password?
            </button>
            <div className="relative">
                <hr className="my-8 border-t border-gray-300" />
                <span className="px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white ">
                    Or
                </span>
            </div>
            <SocialLoginButton />
        </form>
    );
};

export default SignUpForm