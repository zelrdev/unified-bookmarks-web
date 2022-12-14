import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Form } from "@remix-run/react";
import React, { useState } from "react";
import { useContext } from "react";
import { ModalContext } from "~/contexts/ModalContext";

export default function NewBookmarkModal() {
  const { modal, setModal } = useContext(ModalContext);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const linkRef = React.useRef<HTMLInputElement>(null);
  const backRef = React.useRef<HTMLLabelElement>(null);
  const modalRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (modal?.createBookmarkActionData?.errors?.name) {
      modalRef.current!.checked = true;
      nameRef.current?.focus();
    }
    if (modal?.createBookmarkActionData?.errors?.link) {
      modalRef.current!.checked = true;
      linkRef.current?.focus();
    }
  }, [modal?.createBookmarkActionData, modalRef]);

  return (
    <>
      <input
        type="checkbox"
        id="new-bookmark"
        className="modal-toggle"
        ref={modalRef}
      />
      <div className="modal">
        <div className="modal-box p-3">
          <Form
            action={`/dashboard/teams/${modal?.team?.id}?index`}
            method="post"
            onSubmit={() => backRef.current?.click()}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              width: "100%",
            }}
          >
            <div className="p-5">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                ref={nameRef}
                name="name"
                className={`input input-bordered w-full ${
                  modal?.createBookmarkActionData?.errors?.name && "input-error"
                }`}
                aria-invalid={
                  modal?.createBookmarkActionData?.errors?.name
                    ? true
                    : undefined
                }
                aria-errormessage={
                  modal?.createBookmarkActionData?.errors?.name
                    ? "name-error"
                    : undefined
                }
              />
              <label className="label">
                <span className="label-text-alt text-error">
                  {modal?.createBookmarkActionData?.errors?.name}
                </span>
              </label>
              <label className="label">
                <span className="label-text">Link</span>
              </label>
              <input
                className="hidden"
                value="new_bookmark"
                name="option"
                type="text"
                readOnly
              />
              <input
                type="link"
                placeholder="Type here"
                ref={linkRef}
                name="link"
                className={`input input-bordered w-full ${
                  modal?.createBookmarkActionData?.errors?.link && "input-error"
                }`}
                aria-invalid={
                  modal?.createBookmarkActionData?.errors?.link
                    ? true
                    : undefined
                }
                aria-errormessage={
                  modal?.createBookmarkActionData?.errors?.link
                    ? "name-error"
                    : undefined
                }
              />
              <label className="label">
                <span className="label-text-alt text-error">
                  {modal?.createBookmarkActionData?.errors?.link}
                </span>
              </label>
            </div>
            <div className="modal-action flex w-full justify-between">
              <label
                ref={backRef}
                htmlFor="new-bookmark"
                className="btn btn-ghost"
              >
                <ArrowLeftIcon height={18} />
              </label>
              <button
                className="ghost-primary-color btn btn-ghost"
                type="submit"
              >
                Create
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
