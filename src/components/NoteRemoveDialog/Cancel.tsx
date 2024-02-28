/* eslint-disable react/prop-types */

import type {CancelButton} from "components/ConfirmationDialog"

import {Button} from "components/Button"

export const Cancel: CancelButton = ({close}) => (
  <Button onClick={close} variant="primary" aria-label="Cancel">
    Cancel
  </Button>
)
