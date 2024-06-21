import { db } from "@/src/libs/prisma";
import { currentUser } from "@/src/libs/auth";
import Collection from "@/src/app/(protected)/users/collection/Collection";

const Page = async () => {
  const user = await currentUser();
  const collection = await db.collection.findMany({
    where: { user_email: user?.email },
    orderBy: {
      id: "desc",
    },
  });
  
  return <Collection collection={collection} />;
};

export default Page;
