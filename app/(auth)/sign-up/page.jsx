"use client"

import React, { Fragment, useEffect, useState } from "react";


export const SocialLoginButton = () => (
    <Fragment>
        <button className="bg-red-500 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4">
            {/* <FontAwesomeIcon icon={faGoogle} className=" mr-2 text-white" /> */}
            <span className="text-center">Continue with Google</span>
        </button>
    </Fragment>
);

const SignUpForm = () => {
    const [formError, setFormError] = useState({
        emailError: "",
        passwordError: "",
        phoneError: "",
    })
    useEffect(() => {
        console.log("✨ ~ file: page.jsx:21 ~ SignUpForm ~ phoneError:", formError?.phoneError)

    }, [formError])
    const handleSubmit = (event) => {
        event.preventDefault();
        setFormError({
            emailError: "",
            passwordError: "",
            phoneError: ""
        })
        const email = event.target.email?.value
        const password = event.target.password?.value
        const phone = event.target.phone?.value
        if (password.length < 6) {
            setFormError(prev => ({
                ...prev,
                passwordError: "Password must be minimum 6 Characters long!"
            }));
            return;
        }
        console.log({ email, password, phone })
    };

    return (
        <form onSubmit={handleSubmit}>
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
                    <div className="col-span-12 lg:col-span-6">
                        <div
                            className="bg-center bg-no-repeat bg-cover w-full min-h-[150px] rounded-[25px] hidden lg:block h-full"
                            style={{
                                backgroundImage:
                                    "url(https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                            }}
                        ></div>
                    </div>
                    <div className="col-span-12 lg:col-span-5 py-14 lg:py-24">
                        <div className="h-full max-w-xl bg-white shadow-xl  rounded-xl p-6 lg:p-14">
                            <div className="w-full max-w-xl mx-auto">
                                <h2 className="text-yellow-700  text-2xl font-bold mb-3">
                                    Welcome to Tailus Feedus
                                </h2>
                                <div className="flex items-center mb-6 md:mb-8">
                                    <p className="mb-0 mr-2 opacity-50">Please fill up below form to get registered</p>
                                </div>
                                <SignUpForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
