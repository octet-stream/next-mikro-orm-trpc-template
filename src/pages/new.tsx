import {zodResolver} from "@hookform/resolvers/zod"
import {useForm, Controller} from "react-hook-form"
import type {SubmitHandler} from "react-hook-form"
import {useEvent} from "react-use-event-hook"
import {useRouter} from "next/router"
import type {FC} from "react"

import Select from "react-select"

import {client} from "lib/trpc"

import {PonyInput} from "server/trpc/type/input/PonyInput"
import type {IPonyInput} from "server/trpc/type/input/PonyInput"
import {PonyRace} from "server/trpc/type/common/PonyRace"

import {BaseLayout} from "layout/BaseLayout"

import {ReactSelectOption} from "lib/type/ReactSelectOption"

const races: ReactSelectOption<PonyRace>[] = [
  {
    value: PonyRace.EARTH_PONY,
    label: "Earth pony"
  },
  {
    value: PonyRace.PEGASUS,
    label: "Pegasus"
  },
  {
    value: PonyRace.UNICORN,
    label: "Unicorn"
  },
  {
    value: PonyRace.ALICORN,
    label: "Alicorn"
  }
]

const NewPonyPage: FC = () => {
  const router = useRouter()

  const {register, handleSubmit, control} = useForm<IPonyInput>({
    resolver: zodResolver(PonyInput)
  })

  const submit = useEvent<SubmitHandler<IPonyInput>>(({name, race}) => (
    client.pony.create.mutate({name, race})
      .then(() => router.replace("/", undefined, {
        unstable_skipClientCache: true
      }))
      .catch(error => console.error(error))
  ))

  return (
    <BaseLayout>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-mobile prose">
          <h2 className="text-center">Add a new pony</h2>

          <form onSubmit={handleSubmit(submit)}>
            <input
              {...register("name")}

              type="text"
              placeholder="Enter a name"
              className="w-full p-2 mt-2 border-gray-300 border rounded placeholder:text-gray-300"
            />

            <Controller
              name="race"
              control={control}
              render={({field: {ref, onChange, value}}) => (
                <Select
                  isClearable
                  value={races.find(race => race.value === value)}
                  ref={ref}
                  onChange={selected => onChange(selected?.value)}
                  id="select-pony-race"
                  className="w-full mt-2 h-[46px]"
                  options={races}
                  placeholder="Select a race"
                  styles={{
                    placeholder: base => ({
                      ...base, color: "rgb(209, 213, 219)"
                    })
                  }}
                />
              )}
            />

            <button type="submit" className="mt-2 py-2 px-5 text-center w-full h-[46] rounded bg-fuchsia-400 text-white">
              Submit
            </button>
          </form>
        </div>
      </div>
    </BaseLayout>
  )
}

export default NewPonyPage
