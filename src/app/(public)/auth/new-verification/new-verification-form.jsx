"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/src/actions/new-verification";
import { CardWrapper } from "@/src/components/auth/card-wrapper";
import { FormError } from "@/src/components/auth/form-error";
import { FormSuccess } from "@/src/components/auth/form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (error || success) return;

    if (!token) {
      setError("Missing token!");

      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper headerLabel="Email Verification">
      {!success && !error && (
        <div className="flex justify-center items-center w-full">
          <div className="flex justify-center items-center loading" />
        </div>
      )}

      {!error && success && (
        <div className="flex flex-col w-full gap-3">
          <FormSuccess message={success} />
          <span className="text-sm font-semibold text-Grey-60">
            You can close this page now
          </span>
        </div>
      )}

      {!success && error && (
        <div className="flex flex-col w-full gap-3">
          <FormError message={error} />
          <span className="text-sm font-semibold text-Grey-60">
            Can't find the token, please check your email for verification
          </span>
        </div>
      )}
    </CardWrapper>
  );
};
