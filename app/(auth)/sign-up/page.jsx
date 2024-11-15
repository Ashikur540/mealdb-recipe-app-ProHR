"use client"
import WithAuth from "@/components/hoc/WithAuth";
import SignUpForm from "../_components/SignUpForm";


function SignUp() {
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


export default WithAuth(SignUp)