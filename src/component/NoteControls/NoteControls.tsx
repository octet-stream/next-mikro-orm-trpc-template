import type {FC} from "react"

import cn from "clsx"

import {useNoteStateSnapshot} from "context/NoteStateContext"

import {PauseButton} from "./PauseButton"
import {PlayButton} from "./PlayButton"
import {StopButton} from "./StopButton"

interface Props { }

export const NoteControls: FC<Props> = () => {
  const {isCompleted, isInProgress} = useNoteStateSnapshot()

  return (
    <div className="flex flex-row select-none">
      <StopButton disabled={!isInProgress} />

      {!isInProgress && <PlayButton disabled={isCompleted} />}

      {isInProgress && <PauseButton className={cn({"!text-black dark:!text-white": isInProgress})} />}
    </div>
  )
}
