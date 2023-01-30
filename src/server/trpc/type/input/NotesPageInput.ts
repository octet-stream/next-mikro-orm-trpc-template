import {createPageInput} from "server/trpc/helper/createPageInput"

export const NotesPageInput = createPageInput({maxLimit: 100})
