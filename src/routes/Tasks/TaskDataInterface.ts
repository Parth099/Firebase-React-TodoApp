type PriorityStatus = "Low" | "Medium" | "High";
export type OrderByField = "" | "priority" | "date";

export interface TaskData {
    date: string;
    dateCreated: number;
    priority: PriorityStatus;
    taskName: string;
    id?: string;
}
