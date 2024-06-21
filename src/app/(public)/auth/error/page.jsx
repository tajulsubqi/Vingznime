import Link from "next/link";
import { CardWrapper } from "@/src/components/auth/card-wrapper";
import { FormError } from "@/src/components/auth/form-error";

const AuthErrorPage = () => {
  return (
    <CardWrapper headerLabel="Authentication Error">
      <section className="flex flex-col w-full gap-3">
        <FormError message="Something went wrong" />
        <span className="text-sm font-semibold text-Grey-60">
          Error occurred, please try again
        </span>
      </section>

      <Link
        href="/auth/login"
        className="flex w-full items-center justify-center text-sm font-medium text-Grey-60"
      >
        Back to login?
      </Link>
    </CardWrapper>
  );
};

export default AuthErrorPage;
