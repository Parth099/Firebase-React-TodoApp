type PriorityStatus = "Low" | "Medium" | "High";

export interface TaskData {
    date: string;
    dateCreated: number;
    priority: PriorityStatus;
    taskName: string;
    id?: string;
}
