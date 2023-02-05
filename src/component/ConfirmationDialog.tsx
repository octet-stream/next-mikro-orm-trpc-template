import {useEvent} from "react-use-event-hook"
import {useRef, createElement} from "react"
import type {FC, ReactNode} from "react"

import type {MaybePromise} from "lib/type/MaybePromise"

import type {ModalRef, BaseModalProps} from "component/Modal"
import {Modal, ModalPanel, ModalTitle} from "component/Modal"
import {Button} from "component/Button"

interface ConfirmButtonProps {
  confirm(): void
}

interface CancelButtonProps {
  close(): void
}

export type ConfirmButton<P = {}> = FC<P & ConfirmButtonProps>

export type CancelButton<P = {}> = FC<P & CancelButtonProps>

interface Props extends BaseModalProps {
  title: string
  children: ReactNode
  onConfirm(): MaybePromise<void>
  confirmButton?: ConfirmButton
  cancelButton?: CancelButton
}

export const ConfirmationDialog: FC<Props> = ({
  title,
  children,
  openButton,
  onConfirm,
  confirmButton,
  cancelButton,
  onClose
}) => {
  const modalRef = useRef<ModalRef>()

  const closeModal = useEvent(() => {
    modalRef.current?.close()
  })

  const confirm = useEvent(() => {
    const result = onConfirm()

    if (result instanceof Promise) {
      // TODO: Maybe add scenario when the promise was rejected
      return result.then(() => closeModal())
    }

    closeModal()
  })

  return (
    <Modal ref={modalRef} openButton={openButton} onClose={onClose}>
      <ModalPanel>
        <ModalTitle>
          {title}
        </ModalTitle>

        <div className="p-6">
          {children}

          <div className="flex flex-row w-full mt-5">
            {
              confirmButton ? (
                createElement(confirmButton, {confirm})
              ) : (
                <Button onClick={confirm} variant="primary">
                  Confirm
                </Button>
              )
            }

            <div className="flex-1" />

            {
              cancelButton ? (
                createElement(cancelButton, {close: closeModal})
              ) : (
                <Button onClick={closeModal} variant="secondary">
                  Cancel
                </Button>
              )
            }
          </div>
        </div>
      </ModalPanel>
    </Modal>
  )
}
