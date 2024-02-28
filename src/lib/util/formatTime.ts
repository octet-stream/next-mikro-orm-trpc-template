import {format} from "date-fns"

export const TIME_FORMAT = "HH:mm"

export const formatTime = (date: Date): string => format(date, TIME_FORMAT)
