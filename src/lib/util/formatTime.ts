import format from "date-fns/format"

export const TIME_FORMAT = "HH:mm"

export const formatTime = (date: Date): string => format(date, TIME_FORMAT)
