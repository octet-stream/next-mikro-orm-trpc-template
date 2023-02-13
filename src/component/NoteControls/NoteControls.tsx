import type {FC} from "react"

import cn from "clsx"

import {useNoteStateSnapshot} from "context/NoteStateContext"

import {PauseButton} from "./PauseButton"
import {PlayButton} from "./PlayButton"
import {StopButton} from "./StopButton"

interface Props { }

export const NoteControls: FC<Props> = () => {
  const {isCompleted, isPaused, isInProgress} = useNoteStateSnapshot()

  return (
    <div className="flex flex-row select-none">
      <StopButton disabled={!isInProgress && !isPaused} aria-label="Stop" />

      {!isInProgress && <PlayButton disabled={isCompleted} aria-label="Play" />}

      {isInProgress && <PauseButton className={cn({"!text-black dark:!text-white": isInProgress})} aria-label="Pause" />}
    </div>
  )
}
