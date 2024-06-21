"use client";

import { useTransition } from "react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ProfileSchema } from "@/src/schemas";
import { profile } from "@/src/actions/profile";
import Header from "@/src/components/AnimeList/Header";

const ProfileUpdatePage = () => {
  const user = useCurrentUser();

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values) => {
    startTransition(() => {
      profile(values)
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
    <section className="flex flex-col bg-Black-10 px-5 pb-5 pt-2 rounded-lg">
      <Header title="Profile Settings" className="mb-0" />

      <div className="w-full border-b-2 mb-3 border-Grey-60/10" />

      <Formik
        initialValues={{
          name: user?.name || undefined,
          email: user?.email || undefined,
          isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
        }}
        validationSchema={ProfileSchema}
        onSubmit={onSubmit}
      >
        <Form
          autoComplete="off"
          className="flex flex-col w-full text-Absolute-White gap-4"
        >
          <Field name="name">
            {({ field, meta }) => (
              <div className="flex flex-col items-start gap-2">
                <label className="ml-1 self-stretch text-sm font-medium">
                  Name
                </label>

                <input
                  {...field}
                  disabled={isPending}
                  type="text"
                  placeholder="John Doe"
                  className="flex py-1.5 px-2.5 items-center gap-2.5 self-stretch rounded-lg border border-Black-20 bg-Black-6 outline-none"
                />

                {meta.touched && meta.error && (
                  <label className="self-stretch text-sm font-medium text-Form-Red">
                    {meta.error}
                  </label>
                )}
              </div>
            )}
          </Field>

          {user?.isOAuth === false && (
            <>
              <Field name="email">
                {({ field, meta }) => (
                  <div className="flex flex-col items-start gap-2">
                    <label className="ml-1 self-stretch text-sm font-medium">
                      Email
                    </label>

                    <input
                      {...field}
                      disabled={isPending}
                      type="text"
                      placeholder="name@example.com"
                      className="flex py-1.5 px-2.5 items-center gap-2.5 self-stretch rounded-lg border border-Black-20 bg-Black-6 outline-none"
                    />

                    {meta.touched && meta.error && (
                      <label className="self-stretch text-sm font-medium text-Form-Red">
                        {meta.error}
                      </label>
                    )}
                  </div>
                )}
              </Field>

              <Field type="checkbox" name="isTwoFactorEnabled">
                {({ field }) => (
                  <div className="flex gap-5">
                    <label className="relative mt-1 inline-flex cursor-pointer">
                      <input
                        {...field}
                        type="checkbox"
                        value={user?.isTwoFactorEnabled}
                        className="sr-only peer"
                      />

                      <div
                        className="w-11 h-6 bg-Grey-60 rounded-full transition-all
                      peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] 
                      after:absolute after:top-[2px] after:start-[2px] after:bg-Absolute-White 
                      after:border after:rounded-full after:h-5 after:w-5 
                      after:transition-all peer-checked:bg-Form-Blue"
                      ></div>
                    </label>

                    <div className="flex flex-col">
                      <label className="text-base">
                        Two Factor Authentication
                      </label>
                      <span className="text-xs text-Grey-60">
                        Enable two factor authentication for your account
                      </span>
                    </div>
                  </div>
                )}
              </Field>
            </>
          )}

          <button
            type="submit"
            disabled={isPending}
            className={`flex w-fit py-1.5 px-5 rounded-lg bg-Form-Green text-sm font-medium text-Absolute-White transition-all hover:brightness-75 ${
              isPending && "bg-opacity-70 cursor-progress"
            }`}
          >
            Save
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default ProfileUpdatePage;
