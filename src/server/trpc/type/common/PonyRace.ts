import {nativeEnum} from "zod"

export enum PonyRace {
  EARTH_PONY = "earth_pony",
  UNICORN = "unicorn",
  PEGASUS = "pegasus",
  ALICORN = "alicorn"
}

export const PonyRaceNames = Object.freeze({
  [PonyRace.ALICORN]: "Alicorn",
  [PonyRace.UNICORN]: "Unicorn",
  [PonyRace.PEGASUS]: "Pegasus",
  [PonyRace.EARTH_PONY]: "Earth pony"
})

export const PonyRaceSchema = nativeEnum(PonyRace)
