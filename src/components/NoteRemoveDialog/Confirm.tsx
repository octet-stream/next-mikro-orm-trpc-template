/* eslint-disable react/prop-types */

import type {ConfirmButton} from "components/ConfirmationDialog"

import {Button} from "components/Button"

export const Confirm: ConfirmButton = ({confirm}) => (
  <Button onClick={confirm} variant="secondary" color="red" aria-label="Confirm">
    Confirm
  </Button>
)
