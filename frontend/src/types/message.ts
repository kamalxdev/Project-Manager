import { itask } from "./task";

export type iSocketMessages =
  | {
      event: "task:new";
      task: itask;
    }
  | {
      event: "task:completed";
      id: string;
    };
