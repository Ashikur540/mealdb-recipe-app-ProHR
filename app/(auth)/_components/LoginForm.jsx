"use client"

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { SocialLoginButton } from "@/components/SocialLoginBtn";



const SignInForm = () => {
    const { signIn, setAuthLoading } = useAuth()
    const router = useRouter()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.email?.value
        const password = event.target.password?.value
        console.log({ email, password });
        await handleSignIn({ email, password })
        event.target.reset()
    };

    const handleSignIn = async ({ email, password }) => {
        signIn(email, password)
            .then(result => {
                toast.success('Login Successful')
                setAuthLoading(false)
                router.push("/")
            })
            .catch(err => {
                toast.error(err.message)
                // console.log(err)
                setAuthLoading(false)
            })

    }

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
export default SignInForm