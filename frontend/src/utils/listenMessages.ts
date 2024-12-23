import { iTaskContext } from "@/context/task";
import { iSocketMessages } from "@/types/message";

export default function listemMessages(
  message: iSocketMessages,
  task: iTaskContext
) {
  switch (message?.event) {
    case "task:new":
      task.addTask(message?.task);
      break;
    case "task:completed":
      task.updateCompletedTask(message?.id);
      break;

    default:
      console.log("No event");
      break;
  }
}
