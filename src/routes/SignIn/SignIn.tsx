import { RefObject, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//auth context
import { useAuth } from "../../contexts/authContext";

export default function SignIn() {
    //refs to access dom elements
    const emailRef = useRef() as RefObject<HTMLInputElement>;
    const passwordRef = useRef() as RefObject<HTMLInputElement>;

    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    //auth
    const authContext = useAuth();
    let loginfunc: Function = () => {};
    if (authContext?.login) {
        loginfunc = authContext.login;
    }

    //handle acc creation
    const handleLogin = () => {
        if (isLoading) return; //dont want to enable spam clickers

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        //if both are invalid
        if (!email || !password) {
            setErrorMessage("Fill in each field");
            return;
        }

        //passed all the checks we set button to be disabled
        setIsLoading(true); //blocks the click until promise is rejected or resolved
        loginfunc(email, password)
            .then(() => {
                //clear error message
                setErrorMessage("");
                navigate("/tasks");
            })
            .catch((err: Error) => {
                setErrorMessage("Error Logging in");
            })
            .then(() => {
                //after everything is done (error or not) we disable blocker
                console.log("passed");
                setIsLoading(false);
            });
    };

    return (
        <section className="w-100 flex justify-center secondary-font">
            <div className="signup-card-cont w-160 mt-10 p-5 bg-swhite rounded-lg shadow-lg">
                <div className="header-font font-semibold text-3xl">Login</div>
                <form
                    className="flex flex-col"
                    onSubmit={(e) => {
                        //stop page refresh
                        e.preventDefault();
                        handleLogin();
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
                    {errorMessage && <p className="bg-red-100 text-red-800 p-2 mt-2 rounded-lg border-red-600 border-1">{errorMessage}</p>}

                    <button
                        disabled={isLoading}
                        type="submit"
                        className="mt-3 py-2 text-3xl font-bold text-white rounded-md transition ease-in-out delay-150 duration-300 bg-blue-500 hover:bg-indigo-500"
                    >
                        Login in
                    </button>
                </form>

                <p className="text-center mt-3 text-xl">
                    Need an account?{" "}
                    <Link to={"/sign-up"} className="text-blue-500 hover:underline hover:text-blue-900">
                        Create an account
                    </Link>
                </p>
            </div>
        </section>
    );
}
