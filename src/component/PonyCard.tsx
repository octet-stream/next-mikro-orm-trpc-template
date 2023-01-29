import type {FC} from "react"

import {PonyRaceNames} from "server/trpc/type/common/PonyRace"

import {usePonyDataContext} from "context/PonyDataContext"

import {Card} from "./Card"

interface Props { }

export const PonyCard: FC<Props> = () => {
  const pony = usePonyDataContext()

  return (
    <Card className="p-5 mobile:p-10 flex mobile:flex-col items-center">
      <div className="w-[80px] h-[80px] border border-gray-300 rounded-full mr-2 mobile:mr-0 mobile:mb-2" />

      <div className="ml-2 mobile:ml-0 mobile:mt-2">
        <h3 className="mobile:text-center font-semibold text-lg">
          {pony.name}
        </h3>

        <div className="mobile:text-center">
          <small className="uppercase text-gray-400">
            {PonyRaceNames[pony.race]}
          </small>
        </div>

      </div>

    </Card>
  )
}
