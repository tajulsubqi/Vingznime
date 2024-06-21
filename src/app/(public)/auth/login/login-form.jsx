"use client";

import { useSearchParams } from "next/navigation";
import { useTransition, useState } from "react";
import { Formik, Form, Field } from "formik";

import { LoginSchema } from "@/src/schemas";
import { login } from "@/src/actions/login";
import { CardWrapper } from "@/src/components/auth/card-wrapper";
import { FormError } from "@/src/components/auth/form-error";
import { FormSuccess } from "@/src/components/auth/form-success";
import Link from "next/link";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl")
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked" &&
    "Email already in use with different provider!";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values, actions) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }

          if (data?.success) {
            actions.resetForm();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      backButtonLabelAction="Register"
      showSocial
      backToHome
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
          code: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        <Form autoComplete="off" className="flex flex-col w-full gap-5">
          {showTwoFactor && (
            <Field name="code">
              {({ field, meta }) => (
                <div className="flex flex-col items-start gap-2">
                  <label className="self-stretch text-sm font-medium">
                    Verification Code
                  </label>

                  <input
                    {...field}
                    disabled={isPending}
                    type="text"
                    placeholder="123456"
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
          )}

          {!showTwoFactor && (
            <>
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
            </>
          )}
          <Link
            href="/auth/reset"
            className="flex w-fit items-start justify-start text-sm font-medium text-Grey-60"
          >
            Fotgot password?
          </Link>

          <FormError message={error || urlError} />

          <FormSuccess message={success} />

          <button
            type="submit"
            disabled={isPending}
            className={`flex py-2.5 px-5 justify-center items-center self-stretch rounded-lg bg-Form-Blue text-sm font-medium text-Absolute-White transition-colors hover:brightness-75 ${
              isPending && "bg-opacity-70"
            }`}
          >
            {showTwoFactor ? "Confirm" : "Sign in"}
          </button>
        </Form>
      </Formik>
    </CardWrapper>
  );
};
