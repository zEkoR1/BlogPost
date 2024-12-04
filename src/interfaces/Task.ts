export interface Task {
    id: string;
    title: string; 
    description: string;
    status: "in_Progress" | "completed"; 
}