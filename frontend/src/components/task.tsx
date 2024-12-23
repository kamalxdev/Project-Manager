import { itask } from "@/types/task";

export default function Task({
  id,
  title,
  status,
  description,
  createdAt,
  completedAt,
}: itask) {
  return (
    <span
      key={id}
      className="border-2 border-black/5 rounded-sm p-3 h-60 grid grid-rows-[auto_1fr_auto] overflow-hidden gap-2"
    >
      <span>
        <h1 className="font-semibold truncate">{title}</h1>
        <p className="text-xs opacity-45">~{createdAt.toLocaleString()}</p>
      </span>
      <p className="relative text-sm  overflow-hidden text-ellipsis after:contents[''] after:text-center after:absolute after:bottom-0 after:right-0 after:w-10/12 after:h-5 after:bg-gradient-to-r after:from-transparent after:to-white">
        {description}
      </p>
      <button
        type="button"
        disabled={status != "PENDING"}
        className={`border bg-green-800 text-white py-1 rounded-md ${status != "PENDING" && "opacity-50"}`}
      >
        {status == "PENDING" ? (
          "Mark as Completed"
        ) : (
          <p className="">
            Completed on {completedAt.toLocaleString()}
          </p>
        )}
      </button>
    </span>
  );
}
