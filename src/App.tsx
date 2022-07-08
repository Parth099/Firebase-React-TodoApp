import GoogleLogo from "./assets/google-logo.svg";
import MailLogo from "./assets/mail.svg";
import "./App.css";

function App() {
    //init auth

    return (
        <div className="nav-bar w-full bg-sblue secondary-font shadow-2xl p-4 text-swhite flex justify-between items-center">
            <h1 className="title-font text-5xl">🔥 TodoApp</h1>
            <div className="sign-in-bar">
                <div className="sign-in flex gap-4 font-bold">
                    <button type="button" className="flex gap-1 items-center pr-3 bg-swhite rounded-md hover:bg-slgreen" onClick={() => {}}>
                        <img alt="Google Logo" src={GoogleLogo} className="w-14 h-14" />
                        <p className="block text-sblue secondary-font text-2xl">Login</p>
                    </button>
                    <button type="button" className="flex gap-1 items-center pl-1 pr-3 bg-swhite rounded-md hover:bg-slgreen">
                        <img alt="Google Logo" src={MailLogo} className="w-14 h-14" />
                        <p className="block text-sblue secondary-font text-2xl">Login</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
