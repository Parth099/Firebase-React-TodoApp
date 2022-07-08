import React, { RefObject, useRef } from "react";

export default function SignIn() {
    //refs to access dom elements
    const emailRef = useRef() as RefObject<HTMLInputElement>;
    const passwordConfRef = useRef() as RefObject<HTMLInputElement>;
    const passwordRef = useRef() as RefObject<HTMLInputElement>;

    //handle acc creation
    const handleNewAcc = () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const confPassword = passwordConfRef.current?.value;

        //if both are invalid
        if (!email || !password || !confPassword) return;

        //retype was wrong
        if (password != confPassword) return;

        console.log(email, password);
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
                    <button
                        type="submit"
                        className="mt-3 py-2 text-3xl font-bold text-white rounded-md transition ease-in-out delay-150 duration-300 bg-blue-500 hover:bg-indigo-500"
                    >
                        Login in
                    </button>
                </form>
                <p className="text-center mt-1">Aready have an account? Log In</p>
            </div>
        </section>
    );
}
