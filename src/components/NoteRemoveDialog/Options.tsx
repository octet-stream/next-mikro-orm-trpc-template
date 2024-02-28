import {RadioGroup} from "@headlessui/react"
import type {FC} from "react"

export type OptionValue = "reject" | "delete"

interface Props {
  value: OptionValue
  onChange(value: OptionValue): void
}

export const Options: FC<Props> = ({value, onChange}) => (
  <RadioGroup value={value} onChange={onChange}>
    <RadioGroup.Option value="reject" className="px-4 py-2 mb-2 rounded-md border-2 border-gray-300 dark:border-gray-500 ui-checked:bg-gray-200 ui-checked:dark:bg-gray-800 cursor-pointer">
      <div className="font-bold">Reject</div>
      <div>The note will be marked as rejected</div>
      <div>You will be able to find it by the <i>Rejected</i> tab</div>
    </RadioGroup.Option>

    <RadioGroup.Option value="delete" className="px-4 py-2 rounded-md border-2 border-red-500 cursor-pointer ui-checked:bg-gray-200 ui-checked:dark:bg-gray-800">
      <div className="font-bold">Delete</div>
      <div>The note will be removed completely</div>
      <div className="text-orange-600 dark:text-orange-500">
        Warning: This operation is <strong>permanent</strong>!
      </div>
    </RadioGroup.Option>
  </RadioGroup>
)
