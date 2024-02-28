import {z} from "zod"

export const ID = z.string().length(21).regex(/^[a-z0-9-_]+$/i)
