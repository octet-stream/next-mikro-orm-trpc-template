import {useForm, SubmitHandler, FieldValues} from "react-hook-form"
import type {AnyZodObject, infer as Infer} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import type {FC, KeyboardEventHandler} from "react"
import {useEvent} from "react-use-event-hook"
import {useRef} from "react"

import TextArea from "react-textarea-autosize"
import isEmpty from "lodash/isEmpty"
import omitBy from "lodash/omitBy"

import {INoteCreateInput} from "server/trpc/types/note/NoteCreateInput"

import type {ModalRef, BaseModalProps} from "components/Modal"
import {Modal, ModalPanel, ModalTitle} from "components/Modal"
import {Button} from "components/Button"

type BlockReturnHandler = KeyboardEventHandler<HTMLTextAreaElement>

interface Props<T extends FieldValues> extends BaseModalProps {
  title: string
  values?: T
  submit: SubmitHandler<T>
}

interface CreateNoteModalOptions<T extends AnyZodObject> {
  name?: string
  validate: T
}

export function createNoteModal<T extends AnyZodObject>({
  name,
  validate
}: CreateNoteModalOptions<T>) {
  const NoteModal: FC<Props<Infer<T>>> = ({
    title,
    submit,
    openButton,
    values
  }) => {
    const modalRef = useRef<ModalRef>()

    const {
      reset,
      register,
      formState,
      handleSubmit
    } = useForm<INoteCreateInput>({
      mode: "onTouched",
      resolver: zodResolver(validate),
      values: values as INoteCreateInput
    })

    const blockReturn = useEvent<BlockReturnHandler>(event => {
      if (event.key.toLowerCase() === "enter") {
        event.preventDefault()
      }
    })

    const closeModal = useEvent(() => {
      modalRef.current?.close()
    })

    const onCloseReset = useEvent(() => reset())

    const handler = handleSubmit(data => (
      Promise.resolve(submit(omitBy(data, isEmpty))).then(() => closeModal())
    ))

    return (
      <Modal ref={modalRef} openButton={openButton} onClose={onCloseReset}>
        <ModalPanel className="flex flex-col overflow-hidden rounded-md text-left align-middle border-4 border-white">
          <ModalTitle>
            {title}
          </ModalTitle>

          <form onSubmit={handler} className="mobile:flex-1 p-6 overflow-y-auto">
            <TextArea
              {...register("title")}

              className="w-full resize-none border p-2 rounded-md dark:bg-slate-700 dark:border-gray-400"
              placeholder="Title"
              maxLength={255}
              maxRows={3}
              onKeyDown={blockReturn}
            />

            <TextArea
              {...register("details")}

              className="w-full border p-2 mt-4 rounded-md resize-none overflow-hidden dark:bg-slate-700 dark:border-gray-400"
              placeholder="Details"
              minRows={6}
              maxRows={10}
              maxLength={1000}
            />

            <div className="flex flex-row mt-4">
              <Button type="submit" variant="primary" disabled={!formState.isValid}>
                Submit
              </Button>

              <div className="flex-1" />

              <Button variant="secondary" onClick={closeModal} className="dark:border-gray-400">
                Cancel
              </Button>
            </div>
          </form>
        </ModalPanel>
      </Modal>
    )
  }

  if (name) {
    NoteModal.displayName = `NoteModal(${name})`
  }

  return NoteModal
}
