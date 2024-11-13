"use client"

import React, { Fragment } from "react";
import { SocialLoginButton } from "../sign-up/page";
import Link from "next/link";


const SignInForm = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email?.value
        const password = event.target.password?.value
        console.log({ email, password })
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <input
                    type="text"
                    className="w-full bg-blue-50  min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
                    id="email"
                    placeholder="Enter Email Address"
                />
            </div>
            <div className="mb-4">
                <input
                    type="password"
                    className="w-full bg-blue-50  min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
                    id="password"
                    placeholder="Enter Password"
                />
            </div>
            <button className="bg-yellow-400 text-yellow-800 font-semibold py-3 px-6 rounded w-full">
                Log In
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

export default function SignUp() {
    return (
        <section className="py-14 md:py-28 bg-[#FEFCE8]  text-zinc-900 h-screen">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-12 lg:gap-24 h-full">
                    <div className="col-span-12 lg:col-span-5 py-14 lg:py-24">
                        <div className="h-full max-w-xl bg-white shadow-xl  rounded-xl p-6 lg:p-14">
                            <div className="w-full max-w-xl mx-auto">
                                <h2 className="text-yellow-700  text-2xl font-bold mb-3">
                                    Login to Tailus Feedus
                                </h2>
                                <div className="flex items-center mb-6 md:mb-12">
                                    <p className="mb-0 mr-2 opacity-50">Don&apos;t have an account?</p>
                                    <Link href="/sign-up">Create Account</Link>
                                </div>

                                <SignInForm />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <div
                            className="bg-center bg-no-repeat bg-cover w-full min-h-[150px] rounded-[25px] hidden lg:block h-full"
                            style={{
                                backgroundImage:
                                    "url(https://images.pexels.com/photos/11264609/pexels-photo-11264609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
};
