import type {FC} from "react"

export const NotesEmpty: FC = () => (
  <div className="w-full h-full flex justify-center items-center select-none">
    <div className="border rounded-md text-gray-400 border-gray-400 dark:text-slate-500 dark:border-slate-500 p-5 text-center">
      <div>There are no notes just yet</div>
      <div>To add one, click on the button down below</div>
    </div>
  </div>
)
