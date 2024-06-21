"use client";

import { useTransition } from "react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import { ChangePasswordSchema } from "@/src/schemas";
import { updatePassword } from "@/src/actions/update-password";
import Header from "@/src/components/AnimeList/Header";

const PasswordUpdatePage = () => {
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values) => {
    startTransition(() => {
      updatePassword(values)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }

          if (data?.success) {
            toast.success(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <section className="flex flex-col bg-Black-10 px-5 pb-5 pt-2 rounded-lg max-w-[480px]">
      <Header title="Change Password" className="mb-0" />

      <div className="w-full border-b-2 mb-3 border-Grey-60/10" />

      <Formik
        initialValues={{
          password: undefined,
          newPassword: undefined,
        }}
        validationSchema={ChangePasswordSchema}
        onSubmit={onSubmit}
      >
        <Form
          autoComplete="off"
          className="flex flex-col w-full text-Absolute-White gap-3"
        >
          <Field name="password">
            {({ field, meta }) => (
              <div className="flex flex-col items-start gap-2">
                <label className="ml-1 self-stretch text-sm font-medium">
                  Password
                </label>

                <input
                  {...field}
                  disabled={isPending}
                  required
                  type="password"
                  className="flex max-w-[440px] py-1.5 px-2.5 items-center gap-2.5 self-stretch rounded-lg border border-Black-20 bg-Black-6 outline-none"
                />

                {meta.touched && meta.error && (
                  <label className="self-stretch text-sm font-medium text-Form-Red">
                    {meta.error}
                  </label>
                )}
              </div>
            )}
          </Field>

          <Field name="newPassword">
            {({ field, meta }) => (
              <div className="flex flex-col items-start gap-2">
                <label className="ml-1 self-stretch text-sm font-medium">
                  New Password
                </label>

                <input
                  {...field}
                  disabled={isPending}
                  required
                  type="password"
                  className="flex max-w-[440px] py-1.5 px-2.5 items-center gap-2.5 self-stretch rounded-lg border border-Black-20 bg-Black-6 outline-none"
                />

                {meta.touched && meta.error && (
                  <label className="self-stretch text-sm font-medium text-Form-Red">
                    {meta.error}
                  </label>
                )}
              </div>
            )}
          </Field>

          <button
            type="submit"
            disabled={isPending}
            className={`flex w-fit py-1.5 px-5 rounded-lg bg-Black-15 text-sm font-medium text-Absolute-White transition-all hover:brightness-125 ${
              isPending && "bg-opacity-70"
            }`}
          >
            Update Password
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default PasswordUpdatePage;
