"use client"

import { Heading } from "@/src/components/auth/heading"
import { Social } from "@/src/components/auth/social"
import Link from "next/link"

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  backButtonLabelAction,
  showSocial,
  backToHome,
}) => {
  return (
    <section className="flex flex-col w-full sm:w-[576px] h-full sm:h-auto justify-center sm:rounded-lg p-8 gap-5 bg-Absolute-White">
      <Heading
        label={headerLabel}
        backButtonLabel={backButtonLabel}
        backButtonHref={backButtonHref}
        backButtonLabelAction={backButtonLabelAction}
      />

      <div className="flex flex-col items-start gap-5 self-stretch">
        {children}

        {showSocial && (
          <>
            <div className="flex justify-center items-center gap-6 self-stretch">
              <div className="h-[1px] w-full bg-Grey-60" />

              <span className="text-base font-medium text-Grey-60 cursor-default">
                or
              </span>

              <div className="h-[1px] w-full bg-Grey-60" />
            </div>

            <Social />
          </>
        )}
      </div>

      {backToHome && (
        <Link
          href="/"
          className="flex items-center justify-center text-sm font-medium text-Grey-60"
        >
          Back to home?
        </Link>
      )}
    </section>
  )
}
