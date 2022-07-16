import React, { RefObject, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

//db
import { db } from "../../../firebase-config";
import { addDoc, collection, CollectionReference, DocumentData, DocumentSnapshot, onSnapshot } from "firebase/firestore";
import TaskItem from "./TaskItem";
import { TaskData } from "./TaskDataInterface";

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

    //database actions
    let collectionRef: CollectionReference<DocumentData>; //undefined unless required props exist
    if (authContext?.currentUser && authContext.currentUser?.email) {
        collectionRef = collection(db, authContext.currentUser.email);
    }

    //data state
    const [taskData, setTaskData] = useState<Array<TaskData>>([]);

    //fetch data
    useEffect(() => {
        //straight return so we can use the rvalue to unmount the listener
        return onSnapshot(collectionRef, (collectionSnapShot) => {
            const data = collectionSnapShot.docs.map((doc) => {
                const docData = doc.data();

                return { taskName: docData.taskName, date: docData.date, dateCreated: docData.dateCreated, id: doc.id, priority: docData.priority };
            });
            setTaskData(data);
        });
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
            return;
        }

        // console.log(taskName, priority, date);
        if (!collectionRef) return;

        setSentRequest(true); //block anymore requests
        addDoc(collectionRef, {
            taskName,
            priority,
            date,
            dateCreated: Date.now(), //for the sort
        })
            .then(() => {
                //enable save again
                setSentRequest(false);
                setAddTaskError(""); //success!
            })
            .catch(() => {
                setAddTaskError("Database Error");
            });
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
                                <option value="DEFAULT" disabled>
                                    Choose a Priority
                                </option>
                                <option value="Low">Low</option>
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
                    {addTaskError && <p className="bg-red-100 text-red-800 p-2 mt-2 rounded-lg border-red-600 border-1">{addTaskError}</p>}
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
                <table className="w-full text-left">
                    <tbody className="">
                        <tr className="">
                            <th>Task Name</th>
                            <th>Piority</th>
                            <th>Due Date</th>
                        </tr>
                        {taskData.map((data) => {
                            //render Taskitem from fetected
                            const { date, dateCreated, priority, taskName, ...rest } = data;
                            return <TaskItem date={date} dateCreated={dateCreated} priority={priority} taskName={taskName} key={data.id} />;
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
