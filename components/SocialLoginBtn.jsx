import { useAuth } from "@/providers/AuthProvider";
import { Fragment } from "react";
import toast from "react-hot-toast";

export const SocialLoginButton = () => {
    const { signInWithGoogle } = useAuth()

    const handleGoogleSignIn = () => {
        signInWithGoogle().then(result => {
            const user = (result.user)
            setAuthToken(result.user);
            saveUser({
                email: user?.email,
                name: user?.displayName,
                image: user?.photoURL,
                account_type: "regular",
            })

            setLoading(false)
            navigate(from, { replace: true })
        })
            .catch(err => {
                toast.error(err.message)
                // console.log(err)
                setLoading(false)
            })
    }
    return (
        <Fragment>
            <button className="bg-red-500 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4" onClick={handleGoogleSignIn}>
                {/* <FontAwesomeIcon icon={faGoogle} className=" mr-2 text-white" /> */}
                <span className="text-center">Continue with Google</span>
            </button>
        </Fragment>
    )
};
