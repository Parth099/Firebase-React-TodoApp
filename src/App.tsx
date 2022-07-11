import { Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import NavBar from "./routes/NavBar";

function App() {
    return (
        <AuthProvider>
            <NavBar />
            <Outlet />
        </AuthProvider>
    );
}

export default App;
