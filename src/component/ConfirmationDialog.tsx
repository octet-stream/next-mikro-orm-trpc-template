import type {FC, ReactNode, ReactElement} from "react"
import {useEvent} from "react-use-event-hook"
import {useRef} from "react"

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

interface Props extends BaseModalProps {
  title: string
  children: ReactNode
  onConfirm(): MaybePromise<void>
  confirmButton?(props: ConfirmButtonProps): ReactElement<any, any>
  cancelButton?(props: CancelButtonProps): ReactElement<any, any>
}

export const ConfirmationDialog: FC<Props> = ({
  title,
  children,
  openButton,
  onConfirm,
  confirmButton,
  cancelButton
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
    <Modal ref={modalRef} openButton={openButton}>
      <ModalPanel>
        <ModalTitle>
          {title}
        </ModalTitle>

        <div className="p-6">
          {children}

          <div className="flex flex-row w-full mt-5">
            {
              confirmButton ? (
                confirmButton({confirm})
              ) : (
                <Button onClick={confirm} variant="primary">
                  Confirm
                </Button>
              )
            }

            <div className="flex-1" />

            {
              cancelButton ? (
                cancelButton({close: closeModal})
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
