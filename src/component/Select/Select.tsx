/* eslint-disable react/destructuring-assignment */
/* eslint-disable indent */

import type {GroupBase, Props as ReactSelectProps} from "react-select"
import type {ReactElement} from "react"
import {useId} from "react"

import ReactSelect from "react-select"

import styles from "./select.module.css"

export type SelectProps<
  Option extends {[x: string]: unknown} = {[x: string]: unknown},
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Omit<ReactSelectProps<Option, IsMulti, Group>, "classNames">

export const Select = <
  Option extends {[x: string]: unknown} = {[x: string]: unknown},
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: SelectProps<Option, IsMulti, Group>
): ReactElement<any, any> => {
  const id = useId()

  return (
    <ReactSelect
      {...props}

      id={id}
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
          case isFocused && props.value !== data.value:
            return styles["option-active"]

          case isSelected:
            return styles["option-selected"]

          default:
            return styles.option
          }
        }
      }}
    />
  )
}
