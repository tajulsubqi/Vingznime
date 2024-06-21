"use client";

import { useTransition, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Formik, Form, Field } from "formik";

import { NewPasswordSchema } from "@/src/schemas";
import { newPassword } from "@/src/actions/new-password";
import { CardWrapper } from "@/src/components/auth/card-wrapper";
import { FormError } from "@/src/components/auth/form-error";
import { FormSuccess } from "@/src/components/auth/form-success";

export const NewPasswordForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = async (values, actions) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper headerLabel="Enter a new password">
      <Formik
        initialValues={{
          password: "",
        }}
        validationSchema={NewPasswordSchema}
        onSubmit={onSubmit}
      >
        <Form autoComplete="off" className="flex flex-col w-full gap-5">
          <Field name="password">
            {({ field, meta }) => (
              <div className="flex flex-col items-start gap-2">
                <label className="self-stretch text-sm font-medium">
                  Password
                </label>

                <input
                  {...field}
                  disabled={isPending}
                  type="password"
                  placeholder="password123"
                  className={`flex py-3 px-4 items-center gap-2.5 self-stretch rounded-lg border bg-Form-White outline-none ${
                    meta.touched && meta.error
                      ? "border-Red-60"
                      : "border-Grey-60"
                  }`}
                />

                {meta.touched && meta.error && (
                  <label className="self-stretch text-sm font-medium text-Red-60">
                    {meta.error}
                  </label>
                )}
              </div>
            )}
          </Field>

          <FormError message={error} />

          <FormSuccess message={success} />

          <button
            type="submit"
            disabled={isPending}
            className={`flex py-2.5 px-5 justify-center items-center self-stretch rounded-lg bg-Form-Blue text-sm font-medium text-Absolute-White transition-colors hover:brightness-75 ${
              isPending && "bg-opacity-70"
            }`}
          >
            Reset password
          </button>
          <Link
            href="/auth/login"
            className="flex items-center justify-center text-sm font-medium text-Grey-60"
          >
            Back to login?
          </Link>
        </Form>
      </Formik>
    </CardWrapper>
  );
};
