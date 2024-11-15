"use client"
import Link from "next/link";

import SignInForm from "../_components/LoginForm";
import WithAuth from "@/components/hoc/WithAuth";






function SignUp() {
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
                                    <Link href="/sign-up" className="hover:text-blue-500 duration-300 transition-colors">Create Account</Link>
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


export default WithAuth(SignUp)