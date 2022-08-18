import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Form, useActionData, useSubmit } from "@remix-run/react";
import React, { useContext } from "react";
import { toast } from "react-hot-toast/headless";
import { PasswordActionDataContext } from "~/contexts/PasswordActionDataContext";

export default function Modals() {
  return (
    <>
      <PasswordChangeModal />
      <DeleteAccountModal />
    </>
  );
}

export function DeleteAccountModal() {
  const submit = useSubmit();

  const deleteAccount = () =>
    submit(
      { option: "delete_account" },
      { method: "post", action: "/dashboard/settings" }
    );

  return (
    <>
      <input type="checkbox" id="delete-account" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-64">
          <h2 className="text-2xl font-bold">Are you sure?</h2>
          <div className="modal-action">
            <button
              onClick={deleteAccount}
              className="btn btn-success flex-grow"
            >
              Yes
            </button>
            <label htmlFor="delete-account" className="btn btn-error flex-grow">
              No
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export function PasswordChangeModal() {
  const { passwordActionData } = useContext(PasswordActionDataContext);
  const oldPassRef = React.useRef<HTMLInputElement>(null);
  const newPassRef = React.useRef<HTMLInputElement>(null);
  const backRef = React.useRef<HTMLLabelElement>(null);

  React.useEffect(() => {
    if (passwordActionData?.success?.password) {
      backRef.current!.click();
      toast("Password successfully updated", { className: "alert-success" });
      oldPassRef.current!.value = "";
      newPassRef.current!.value = "";
    }
    if (passwordActionData?.errors?.oldPass) oldPassRef.current?.focus();
    if (passwordActionData?.errors?.newPass) newPassRef.current?.focus();
  }, [passwordActionData]);

  return (
    <>
      <input type="checkbox" id="password-change" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <Form action="/dashboard/settings" method="post">
            <div className="flex w-full flex-col items-center ">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Old Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Type here"
                  ref={oldPassRef}
                  name="oldPass"
                  className={`input input-bordered w-full ${
                    passwordActionData?.errors?.oldPass && "input-error"
                  }`}
                  aria-invalid={
                    passwordActionData?.errors?.oldPass ? true : undefined
                  }
                  aria-errormessage={
                    passwordActionData?.errors?.oldPass
                      ? "oldPass-error"
                      : undefined
                  }
                />
                <label className="label">
                  <span className="label-text-alt text-error">
                    {passwordActionData?.errors?.oldPass}
                    {"⠀"}
                  </span>
                </label>
              </div>
              <input
                className="hidden"
                value="password"
                name="option"
                type="text"
                readOnly
              />
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Type here"
                  ref={newPassRef}
                  name="newPass"
                  className={`input input-bordered w-full ${
                    passwordActionData?.errors?.newPass && "input-error"
                  }`}
                  aria-invalid={
                    passwordActionData?.errors?.newPass ? true : undefined
                  }
                  aria-errormessage={
                    passwordActionData?.errors?.newPass
                      ? "newPass-error"
                      : undefined
                  }
                />
                <label className="label">
                  <span className="label-text-alt text-error">
                    {passwordActionData?.errors?.newPass}
                    {"⠀"}
                  </span>
                </label>
              </div>
            </div>
            <div className=" w-full">
              <div className="flex justify-between">
                <label ref={backRef} htmlFor="password-change" className="btn">
                  <ArrowLeftIcon height={16} />
                </label>
                <button type="submit" className="btn btn-primary">
                  Change
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
