import {
  Fragment,
  useState,
  useImperativeHandle,
  forwardRef,
  useMemo
} from "react"
import type {ReactNode, ReactElement} from "react"
import {useEvent} from "react-use-event-hook"
import {Dialog} from "@headlessui/react"

import type {MaybeUndefined} from "lib/type/MaybeUndefined"

import {ModalContext} from "./ModalContext"

interface RenderProps {
  open(): void
}

export interface OpenModalButton {
  (props: RenderProps): ReactElement<any, any>
}

export interface BaseModalProps {
  openButton: OpenModalButton
  onClose?(): void
}

interface Props extends BaseModalProps {
  children: ReactNode
}

export interface ModalRef {
  open(): void
  close(): void
  isOpen: boolean
}

type ModalRefInput = MaybeUndefined<ModalRef>

export const Modal = forwardRef<ModalRefInput, Props>((
  {
    onClose,
    openButton,
    children
  },

  ref
) => {
  const [isOpen, setOpen] = useState(false)

  const open = useEvent(() => setOpen(true))

  const close = useEvent(() => {
    setOpen(false)
    onClose?.()
  })

  const context = useMemo<ModalRef>(() => ({
    isOpen, open, close
  }), [isOpen, open, close])

  useImperativeHandle<ModalRefInput, ModalRef>(ref, () => ({
    open, close, isOpen
  }))

  return (
    <Fragment>
      <ModalContext.Provider value={context}>
        <Dialog as="div" open={isOpen} onClose={close} className="relative z-10 mobile:0">
          <div className="fixed inset-0 w-full h-full bg-black/40 dark:bg-black/70" />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex justify-center items-center min-h-full p-5 sm:p-0">
              {children}
            </div>
          </div>
        </Dialog>
      </ModalContext.Provider>

      {openButton({open})}
    </Fragment>
  )
})
