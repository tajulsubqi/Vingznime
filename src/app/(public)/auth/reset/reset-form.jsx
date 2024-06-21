"use client";

import { useTransition, useState } from "react";
import Link from "next/link";
import { Formik, Form, Field } from "formik";

import { ResetSchema } from "@/src/schemas";
import { reset } from "@/src/actions/reset";
import { CardWrapper } from "@/src/components/auth/card-wrapper";
import { FormError } from "@/src/components/auth/form-error";
import { FormSuccess } from "@/src/components/auth/form-success";

export const ResetForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values, actions) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper headerLabel="Forgot your password?">
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={ResetSchema}
        onSubmit={onSubmit}
      >
        <Form autoComplete="off" className="flex flex-col w-full gap-5">
          <Field name="email">
            {({ field, meta }) => (
              <div className="flex flex-col items-start gap-2">
                <label className="self-stretch text-sm font-medium">
                  Email
                </label>

                <input
                  {...field}
                  disabled={isPending}
                  type="text"
                  placeholder="name@example.com"
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
            Send reset password
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
