import {useForm, SubmitHandler, FieldValues} from "react-hook-form"
import type {AnyZodObject, infer as Infer} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useEvent} from "react-use-event-hook"
import type {FC} from "react"
import {useRef} from "react"

import TextArea from "react-textarea-autosize"
import isEmpty from "lodash/isEmpty"
import omitBy from "lodash/omitBy"

import {TNoteCreateInput} from "server/trpc/type/input/NoteCreateInput"

import type {ModalRef, BaseModalProps} from "component/Modal"
import {Modal, ModalPanel, ModalTitle} from "component/Modal"
import {Button} from "component/Button"

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
      handleSubmit,
    } = useForm<TNoteCreateInput>({
      mode: "onTouched",
      resolver: zodResolver(validate),
      values: values as TNoteCreateInput
    })

    const closeModal = useEvent(() => {
      modalRef.current?.close()
      reset()
    })

    const handler = handleSubmit(data => (
      submit(omitBy(data, isEmpty)).then(() => closeModal())
    ))

    return (
      <Modal ref={modalRef} openButton={openButton}>
        <ModalPanel className="flex flex-col overflow-hidden rounded-md text-left align-middle border-4 border-white">
          <ModalTitle>
            {title}
          </ModalTitle>

          <form onSubmit={handler} className="mobile:flex-1 p-6 overflow-y-auto">
            <input
              {...register("title")}

              type="text"
              className="w-full border p-2 rounded-md dark:bg-slate-700 dark:border-gray-400"
              placeholder="Title"
              maxLength={255}
            />

            <TextArea
              {...register("details")}

              className="w-full border p-2 mt-4 rounded-md resize-none overflow-hidden dark:bg-slate-700 dark:border-gray-400"
              placeholder="Details"
              minRows={3}
              maxLength={1000}
            />

            <div className="flex flex-row mt-4">
              <Button loading={formState.isLoading} type="submit" variant="primary" disabled={!formState.isValid}>
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
