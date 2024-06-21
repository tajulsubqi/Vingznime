import ProfileUpdatePage from "@/src/app/(protected)/users/profile-update-form";
import PasswordUpdatePage from "@/src/app/(protected)/users/password-update-form";
import { currentUser } from "@/src/libs/auth";

const page = async () => {
  const user = await currentUser();

  return (
    <main className="flex flex-col gap-5">
      <ProfileUpdatePage />

      {user?.isOAuth === false && <PasswordUpdatePage />}
    </main>
  );
};

export default page;
