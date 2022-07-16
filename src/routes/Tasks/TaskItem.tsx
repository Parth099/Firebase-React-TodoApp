import React from "react";
import { TaskData } from "./TaskDataInterface";

const colorLookUpTable = {
    Low: "#007bff",
    Medium: "#ffc107",
    High: "#dc3545",
};

export default function TaskItem(props: TaskData) {
    return (
        <tr>
            <td>{props.taskName}</td>
            <td style={{ color: colorLookUpTable[props.priority] }}>{props.priority}</td>
            <td>{props.date}</td>
        </tr>
    );
}
