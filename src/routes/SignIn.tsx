import { RefObject, useRef, useState } from "react";
import { Link } from "react-router-dom";

//auth context
import { useAuth } from "../contexts/authContext";

export default function SignIn() {
    //refs to access dom elements
    const emailRef = useRef() as RefObject<HTMLInputElement>;
    const passwordConfRef = useRef() as RefObject<HTMLInputElement>;
    const passwordRef = useRef() as RefObject<HTMLInputElement>;

    //auth
    const authContext = useAuth();
    let signUpfunc: Function = () => {};
    if (authContext?.signup) {
        signUpfunc = authContext.signup;
    }

    //handle acc creation
    const handleNewAcc = () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const confPassword = passwordConfRef.current?.value;

        //if both are invalid
        if (!email || !password || !confPassword) return;

        //retype was wrong
        if (password != confPassword) return;
        signUpfunc(email, password).catch((err: Error) => {
            console.log(err);
        });
    };

    return (
        <section className="w-100 flex justify-center secondary-font">
            <div className="signup-card-cont w-160 mt-10 p-5 bg-swhite rounded-lg shadow-lg">
                <div className="font-semibold text-2xl">New Account Creation</div>
                <form
                    className="flex flex-col"
                    onSubmit={(e) => {
                        //stop page refresh
                        e.preventDefault();
                        handleNewAcc();
                    }}
                >
                    <label htmlFor="email" className="login-label">
                        Email:
                    </label>
                    <input id="email" className="login-input" type="Email" placeholder="Type your email" ref={emailRef} />
                    <label htmlFor="password" className="login-label">
                        Password:
                    </label>
                    <input id="password" className="login-input" type="password" placeholder="Type your password" ref={passwordRef} />
                    <label htmlFor="passwordConf" className="login-label">
                        Confirm Password:
                    </label>
                    <input id="passwordConf" className="login-input" type="password" placeholder="Retype your password" ref={passwordConfRef} />

                    <p className="bg-red-300 text-red-800 p-2 mt-2 rounded-lg border-red-800 border-1">{"err"}</p>

                    <button
                        type="submit"
                        className="mt-3 py-2 text-3xl font-bold text-white rounded-md transition ease-in-out delay-150 duration-300 bg-blue-500 hover:bg-indigo-500"
                    >
                        Login in
                    </button>
                </form>

                <p className="text-center mt-3 text-xl">
                    Aready have an account?{" "}
                    <Link to={"/sign-in"} className="text-blue-500 hover:underline hover:text-blue-900">
                        Log in
                    </Link>
                </p>
            </div>
        </section>
    );
}
