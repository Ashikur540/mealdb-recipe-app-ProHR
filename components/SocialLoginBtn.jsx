import { Fragment } from "react";

export const SocialLoginButton = () => (
    <Fragment>
        <button className="bg-red-500 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4">
            {/* <FontAwesomeIcon icon={faGoogle} className=" mr-2 text-white" /> */}
            <span className="text-center">Continue with Google</span>
        </button>
    </Fragment>
);
