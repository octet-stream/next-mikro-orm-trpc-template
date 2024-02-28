import type {FC} from "react"

export const Warning: FC = () => (
  <div className="border border-orange-500 dark:border-orange-700 bg-orange-100 dark:bg-orange-200 p-2 rounded-md text-center text-orange-700">
    <span>
      Warning: This operation cannot be <strong>reverted</strong>!
    </span>
  </div>
)
