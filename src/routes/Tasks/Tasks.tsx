import React, { RefObject, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

import { db } from "../../../firebase-config";

export default function TasksView() {
    //auth stuff
    const authContext = useAuth();
    const navigate = useNavigate();

    //reroute on mount if they are not auth-ed
    useEffect(() => {
        //force route to be private
        if (!authContext?.currentUser) {
            navigate("/sign-in");
        }
    }, []);

    //to show errors
    const [addTaskError, setAddTaskError] = useState("");

    //to lock submit button while sending db requests
    const [sentRequest, setSentRequest] = useState(false);

    //submit event
    const taskNameRef = useRef() as RefObject<HTMLInputElement>;
    const priorityRef = useRef() as RefObject<HTMLSelectElement>;
    const dateRef = useRef() as RefObject<HTMLInputElement>;

    const handleAddTask = () => {
        const taskName = taskNameRef.current?.value;
        const priority = priorityRef.current?.value;
        const date = dateRef.current?.value;

        if (!taskName || !priority || !date) {
            setAddTaskError("Fill in each field");
        }

        // console.log(taskName, priority, date);
        // send request here
    };

    return (
        <div className="w-100 flex flex-col items-center secondary-font">
            <div className="task-card-cont-1 w-180 mt-10 p-5 bg-swhite rounded-t-lg shadow-2xl">
                <div className="header-font font-semibold text-3xl">Add Tasks</div>
                <form
                    className="add-task-container mt-3 flex flex-col px-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddTask();
                    }}
                >
                    <label className="text-2xl font-bold" htmlFor="add-task">
                        Task Name
                    </label>
                    <input type="text" id="add-task" className="border-b  py-1 text-xl" ref={taskNameRef} />
                    <div className="flex justify-around mt-2">
                        <div className="prioity flex flex-col items-start">
                            {" "}
                            <label className="text-2xl font-bold" htmlFor="add-task">
                                Priority
                            </label>
                            <select name="cars" id="add-task" className="mt-3" ref={priorityRef}>
                                <option value="Low" selected={true}>
                                    Low
                                </option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div className="due-date flex flex-col items-start">
                            <label className="text-2xl font-bold" htmlFor="due-date">
                                Date Due
                            </label>
                            <input type="date" id="due-date" className="border-b py-1 text-xl" ref={dateRef} />
                        </div>
                    </div>
                    <button
                        disabled={sentRequest}
                        type="submit"
                        className="mt-3 py-2 text-3xl font-bold text-white rounded-md transition ease-in-out delay-150 duration-300 bg-blue-500 hover:bg-indigo-500"
                    >
                        Submit Task
                    </button>
                </form>
            </div>
            <div className="task-card-cont-1 w-180 mt-10 p-5 bg-swhite rounded-b-lg shadow-2xl">
                <div className="header-font font-semibold text-3xl">Taskview</div>
            </div>
        </div>
    );
}
