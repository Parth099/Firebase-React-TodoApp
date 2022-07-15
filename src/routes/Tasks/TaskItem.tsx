import React from "react";
import { TaskData } from "./TaskDataInterface";

export default function TaskItem(props: TaskData) {
    console.log(props);
    return (
        <tr>
            <td>TaskItem</td>
        </tr>
    );
}
