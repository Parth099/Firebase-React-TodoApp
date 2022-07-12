import GoogleLogo from "../assets/google-logo.svg";
import MailLogo from "../assets/mail.svg";
import "../App.css";
import { useAuth } from "../contexts/authContext";
import { auth } from "../../firebase-config";
import { Link } from "react-router-dom";

export default function NavBar() {
    const authContext = useAuth();
    const currentUser = authContext?.currentUser;
    console.log(currentUser);

    const handleLogOut = () => {
        authContext?.logout().then(() => {
            console.log("hit logout", currentUser);
        });
    };

    return (
        <div className="nav-bar w-full bg-sblue secondary-font shadow-2xl p-4 text-swhite flex justify-between items-center">
            <Link to={"/"}>
                <h1 className="text-5xl">
                    🔥 <span className="header-font">Todoapp</span>
                </h1>
            </Link>

            <div className="sign-in-bar">
                <div className="sign-in flex gap-4 font-bold"></div>
                {!currentUser && (
                    <Link to={"/sign-in"} className="block p-3 px-5 bg-swhite hover:bg-slgreen">
                        <p className="block text-sblue header-font text-2xl">Log in</p>
                    </Link>
                )}
                {currentUser && (
                    <Link to={"/sign-in"} className="block p-3 px-5 bg-swhite hover:bg-slgreen" onClick={handleLogOut}>
                        <p className="block text-sblue header-font text-2xl">Log out</p>
                    </Link>
                )}
            </div>
        </div>
    );
}

/* google login tsx
<button type="button" className="flex gap-1 items-center pr-3 bg-swhite rounded-md hover:bg-slgreen" onClick={() => {}}>
    <img alt="Google Logo" src={GoogleLogo} className="w-14 h-14" />
    <p className="block text-sblue secondary-font text-2xl">Login</p>
</button>
*/
