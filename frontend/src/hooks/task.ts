import { iTaskContext, TaskContext } from "@/context/task";
import { useContext } from "react";



export default function useTask(){
    const taskContext= useContext(TaskContext) as iTaskContext;
    return taskContext
}