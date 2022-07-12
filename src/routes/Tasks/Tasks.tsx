import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

import { db } from "../../../firebase-config";

export default function TasksView() {
    const authContext = useAuth();

    const navigate = useNavigate();

    //reroute on mount if they are not auth-ed
    useEffect(() => {
        //force route to be private
        if (!authContext?.currentUser) {
            navigate("/sign-in");
        }
    }, []);

    return (
        <div className="w-100 flex flex-col items-center secondary-font">
            <div className="task-card-cont-1 w-180 mt-10 p-5 bg-swhite rounded-t-lg shadow-2xl">
                <div className="header-font font-semibold text-3xl">"Add Tasks"</div>
            </div>
            <div className="task-card-cont-1 w-180 mt-10 p-5 bg-swhite rounded-b-lg shadow-2xl">
                <div className="header-font font-semibold text-3xl">"Taskview"</div>
            </div>
        </div>
    );
}
