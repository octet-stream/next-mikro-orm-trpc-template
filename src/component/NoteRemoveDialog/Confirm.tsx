/* eslint-disable react/prop-types */

import type {ConfirmButton} from "component/ConfirmationDialog"

import {Button} from "component/Button"

export const Confirm: ConfirmButton = ({confirm}) => (
  <Button onClick={confirm} variant="secondary" color="red">
    Confirm
  </Button>
)
