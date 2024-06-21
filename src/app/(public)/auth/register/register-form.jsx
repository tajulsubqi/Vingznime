"use client";

import { useTransition, useState } from "react";
import { Formik, Form, Field } from "formik";

import { RegisterSchema } from "@/src/schemas";
import { register } from "@/src/actions/register";
import { CardWrapper } from "@/src/components/auth/card-wrapper";
import { FormError } from "@/src/components/auth/form-error";
import { FormSuccess } from "@/src/components/auth/form-success";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (values) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        }

        if (data?.success) {
          setSuccess(data.success);
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      backButtonLabelAction="Sign in"
      showSocial
      backToHome
    >
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={onSubmit}
      >
        <Form autoComplete="off" className="flex flex-col w-full gap-5">
          <Field name="name">
            {({ field, meta }) => (
              <div className="flex flex-col items-start gap-2">
                <label className="self-stretch text-sm font-medium">Name</label>

                <input
                  {...field}
                  disabled={isPending}
                  type="text"
                  placeholder="John Doe"
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
            Create an account
          </button>
        </Form>
      </Formik>
    </CardWrapper>
  );
};
