/* eslint-disable react/prop-types */

import type {CancelButton} from "component/ConfirmationDialog"

import {Button} from "component/Button"

export const Cancel: CancelButton = ({close}) => (
  <Button onClick={close} variant="primary" aria-label="Cancel">
    Cancel
  </Button>
)
