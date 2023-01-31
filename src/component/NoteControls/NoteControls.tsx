import type {FC} from "react"

import {useNoteDataContext} from "context/NoteDataContext"

import {NoteCompleteButton} from "component/NoteCompleteButton"

import {PauseButton} from "./PauseButton"
import {PlayButton} from "./PlayButton"
import {StopButton} from "./StopButton"

interface Props { }

export const NoteControls: FC<Props> = () => {
  const {isInProgress, isCompleted} = useNoteDataContext()

  return (
    <div className="flex flex-row select-none">
      <StopButton disabled={!isInProgress} />

      {!isInProgress && <PlayButton disabled={isCompleted} />}

      {isInProgress && <PauseButton />}

      <NoteCompleteButton className="mr-3" />
    </div>
  )
}
