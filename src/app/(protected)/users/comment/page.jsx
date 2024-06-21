import { db } from "@/src/libs/prisma";
import { currentUser } from "@/src/libs/auth";
import Comments from "@/src/app/(protected)/users/comment/Comments";

const Page = async () => {
  const user = await currentUser();

  const comments = await db.comment.findMany({
    where: { user_email: user?.email },
    orderBy: {
      createdAt: "desc",
    },
  });

  const groupedComments = comments.reduce((acc, comment) => {
    const createdAtDate = new Date(Date.parse(comment.createdAt.toISOString()));

    const createdAtDateOnly = new Date(
      createdAtDate.getFullYear(),

      createdAtDate.getMonth(),

      createdAtDate.getDate()
    );

    const existingGroup = acc.find(
      (group) =>
        group.createdAtDateOnly.getTime() === createdAtDateOnly.getTime()
    );

    if (existingGroup) {
      existingGroup.comments.push(comment);
    } else {
      acc.push({
        createdAtDate: createdAtDate,

        createdAtDateOnly: createdAtDateOnly,

        comments: [comment],
      });
    }

    return acc;
  }, []);

  return <Comments groupedComments={groupedComments} />;
};

export default Page;
