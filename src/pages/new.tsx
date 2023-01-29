import {zodResolver} from "@hookform/resolvers/zod"
import {useForm, Controller} from "react-hook-form"
import type {SubmitHandler} from "react-hook-form"
import {useEvent} from "react-use-event-hook"
import {useRouter} from "next/router"
import {toast} from "react-hot-toast"
import type {FC} from "react"

import Select from "react-select"

import {client} from "lib/trpc"

import {PonyInput} from "server/trpc/type/input/PonyInput"
import {PonyRace, PonyRaceNames} from "server/trpc/type/common/PonyRace"
import type {IPonyInput} from "server/trpc/type/input/PonyInput"

import {BaseLayout} from "layout/BaseLayout"

import {Button} from "component/Button"

import styles from "style/select.module.css"

import {ReactSelectOption} from "lib/type/ReactSelectOption"

const races: ReactSelectOption<PonyRace>[] = [
  {
    value: PonyRace.EARTH_PONY,
    label: PonyRaceNames[PonyRace.EARTH_PONY]
  },
  {
    value: PonyRace.PEGASUS,
    label: PonyRaceNames[PonyRace.PEGASUS]
  },
  {
    value: PonyRace.UNICORN,
    label: PonyRaceNames[PonyRace.UNICORN]
  },
  {
    value: PonyRace.ALICORN,
    label: PonyRaceNames[PonyRace.ALICORN]
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
      .catch(error => {
        toast.error("Can't add a pony")
        console.error(error)
      })
  ))

  return (
    <BaseLayout>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-mobile prose">
          <h2 className="text-center dark:text-white">Add a new pony</h2>

          <form onSubmit={handleSubmit(submit)}>
            <input
              {...register("name")}

              type="text"
              placeholder="Enter a name"
              className="w-full p-2 mt-2 dark:text-white border-gray-300 border rounded placeholder:text-gray-300 dark:bg-slate-700 dark:border-gray-500 dark:placeholder:text-gray-500"
            />

            <Controller
              name="race"
              control={control}
              render={({field: {ref, onChange, value}}) => (
                <Select
                  isClearable
                  isSearchable
                  value={races.find(race => race.value === value)}
                  ref={ref}
                  onChange={selected => onChange(selected?.value)}
                  id="select-pony-race"
                  className="w-full mt-2 h-[46px]"
                  options={races}
                  placeholder="Select a race"
                  classNames={{
                    control: () => styles.control,

                    input: () => styles.input,

                    indicatorsContainer: ({selectProps}) => (
                      selectProps.menuIsOpen
                        ? styles["indicator-container-open"]
                        : styles["indicator-container"]
                    ),

                    indicatorSeparator: () => styles["indicator-separator"],

                    placeholder: () => styles.placeholder,

                    singleValue: () => styles["single-value"],

                    menu: () => styles.menu,

                    menuList: () => styles.list,

                    option({isFocused, data, isSelected}) {
                      switch (true) {
                      case isFocused && value !== data.value:
                        return styles["option-active"]

                      case isSelected:
                        return styles["option-selected"]

                      default:
                        return styles.option
                      }
                    }
                  }}
                />
              )}
            />

            <Button type="submit" className="mt-2 py-2 px-5 text-center h-[46]" wide>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </BaseLayout>
  )
}

export default NewPonyPage
